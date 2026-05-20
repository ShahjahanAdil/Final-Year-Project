import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import { useSellerAuthContext } from '../../../contexts/SellerAuthContext'

export default function Subscriptions() {
    const { user } = useSellerAuthContext()
    const navigate = useNavigate()

    const [seller, setSeller] = useState(null)
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user?._id) {
            fetchSubscriptions()
        }
    }, [user])

    const fetchSubscriptions = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST}/subscriptions/seller/${user._id}`)
            if (res.status === 200) {
                setSeller(res.data.seller)
                setSubscriptions(res.data.subscriptions || [])
            }
        } catch (err) {
            console.error(err)
            window.toastify?.(err.response?.data?.message || "Failed to fetch subscriptions", "error")
        } finally {
            setLoading(false)
        }
    }

    const getStatusClass = (status) => {
        if (status === 'approved') return 'text-green-600 bg-green-100'
        if (status === 'pending') return 'text-yellow-600 bg-yellow-100'
        if (status === 'rejected') return 'text-red-600 bg-red-100'
        if (status === 'expired') return 'text-gray-600 bg-gray-100'
        return 'text-gray-600 bg-gray-100'
    }

    return (
        <>
            <div className='bg-[#fafafa] px-3 sm:px-5 md:px-8 py-2.5 sm:py-4'>
                <p className='font-bold text-gray-900'>Subscriptions</p>
                <p className='text-[12px] sm:text-[13px] text-gray-900'>
                    Manage your trial, active plan and subscription purchase history.
                </p>
            </div>

            <div className='seller-container'>
                <div className='flex flex-col md:flex-row justify-between gap-4 md:items-center'>
                    <p className='w-fit text-[12px] font-bold'>
                        <span className='text-gray-400'>Seller</span> / Subscriptions
                    </p>

                    <button
                        onClick={() => navigate(`/subscription/buy/Basic?sellerID=${user?._id}`)}
                        className='text-sm text-white bg-[var(--primary)] px-6 py-2 transition-all duration-150 ease-linear hover:bg-[var(--primary)]/70'
                    >
                        Buy Plan
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-5'>
                    <div className='bg-white border border-gray-200 p-5'>
                        <p className='text-xs text-gray-500'>Current Plan</p>
                        <p className='text-lg font-bold text-gray-900 mt-1'>
                            {seller?.plan || 'No Plan'}
                        </p>
                    </div>

                    <div className='bg-white border border-gray-200 p-5'>
                        <p className='text-xs text-gray-500'>Subscription Status</p>
                        <p className='text-lg font-bold text-gray-900 mt-1 capitalize'>
                            {seller?.subscriptionStatus || 'none'}
                        </p>
                    </div>

                    <div className='bg-white border border-gray-200 p-5'>
                        <p className='text-xs text-gray-500'>Started At</p>
                        <p className='text-lg font-bold text-gray-900 mt-1'>
                            {seller?.subscriptionStartedAt ? dayjs(seller.subscriptionStartedAt).format('DD MMM YYYY') : '-'}
                        </p>
                    </div>

                    <div className='bg-white border border-gray-200 p-5'>
                        <p className='text-xs text-gray-500'>Expires At</p>
                        <p className='text-lg font-bold text-gray-900 mt-1'>
                            {seller?.subscriptionEndsAt ? dayjs(seller.subscriptionEndsAt).format('DD MMM YYYY') : '-'}
                        </p>
                    </div>
                </div>

                {seller?.subscriptionStatus === 'expired' && (
                    <div className='mt-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm'>
                        Your trial or subscription has expired. Your store is currently under maintenance. Please buy a new plan to activate your store again.
                    </div>
                )}

                {seller?.subscriptionStatus === 'trial' && (
                    <div className='mt-5 bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 text-sm'>
                        You are currently using your 7-day free trial. Please purchase a subscription before trial expiry to keep your store live.
                    </div>
                )}

                <div className='relative overflow-x-auto mt-6'>
                    <table className='w-full text-xs text-left rtl:text-right text-gray-600'>
                        <thead className='text-[10px] text-[var(--primary)] bg-white uppercase border-b border-gray-200'>
                            <tr>
                                <th className='font-bold px-6 py-4'>Plan</th>
                                <th className='font-bold px-6 py-4'>Amount</th>
                                <th className='font-bold px-6 py-4'>Bank</th>
                                <th className='font-bold px-6 py-4'>Transaction ID</th>
                                <th className='font-bold px-6 py-4'>Status</th>
                                <th className='font-bold px-6 py-4'>Requested At</th>
                                <th className='font-bold px-6 py-4'>Start</th>
                                <th className='font-bold px-6 py-4'>Expiry</th>
                                <th className='font-bold px-6 py-4'>Admin Notes</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr className='bg-white'>
                                    <td colSpan={9} className='py-20 text-center'>
                                        Loading...
                                    </td>
                                </tr>
                            ) : subscriptions.length > 0 ? (
                                subscriptions.map(sub => (
                                    <tr key={sub._id} className='bg-white border-b border-gray-200'>
                                        <td className='px-6 py-4 font-bold text-gray-900'>{sub.plan}</td>
                                        <td className='px-6 py-4'>Rs {sub.amount}</td>
                                        <td className='px-6 py-4'>{sub.selectedBank?.bankName}</td>
                                        <td className='px-6 py-4'>{sub.transactionID}</td>
                                        <td className='px-6 py-4 capitalize'>
                                            <span className={`text-[10px] px-2 py-1 font-bold ${getStatusClass(sub.status)}`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {dayjs(sub.createdAt).format('DD MMM YYYY, hh:mm A')}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {sub.startedAt ? dayjs(sub.startedAt).format('DD MMM YYYY') : '-'}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {sub.expiresAt ? dayjs(sub.expiresAt).format('DD MMM YYYY') : '-'}
                                        </td>
                                        <td className='px-6 py-4 text-red-500'>
                                            {sub.status === 'rejected' ? sub.adminNotes : '-'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='bg-white'>
                                    <td colSpan={9} className='px-6 py-4 text-center text-red-500'>
                                        No subscription history found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}