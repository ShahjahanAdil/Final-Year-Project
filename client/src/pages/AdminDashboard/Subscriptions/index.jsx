import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Check, X, Eye } from 'lucide-react'

export default function Subscriptions() {
    const [subscriptions, setSubscriptions] = useState([])
    const [loading, setLoading] = useState(false)
    const [rejectModal, setRejectModal] = useState(false)
    const [selectedSubscription, setSelectedSubscription] = useState(null)
    const [adminNotes, setAdminNotes] = useState("")

    useEffect(() => {
        fetchSubscriptions()
    }, [])

    const fetchSubscriptions = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST}/subscriptions/admin/all`)
            if (res.status === 200) {
                setSubscriptions(res.data.subscriptions || [])
            }
        } catch (err) {
            console.error(err)
            window.toastify?.(err.response?.data?.message || "Failed to fetch subscriptions", "error")
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (id) => {
        const confirmApprove = confirm("Are you sure you want to approve this subscription?")
        if (!confirmApprove) return

        setLoading(true)
        try {
            const res = await axios.put(`${import.meta.env.VITE_HOST}/subscriptions/admin/approve/${id}`)
            if (res.status === 202) {
                window.toastify?.(res.data.message, "success")
                fetchSubscriptions()
            }
        } catch (err) {
            console.error(err)
            window.toastify?.(err.response?.data?.message || "Failed to approve subscription", "error")
        } finally {
            setLoading(false)
        }
    }

    const openRejectModal = (subscription) => {
        setSelectedSubscription(subscription)
        setAdminNotes("")
        setRejectModal(true)
    }

    const handleReject = async () => {
        if (!adminNotes.trim()) {
            window.toastify?.("Rejection note is required", "error")
            return
        }

        setLoading(true)
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_HOST}/subscriptions/admin/reject/${selectedSubscription._id}`,
                { adminNotes }
            )

            if (res.status === 202) {
                window.toastify?.(res.data.message, "success")
                setRejectModal(false)
                setSelectedSubscription(null)
                setAdminNotes("")
                fetchSubscriptions()
            }
        } catch (err) {
            console.error(err)
            window.toastify?.(err.response?.data?.message || "Failed to reject subscription", "error")
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
                    Review seller subscription payments and approve or reject requests.
                </p>
            </div>

            <div className='admin-container'>
                <div className='flex justify-between items-center gap-5'>
                    <p className='w-fit text-[12px] font-bold'>
                        <span className='text-gray-400'>Admin</span> / Subscriptions
                    </p>
                </div>

                <div className='relative overflow-x-auto mt-5'>
                    <table className='w-full text-xs text-left rtl:text-right text-gray-600'>
                        <thead className='text-[10px] text-[var(--secondary)] bg-white uppercase border-b border-gray-200'>
                            <tr>
                                <th className='font-bold px-6 py-4'>Seller</th>
                                <th className='font-bold px-6 py-4'>Plan</th>
                                <th className='font-bold px-6 py-4'>Bank</th>
                                <th className='font-bold px-6 py-4'>Transaction ID</th>
                                <th className='font-bold px-6 py-4'>Screenshot</th>
                                <th className='font-bold px-6 py-4'>Status</th>
                                <th className='font-bold px-6 py-4'>Requested</th>
                                <th className='font-bold px-6 py-4'>Reviewed</th>
                                <th className='font-bold px-6 py-4 text-end'>Actions</th>
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
                                        <td className='px-6 py-4'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-bold text-gray-900'>
                                                    {sub.sellerID?.brandName || sub.sellerID?.username}
                                                </p>
                                                <p className='text-gray-600'>{sub.sellerID?.email}</p>
                                            </div>
                                        </td>

                                        <td className='px-6 py-4 text-gray-900'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-bold'>Rs {sub.amount}</p>
                                                <p className='text-gray-400'>{sub.plan}</p>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex flex-col gap-1'>
                                                <p>{sub.selectedBank?.bankName}</p>
                                                <p className='text-gray-400'>{sub.selectedBank?.accountNumber}</p>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>{sub.transactionID}</td>

                                        <td className='px-6 py-4'>
                                            <a
                                                href={`${import.meta.env.VITE_HOST}${sub.transactionScreenshot}`}
                                                target='_blank'
                                                rel='noreferrer'
                                                className='text-blue-500 flex items-center gap-1 hover:text-blue-300'
                                            >
                                                <Eye size={14} /> View
                                            </a>
                                        </td>

                                        <td className='px-6 py-4 capitalize'>
                                            <span className={`text-[10px] px-2 py-1 font-bold ${getStatusClass(sub.status)}`}>
                                                {sub.status}
                                            </span>
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {dayjs(sub.createdAt).format('DD MMM YYYY, hh:mm A')}
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {dayjs(sub.reviewedAt).format('DD MMM YYYY, hh:mm A')}
                                        </td>

                                        <td className='px-6 py-4'>
                                            {sub.status === 'pending' ? (
                                                <div className='flex justify-end gap-2 items-center'>
                                                    <Check
                                                        size={17}
                                                        className='text-green-500 cursor-pointer hover:text-green-300'
                                                        onClick={() => handleApprove(sub._id)}
                                                    />

                                                    <X
                                                        size={18}
                                                        className='text-red-500 cursor-pointer hover:text-red-300'
                                                        onClick={() => openRejectModal(sub)}
                                                    />
                                                </div>
                                            ) : (
                                                <p className='text-end text-gray-400'>Reviewed</p>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='bg-white'>
                                    <td colSpan={9} className='px-6 py-4 text-center text-red-500'>
                                        No subscription request found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={`fixed top-0 left-0 w-full h-screen bg-black/40 z-50 flex justify-center items-center px-4 transition-all duration-200 ${rejectModal ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    <div className='bg-white w-full max-w-md p-6'>
                        <p className='font-bold text-gray-900'>Reject Subscription</p>
                        <p className='text-xs text-gray-500 mt-1'>
                            Add a rejection note. Seller will see this note in subscription history.
                        </p>

                        <textarea
                            rows={5}
                            value={adminNotes}
                            onChange={e => setAdminNotes(e.target.value)}
                            placeholder='Example: Transaction screenshot is unclear or transaction ID is incorrect.'
                            className='w-full mt-4 border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[var(--secondary)]'
                        />

                        <div className='flex justify-end gap-3 mt-5'>
                            <button
                                onClick={() => {
                                    setRejectModal(false)
                                    setSelectedSubscription(null)
                                    setAdminNotes("")
                                }}
                                className='px-4 py-1.5 bg-gray-100 text-gray-600'
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleReject}
                                className='px-4 py-1.5 bg-[#f73535] text-white'
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}