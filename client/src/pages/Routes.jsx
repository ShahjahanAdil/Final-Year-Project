import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import Admin from './AdminDashboard'
import Seller from './SellerDashboard'
import User from './UserDashboard'
import Platform from './Platform'
import PrivateRoute from '../components/PrivateRoute'
import { useSellerAuthContext } from '../contexts/SellerAuthContext'

export default function Index() {
    const { sellerIsAuthenticated, user } = useSellerAuthContext()
    // const [isCustomDomain, setIsCustomDomain] = useState(false)
    const location = useLocation()

    // useEffect(() => {
    //     const currentDomain = window.location.hostname;
    //     const customDomain =
    //         !currentDomain.includes('localhost') &&
    //         !currentDomain.includes('vercel.app') &&
    //         !currentDomain.includes(import.meta.env.VITE_MAIN_DOMAIN);

    //     setIsCustomDomain(customDomain)
    // }, [])

    const currentDomain = window.location.hostname;
    const isCustomDomain =
        !currentDomain.includes('localhost') &&
        !currentDomain.includes('vercel.app') &&
        !currentDomain.includes(import.meta.env.VITE_MAIN_DOMAIN);

    useEffect(() => {
        const isOnStorePage = location.pathname.startsWith('/brand/') || isCustomDomain

        if (!isOnStorePage) {
            const storeTags = document.querySelectorAll('[data-store-tag]')

            if (storeTags.length > 0) {
                storeTags.forEach(tag => {
                    try {
                        tag.remove()
                    } catch (error) {
                        console.error('Error removing store tag:', error)
                    }
                })
                // console.log(`🧹 Cleaned up ${storeTags.length} store tags (navigated to main site)`)
            }
        }
    }, [location.pathname, isCustomDomain])

    if (isCustomDomain) {
        return (
            <Routes>
                <Route path="/*" element={<Platform isCustomDomain={isCustomDomain} />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/user/*" element={<PrivateRoute Component={User} allowedRoles={["user", "seller", "admin"]} />} isCustomDomain={isCustomDomain} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path='/*' element={<Frontend />} />
            <Route path='/brand/:brandSlug/*' element={<Platform isCustomDomain={false} />} />
            <Route path='/auth/*' element={<Auth />} />
            <Route path='/admin/*' element={<PrivateRoute Component={Admin} allowedRoles={["admin"]} />} />
            <Route path='/seller/*' element={sellerIsAuthenticated && user?.role === "seller" && user?.status === 'approved' ? <Seller /> : <Navigate to="/auth/seller/login" replace />} />
            <Route path='/user/*' element={<PrivateRoute Component={User} allowedRoles={["user", "seller", "admin"]} isCustomDomain={false} />} />
        </Routes>
    )
}