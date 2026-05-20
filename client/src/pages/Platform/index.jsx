import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import PlatformHeader from '../../components/PlatformHeader'
import Home from './Home'
import ProductPage from './ProductPage'
import ProductFooter from '../../components/ProductFooter'
import ProductsPage from './Products'
import Cart from './Cart'
import TopNotification from '../../components/TopNotification'
import Loader from '../../components/Loader'
import axios from 'axios'
import Coupons from './Coupons'
import Pages from './Pages'

export default function Platform({ isCustomDomain }) {
    const { isAuthenticated } = useAuthContext()
    const { brandSlug } = useParams()
    const [settings, setSettings] = useState({})
    const [storeAllowed, setStoreAllowed] = useState(true);
    const [storeMessage, setStoreMessage] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSellerSettings()

        return () => removeStoreTrackingTags()
    }, [brandSlug])

    useEffect(() => {
        if (settings?.theme) {
            document.documentElement.style.setProperty("--pr", settings.theme.primary);
            document.documentElement.style.setProperty("--sec", settings.theme.secondary);
        }
    }, [settings])

    useEffect(() => {
        if (settings?.brandName || settings?.brandSlug || brandSlug) {
            const storeTitle = settings?.brandName || settings?.brandSlug || brandSlug
            document.title = storeTitle.slice(0, 1).toUpperCase() + storeTitle.slice(1)
        }

        return () => {
            document.title = "Sorty"
        }
    }, [settings?.brandName, settings?.brandSlug, brandSlug])

    useEffect(() => {
        if (!settings?.trackingTags) return
        injectTrackingTags(settings.trackingTags)

        return () => removeStoreTrackingTags()
    }, [settings])

    const fetchSellerSettings = () => {
        setLoading(true)

        const currentDomain = window.location.hostname;

        let queryParams = '';

        if (isCustomDomain) {
            queryParams = `domain=${currentDomain}`;
        } else if (brandSlug) {
            queryParams = `brandSlug=${brandSlug}`;
        } else {
            return setLoading(false);
        }

        axios.get(`${import.meta.env.VITE_HOST}/subscriptions/store-status?${queryParams}`)
            .then(statusRes => {
                if (!statusRes.data.storeAllowed) {
                    setStoreAllowed(false);
                    setStoreMessage(statusRes.data.message);
                    setSettings({});

                    if (brandSlug) {
                        document.title = `${brandSlug} | Sorty`
                    }

                    return null;
                }

                setStoreAllowed(true);

                return axios.get(`${import.meta.env.VITE_HOST}/platform/seller-settings/get?${queryParams}`);
            })
            .then(res => {
                if (!res) return;

                const { status, data } = res;

                if (status === 200) {
                    setSettings(data?.settings);
                }
            })
            .catch(err => {
                console.error('Frontend GET error', err.message);
                if (err.response?.status === 404) {
                    window.toastify?.('Store not found', 'error');
                }
            })
            .finally(() => setLoading(false));
    }

    const getInjectionTarget = (tagKey) => {
        // Tags that should go in <head>
        const headTags = ['googleSearchConsole', 'googleAnalytics', 'googleTagManager']

        // Tags that should go in <body> (pixels need to track page interactions)
        const bodyTags = ['facebookPixel', 'tiktokPixel', 'pinterestTag', 'googleAdsConversion']

        if (headTags.includes(tagKey)) {
            return document.head
        } else if (bodyTags.includes(tagKey)) {
            return document.body
        }

        // Default to head
        return document.head
    }

    const injectTrackingTags = (tagsObj) => {
        if (!tagsObj || typeof tagsObj !== 'object') return

        // Remove previous store tags before injecting new ones
        removeStoreTrackingTags()

        let injectedCount = 0

        Object.entries(tagsObj).forEach(([key, tagCode]) => {
            if (!tagCode || typeof tagCode !== "string" || !tagCode.trim()) return

            try {
                const tempDiv = document.createElement("div")
                tempDiv.innerHTML = tagCode.trim()

                // Get appropriate injection target (head or body)
                const target = getInjectionTarget(key)
                if (!target) return

                Array.from(tempDiv.childNodes).forEach(node => {
                    if (node.nodeType === 1) { // Element nodes only
                        const element = node.cloneNode(true)

                        // Mark with data-store-tag attribute
                        element.setAttribute("data-store-tag", key)

                        // Handle script tags
                        if (element.tagName === "SCRIPT") {
                            const newScript = document.createElement("script")

                            // Copy attributes
                            Array.from(element.attributes).forEach(attr => {
                                if (attr.name !== 'data-store-tag') {
                                    newScript.setAttribute(attr.name, attr.value)
                                }
                            })

                            // Copy script content (use textContent for proper execution)
                            if (element.textContent) {
                                newScript.textContent = element.textContent
                            }

                            newScript.setAttribute("data-store-tag", key)

                            // Check for duplicates
                            const src = newScript.getAttribute("src")
                            if (src) {
                                const existing = document.querySelector(
                                    `script[src="${src}"][data-store-tag="${key}"]`
                                )
                                if (existing) return
                            }

                            target.appendChild(newScript)
                            injectedCount++
                        }
                        // Handle meta tags (only in head)
                        else if (element.tagName === "META") {
                            const name = element.getAttribute("name")
                            const property = element.getAttribute("property")

                            if (name) {
                                const existing = document.querySelector(
                                    `meta[name="${name}"][data-store-tag="${key}"]`
                                )
                                if (existing) return
                            }
                            if (property) {
                                const existing = document.querySelector(
                                    `meta[property="${property}"][data-store-tag="${key}"]`
                                )
                                if (existing) return
                            }

                            document.head.appendChild(element)
                            injectedCount++
                        }
                        // Handle noscript, img, iframe, etc.
                        else {
                            target.appendChild(element)
                            injectedCount++
                        }
                    }
                })
            } catch (error) {
                console.error(`Error injecting ${key} tag:`, error)
            }
        })

        if (injectedCount > 0) {
            console.log(`✅ Injected ${injectedCount} store tracking tags`)
        }
    }

    const removeStoreTrackingTags = () => {
        const storeTags = document.querySelectorAll('[data-store-tag]')
        let removedCount = 0

        storeTags.forEach(tag => {
            try {
                tag.remove()
                removedCount++
            } catch (error) {
                console.error('Error removing tag:', error)
            }
        })

        if (removedCount > 0) {
            console.log(`🗑️ Removed ${removedCount} store tracking tags`)
        }
    }

    if (loading) return <Loader />

    if (!storeAllowed) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#fafafa] px-4">
                <div className="bg-white max-w-md w-full text-center p-8 shadow-sm border border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Store is under maintenance
                    </h1>
                    <p className="text-gray-600">
                        {storeMessage || "Store is under maintenance. Will get back soon."}
                    </p>
                </div>
            </div>
        );
    }

    if (!settings || !settings._id) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Store Not Found</h1>
                    <p className="text-gray-600">This store doesn't exist or is not configured yet.</p>
                </div>
            </div>
        )
    }

    return (
        <>
            {settings?.visibility?.showTopNotification && <TopNotification notifications={settings.content.topNotifications} />}
            <PlatformHeader settings={settings} isCustomDomain={isCustomDomain} />
            <Routes>
                <Route index element={<Home settings={settings} isCustomDomain={isCustomDomain} />} />
                <Route path='home' element={<Home settings={settings} isCustomDomain={isCustomDomain} />} />
                <Route path='pages/:page' element={<Pages settings={settings} />} />
                <Route path='product/:productSlug' element={<ProductPage settings={settings} isCustomDomain={isCustomDomain} />} />
                <Route path='products' element={<ProductsPage settings={settings} isCustomDomain={isCustomDomain} />} />
                <Route path='products/:category' element={<ProductsPage settings={settings} isCustomDomain={isCustomDomain} />} />
                <Route path='cart' element={isAuthenticated ? <Cart settings={settings} /> : <Navigate to="/auth/login" replace />} />
                <Route path='coupons' element={<Coupons settings={settings} />} />
            </Routes>
            <ProductFooter settings={settings} isCustomDomain={isCustomDomain} />
        </>
    )
}