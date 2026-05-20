import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext'
import { Box, CircleDollarSign } from "lucide-react"
import Loader from '../../../components/Loader'
import dayjs from 'dayjs'
import axios from 'axios'

function TrackOrderModal({ order, currency, onClose }) {
    const steps = ['pending', 'processing', 'shipped', 'delivered']
    const isNegative = order.status === 'cancelled' || order.status === 'returned'

    const negativeSteps = isNegative
        ? ['pending', order.status]
        : null

    const activeSteps = negativeSteps || steps

    const getTimestamp = (status) => {
        const entry = order.statusHistory?.find(h => h.status === status)
        return entry ? dayjs(entry.timestamp).format('DD MMM YYYY, hh:mm A') : null
    }

    const currentIndex = activeSteps.indexOf(order.status)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold"
                    onClick={onClose}
                >✕</button>

                <p className="text-base font-bold text-gray-800 mb-1">
                    Track Order <span className="text-[var(--pr)]">#{order.orderID}</span>
                </p>
                <p className="text-xs text-gray-500 mb-6">
                    Placed on {dayjs(order.createdAt).format('DD MMM YYYY')}
                </p>

                <div className="flex flex-col gap-0">
                    {activeSteps.map((step, index) => {
                        const isDone = index <= currentIndex
                        const isLast = index === activeSteps.length - 1
                        const timestamp = getTimestamp(step)
                        const isCancel = step === 'cancelled'
                        const isReturn = step === 'returned'

                        const dotColor = isDone
                            ? (isCancel || isReturn) ? 'bg-red-500' : 'bg-green-500'
                            : 'bg-gray-200'

                        const lineColor = index < currentIndex
                            ? (isCancel || isReturn) ? 'bg-red-300' : 'bg-green-400'
                            : 'bg-gray-200'

                        const labelColor = isDone
                            ? (isCancel || isReturn) ? 'text-red-600' : 'text-green-600'
                            : 'text-gray-400'

                        return (
                            <div key={step} className="flex gap-4">
                                {/* Left: dot + line */}
                                <div className="flex flex-col items-center">
                                    <div className={`w-4 h-4 rounded-full mt-0.5 shrink-0 border-2 ${isDone ? 'border-transparent' : 'border-gray-300'} ${dotColor}`} />
                                    {!isLast && (
                                        <div className={`w-0.5 flex-1 min-h-[32px] my-1 ${lineColor}`} />
                                    )}
                                </div>

                                {/* Right: label + time */}
                                <div className="pb-5">
                                    <p className={`text-sm font-semibold capitalize ${labelColor}`}>{step}</p>
                                    {timestamp
                                        ? <p className="text-xs text-gray-400 mt-0.5">{timestamp}</p>
                                        : <p className="text-xs text-gray-300 mt-0.5">Awaiting update</p>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default function Orders({ isCustomDomain }) {
    const { user } = useAuthContext()
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [currency, setCurrency] = useState("")
    const [trackingOrder, setTrackingOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()
    const tab = searchParams.get("tab") || "all"

    useEffect(() => {
        if (!user._id) return
        fetchOrders()
    }, [user])

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${import.meta.env.VITE_HOST}/user/orders/all?userID=${user._id}`)
            setOrders(res.data.orders || [])
            setCurrency(res.data.currency)
        } catch (err) {
            console.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!orders.length) return

        let filtered = []

        switch (tab) {
            case "pending":
                filtered = orders.filter(o =>
                    !["delivered", "returned", "cancelled"].includes(o.status)
                )
                break

            case "completed":
                filtered = orders.filter(o => o.status === "delivered")
                break

            case "refunded":
                filtered = orders.filter(o => o.status === "returned")
                break

            default:
                filtered = orders
        }

        setFilteredOrders(filtered)
    }, [orders, tab])

    if (loading) return <Loader />

    const getButtonClass = (currentTab) =>
        `text-xs sm:text-sm transition-all duration-200 ease-linear ${tab === currentTab
            ? "text-[var(--pr)] font-semibold"
            : "text-[var(--text)] hover:text-[var(--pr)]"
        }`

    return (
        <div className="px-2.5 sm:px-4 md:px-8 py-4 w-full rounded-[12px]">
            {/* Tabs */}
            <div className="flex flex-wrap w-fit head justify-between gap-4 sm:gap-6 md:gap-8 font-bold">
                <button className={getButtonClass("all")} onClick={() => navigate("/user/orders?tab=all")}>
                    All Orders
                </button>
                <button className={getButtonClass("pending")} onClick={() => navigate("/user/orders?tab=pending")}>
                    Pending Orders
                </button>
                <button className={getButtonClass("completed")} onClick={() => navigate("/user/orders?tab=completed")}>
                    Completed Orders
                </button>
                <button className={getButtonClass("refunded")} onClick={() => navigate("/user/orders?tab=refunded")}>
                    Refunded Orders
                </button>
            </div>

            {/* Orders List */}
            {filteredOrders.length > 0 ?
                filteredOrders.map(order => (
                    <div key={order._id} className="bg-white border border-gray-200 light-shad p-4 sm:p-6 mt-6 rounded-2xl">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3 md:gap-0">
                            <div>
                                <p className="font-semibold text-gray-800 text-xs sm:text-sm">
                                    Order ID <span className="text-[var(--pr)]">#{order.orderID}</span>
                                </p>
                                <p className="text-neutral-500 text-xs sm:text-sm">
                                    Placed on {dayjs(order.createdAt).format("DD MMM YYYY")}
                                </p>
                            </div>

                            <div className='flex w-full sm:w-fit justify-start sm:justify-end gap-2'>
                                <div className={`flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1 rounded-md font-semibold capitalize ${order.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-500" :
                                    order.paymentStatus === "processing" ? "bg-amber-100 text-amber-500" : order.paymentStatus === "paid" ? "bg-green-100 text-green-500" :
                                        order.paymentStatus === "refunded" ? "bg-red-100 text-red-500" : order.paymentStatus === "failed" ? "bg-red-100 text-red-500" : ""}`}
                                >
                                    <CircleDollarSign size={12} /> {order.paymentStatus}
                                </div>
                                <div className={`flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1 rounded-md font-semibold capitalize ${order.status === "pending" ? "bg-yellow-100 text-yellow-500" :
                                    order.status === "processing" ? "bg-amber-100 text-amber-500" : order.status === "shipped" ? "bg-amber-100 text-amber-500" :
                                        order.status === "delivered" ? "bg-green-100 text-green-500" : order.status === "returned" ? "bg-red-100 text-red-500" : order.status === "cancelled" ? "bg-red-100 text-red-500" : ""}`}
                                >
                                    <Box size={12} /> {order.status}
                                </div>
                                <button
                                    className="flex items-center gap-1 text-[10px] sm:text-xs px-2.5 py-1 rounded-md font-semibold bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                    onClick={() => setTrackingOrder(order)}
                                >
                                    <Box size={12} /> Track Order
                                </button>
                            </div>
                        </div>

                        {/* Products inside this order */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {order.products.map((product, index) => (
                                <div key={index} className='border border-neutral-200 p-4 rounded-xl'>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                        <img
                                            src={`${import.meta.env.VITE_HOST}${product.variantImageURL || product.mainImageURL}`}
                                            alt={product.title}
                                            className="w-16 h-16 sm:w-20 sm:h-20 p-1 object-contain bg-white border border-neutral-200 rounded-full"
                                        />
                                        <div>
                                            <a
                                                href={
                                                    isCustomDomain
                                                        ? `/product/${product.slug}`
                                                        : `/brand/${product.brandSlug}/product/${product.slug}`
                                                }
                                                target="_blank"
                                                className="head text-sm sm:text-base text-gray-800 transition-all duration-200 ease-out hover:text-blue-500"
                                            >
                                                {product.title}
                                            </a>
                                            <div className="flex flex-wrap gap-3 text-xs text-gray-800 mt-1">
                                                {product.selectedOptions.map((opt, i) => (
                                                    <p key={i} className='bg-white px-1.5 py-0.5 border border-neutral-200 rounded'>{opt.optionName}: {opt.optionValue}</p>
                                                ))}
                                                <p className='bg-white px-1.5 py-0.5 border border-neutral-200 rounded'>Quantity: {product.quantity}</p>
                                            </div>
                                            <p className="font-bold text-gray-900 mt-1">
                                                {currency} {product.price.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex justify-end items-center border-t border-neutral-300 mt-4 pt-3'>
                                        {(order.status === "delivered" && !product.reviewed) ?
                                            <button className='text-xs bg-(--secondary) font-semibold text-white px-4 py-2 rounded-lg transition-all duration-200 ease-out hover:opacity-70'
                                                onClick={() => navigate(`/user/reviews/add-review/${order.orderID}?index=${index}`)}
                                            >
                                                Add Review
                                            </button>
                                            : (order.status === "delivered" && product.reviewed) ?
                                                <p className='text-xs text-green-500 font-bold p-2'>Reviewed</p>
                                                : ""
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="border-t border-gray-200 mt-4 pt-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-sm font-semibold text-gray-800">
                            <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xs text-neutral-700'>Total Amount:</p>
                                    <p>{currency} {order.totalAmount.toLocaleString()}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className='text-xs text-neutral-700'>Discount:</p>
                                    <p>{currency} {order.discountAmount.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className='text-xs text-neutral-700'>Net Amount:</p>
                                <p>{currency} {order.finalAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))
                :
                <p className='text-center text-red-500 mt-6 border border-gray-200 light-shad p-6 rounded-2xl'>No order found!</p>
            }

            {trackingOrder && (
                <TrackOrderModal
                    order={trackingOrder}
                    currency={currency}
                    onClose={() => setTrackingOrder(null)}
                />
            )}
        </div>
    )
}