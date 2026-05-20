import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../contexts/AuthContext';
import { LuPartyPopper } from "react-icons/lu";
import { Box, CircleDollarSign, ArrowRight, ShoppingBag } from "lucide-react";
import axios from 'axios';
import Loader from '../../../components/Loader';
import dayjs from 'dayjs';

export default function Dashboard() {
    const { user } = useAuthContext()
    const [totals, setTotals] = useState({})
    const [recentOrders, setRecentOrders] = useState([])
    const [currency, setCurrency] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (user._id) fetchData()
    }, [user._id])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [totalsRes, ordersRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_HOST}/user/dashboard/totals?userID=${user._id}`),
                axios.get(`${import.meta.env.VITE_HOST}/user/orders/recent?userID=${user._id}`)
            ])
            setTotals(totalsRes.data.totals)
            setRecentOrders(ordersRes.data.orders || [])
            setCurrency(ordersRes.data.currency || "")
        } catch (err) {
            console.error("Dashboard fetch error:", err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Loader />

    const statusStyle = {
        pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
        processing: "bg-amber-50 text-amber-600 border-amber-200",
        shipped: "bg-blue-50 text-blue-600 border-blue-200",
        delivered: "bg-green-50 text-green-600 border-green-200",
        returned: "bg-red-50 text-red-600 border-red-200",
        cancelled: "bg-red-50 text-red-600 border-red-200",
    }

    return (
        <div className="space-y-8 p-4 sm:p-6">

            {/* Welcome Banner */}
            <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-3'>
                <h2 className="text-xl font-semibold head">Dashboard</h2>
                <p className='flex items-center gap-2 text-sm bg-(--userPr)/20 border border-(--userPr)/40 px-3 py-1.5 rounded-lg w-fit'>
                    <LuPartyPopper /> Welcome Back! <span className='font-bold'>{user.username}</span>
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white border border-neutral-200 shad rounded-xl p-4 sm:p-6 cursor-pointer hover:border-blue-200 transition-colors" onClick={() => navigate("/user/orders")}>
                    <p className="text-sm font-bold text-neutral-700 pb-3 sm:pb-4 border-b border-gray-200">Total Orders</p>
                    <div className="pt-6 sm:pt-8">
                        <div className="flex justify-between items-end">
                            <p className="text-3xl text-neutral-800">{totals.totalOrders || 0}</p>
                            <div className='text-blue-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                                    <path d="M8 7H16C17.8856 7 18.8284 7 19.4142 7.58579C20 8.17157 20 9.11438 20 11V15C20 18.2998 20 19.9497 18.9749 20.9749C17.9497 22 16.2998 22 13 22H11C7.70017 22 6.05025 22 5.02513 20.9749C4 19.9497 4 18.2998 4 15V11C4 9.11438 4 8.17157 4.58579 7.58579C5.17157 7 6.11438 7 8 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M16 9.5C16 5.63401 14.2091 2 12 2C9.79086 2 8 5.63401 8 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 shad rounded-xl p-4 sm:p-6 cursor-pointer hover:border-red-200 transition-colors" onClick={() => navigate("/user/favourites")}>
                    <p className="text-sm font-bold text-neutral-700 pb-3 sm:pb-4 border-b border-gray-200">Favourites</p>
                    <div className="pt-6 sm:pt-8">
                        <div className="flex justify-between items-end">
                            <p className="text-3xl text-neutral-800">{user.favourites.length}</p>
                            <div className='text-red-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none">
                                    <path d="M10.4107 19.9677C7.58942 17.858 2 13.0348 2 8.69444C2 5.82563 4.10526 3.5 7 3.5C8.5 3.5 10 4 12 6C14 4 15.5 3.5 17 3.5C19.8947 3.5 22 5.82563 22 8.69444C22 13.0348 16.4106 17.858 13.5893 19.9677C12.6399 20.6776 11.3601 20.6776 10.4107 19.9677Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-neutral-200 shad rounded-xl p-4 sm:p-6 cursor-pointer hover:border-amber-200 transition-colors" onClick={() => navigate("/user/orders?tab=pending")}>
                    <p className="text-sm font-bold text-neutral-700 pb-3 sm:pb-4 border-b border-gray-200">Pending Orders</p>
                    <div className="pt-6 sm:pt-8">
                        <div className="flex justify-between items-end">
                            <p className="text-3xl text-neutral-800">{totals.pendingOrders || 0}</p>
                            <div className='text-amber-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white border border-neutral-200 shad rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-200">
                    <div>
                        <h3 className="head text-sm font-bold text-neutral-800">Recent Orders</h3>
                        <p className="text-xs text-neutral-400 mt-0.5">Your last 3 orders</p>
                    </div>
                    <button
                        onClick={() => navigate("/user/orders")}
                        className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        View All <ArrowRight size={13} />
                    </button>
                </div>

                {recentOrders.length > 0 ? (
                    <div className="flex flex-col divide-y divide-gray-100">
                        {recentOrders.map(order => {
                            const firstProduct = order.products?.[0]
                            const extraCount = order.products.length - 1
                            return (
                                <div key={order._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 first:pt-0 last:pb-0">
                                    {/* Product preview */}
                                    <div className="flex items-center gap-3">
                                        <div className="relative shrink-0">
                                            <img
                                                src={`${import.meta.env.VITE_HOST}${firstProduct?.variantImageURL || firstProduct?.mainImageURL}`}
                                                alt={firstProduct?.title}
                                                className="w-12 h-12 object-contain bg-gray-50 border border-neutral-200 rounded-lg p-1"
                                            />
                                            {extraCount > 0 && (
                                                <span className="absolute -top-1.5 -right-1.5 bg-neutral-700 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                                    +{extraCount}
                                                </span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800 line-clamp-1 max-w-[180px] sm:max-w-[240px]">
                                                {firstProduct?.title}
                                            </p>
                                            <p className="text-xs text-neutral-400 mt-0.5">
                                                Order <span className='font-medium text-neutral-500'>#{order.orderID}</span> · {dayjs(order.createdAt).format("DD MMM YYYY")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right side: status + amount */}
                                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 sm:gap-1 shrink-0">
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border capitalize ${statusStyle[order.status] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
                                            {order.status}
                                        </span>
                                        <p className="text-sm font-bold text-gray-800">
                                            {currency} {order.finalAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-10 gap-3 text-neutral-400">
                        <ShoppingBag size={36} strokeWidth={1.2} />
                        <p className="text-sm">No orders yet</p>
                        <button
                            onClick={() => navigate("/")}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Start Shopping →
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}