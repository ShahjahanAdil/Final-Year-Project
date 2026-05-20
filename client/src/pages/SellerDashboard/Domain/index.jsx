import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSellerAuthContext } from '../../../contexts/SellerAuthContext'
import ButtonLoader from '../../../components/ButtonLoader'
import Loader from '../../../components/Loader'

export default function Domain() {
    const { user } = useSellerAuthContext()
    const [settings, setSettings] = useState({})
    const [domain, setDomain] = useState("")
    const [loading, setLoading] = useState(true)
    const [adding, setAdding] = useState(false)
    const [removing, setRemoving] = useState(false)

    useEffect(() => {
        if (!user._id) return
        fetchSettings()
    }, [user])

    useEffect(() => {
        setDomain(settings.domain || "")
    }, [settings])

    const fetchSettings = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/seller/domain/fetch-settings?sellerID=${user._id}`)
            .then(res => {
                setSettings(res.data.settings || {})
            })
            .catch(err => console.log("Frontend GET error: ", err.message))
            .finally(() => setLoading(false))
    }

    const handleAddDomain = () => {
        if (!domain.trim()) return window.toastify("Please enter a domain", "warning")

        setAdding(true)
        axios.post(`${import.meta.env.VITE_HOST}/seller/domain/add-domain`, {
            sellerID: user._id,
            domain: domain.trim()
        })
            .then(res => {
                window.toastify(res.data.message, "success")
                fetchSettings()
            })
            .catch(err => {
                console.log("Add domain error: ", err)
                window.toastify(err.response?.data?.message || "Failed to add domain", "error")
            })
            .finally(() => setAdding(false))
    }

    const handleRemoveDomain = () => {
        if (!window.confirm("Are you sure you want to remove this domain?")) return

        setRemoving(true)
        axios.delete(`${import.meta.env.VITE_HOST}/seller/domain/remove-domain?sellerID=${user._id}`)
            .then(res => {
                window.toastify(res.data.message, "success")
                setDomain("")
                fetchSettings()
            })
            .catch(err => {
                console.log("Remove domain error: ", err)
                window.toastify(err.response?.data?.message || "Failed to remove domain", "error")
            })
            .finally(() => setRemoving(false))
    }

    if (loading) return <Loader />

    return (
        <>
            <div className='bg-[#fafafa] px-3 sm:px-5 md:px-8 py-2.5 sm:py-4'>
                <p className='font-bold text-gray-900'>Domain Management</p>
                <p className='text-[12px] sm:text-[13px] text-gray-900'>Manage and add a custom domain for your store here. Follow the instructions carefully.</p>
            </div>

            <div className='seller-container'>
                <p className='w-fit text-[12px] font-bold'><span className='text-gray-400'>Seller</span> / Domain Management</p>

                <div className='flex flex-col gap-4 w-full max-w-3xl bg-white p-6 mb-6 light-shad mt-6'>
                    <h1 className='text-sm text-[var(--primary)]'>
                        {settings.domain ? "Manage Custom Domain" : "Add Custom Domain"}
                    </h1>

                    {settings.domain && (
                        <div className='bg-green-50 border border-green-200 p-3 rounded'>
                            <p className='text-xs font-bold text-green-800'>Current Domain:</p>
                            <p className='text-sm text-green-900 mt-1'>{settings.domain}</p>
                        </div>
                    )}

                    <div>
                        <label className='text-xs font-bold text-gray-900'>
                            {settings.domain ? "Update Domain *" : "Domain *"}
                        </label>
                        <div className='flex gap-2 mt-3'>
                            <input type="text" name="domain" id="domain" value={domain} placeholder='example.com' className='block w-full text-sm !p-3 bg-white border border-gray-300 !rounded-none'
                                disabled={adding || removing}
                                onChange={e => setDomain(e.target.value)}
                            />
                            <button
                                className={`${settings.domain ? "bg-[var(--secondary)]" : "bg-[var(--primary)]"} px-4 text-xs text-white font-bold transition-all duration-200 ease-out hover:opacity-70 disabled:opacity-50 whitespace-nowrap`}
                                disabled={adding || removing || !domain.trim()}
                                onClick={handleAddDomain}
                            >
                                {!adding ? (settings.domain ? "Update" : "Add") : <ButtonLoader />}
                            </button>
                            {settings.domain && (
                                <button
                                    className='bg-red-600 px-4 text-xs text-white font-bold transition-all duration-200 ease-out hover:opacity-70 disabled:opacity-50'
                                    disabled={adding || removing}
                                    onClick={handleRemoveDomain}
                                >
                                    {!removing ? "Remove" : <ButtonLoader />}
                                </button>
                            )}
                        </div>
                        <p className='text-xs text-gray-800 mt-2'>Do not add www. in your domain here</p>
                    </div>

                    <div className='mt-2'>
                        <p className='w-fit px-1.5 py-0.5 text-xs bg-amber-100 text-amber-500 mb-2'>* Note</p>
                        <p className='text-sm text-gray-800'>After adding domain, add these Nameservers to your domain from your domain provider dashboard.</p>
                        <p className='text-sm text-gray-800'>The domain setup can take up to 24 hours for configuration.</p>
                        <ul className='list-disc mt-2 ml-4'>
                            <li className='text-sm text-gray-900 font-bold'>ns1.vercel-dns.com</li>
                            <li className='text-sm text-gray-900 font-bold'>ns2.vercel-dns.com</li>
                        </ul>
                    </div>

                    {settings.domain && (
                        <div className='mt-2'>
                            <p className='w-fit px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 mb-2'>ℹ Info</p>
                            <p className='text-sm text-gray-800'>
                                If you update your domain, the old domain will be automatically removed from Vercel and the new one will be added.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}