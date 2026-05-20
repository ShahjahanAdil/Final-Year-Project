import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import {
    Users,
    Store,
    CreditCard,
    Wallet,
    UserCheck,
    UserRoundX,
    Clock,
    ShieldAlert,
    ArrowUpRight,
    RefreshCcw,
    CheckCircle,
    XCircle,
    AlertCircle,
} from 'lucide-react'

const initialAnalytics = {
    totalUsers: 0,
    totalSellers: 0,
    approvedSellers: 0,
    pendingSellers: 0,
    bannedSellers: 0,
    activeSubscriptions: 0,
    pendingSubscriptions: 0,
    rejectedSubscriptions: 0,
    expiredSubscriptions: 0,
    totalSubscriptionRevenue: 0,
    recentSellers: [],
    recentSubscriptions: [],
}

export default function Dashboard() {
    const [analytics, setAnalytics] = useState(initialAnalytics)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        setLoading(true)

        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST}/admin/dashboard/analytics`)

            if (res.status === 200) {
                setAnalytics(res.data.analytics || initialAnalytics)
            }
        } catch (err) {
            console.error(err)
            window.toastify?.(err.response?.data?.message || "Failed to fetch dashboard analytics", "error")
        } finally {
            setLoading(false)
        }
    }

    const formatNumber = (value) => {
        return Number(value || 0).toLocaleString()
    }

    const getSellerStatusClass = (status) => {
        if (status === "approved") return "bg-green-100 text-green-700"
        if (status === "pending") return "bg-yellow-100 text-yellow-700"
        if (status === "rejected") return "bg-red-100 text-red-700"
        if (status === "banned") return "bg-orange-100 text-orange-700"
        return "bg-gray-100 text-gray-700"
    }

    const getSubscriptionStatusClass = (status) => {
        if (status === "approved") return "bg-green-100 text-green-700"
        if (status === "pending") return "bg-yellow-100 text-yellow-700"
        if (status === "rejected") return "bg-red-100 text-red-700"
        if (status === "expired") return "bg-gray-100 text-gray-700"
        return "bg-gray-100 text-gray-700"
    }

    const mainCards = [
        {
            title: "Registered Users",
            value: analytics.totalUsers,
            subtitle: "Customer accounts",
            icon: Users,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            title: "Registered Sellers",
            value: analytics.totalSellers,
            subtitle: "All seller accounts",
            icon: Store,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            title: "Subscription Revenue",
            value: `Rs ${formatNumber(analytics.totalSubscriptionRevenue)}`,
            subtitle: "Approved subscriptions",
            icon: Wallet,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            title: "Active Subscriptions",
            value: analytics.activeSubscriptions,
            subtitle: "Currently approved plans",
            icon: CreditCard,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
        },
    ]

    const sellerCards = [
        {
            title: "Approved Sellers",
            value: analytics.approvedSellers,
            icon: UserCheck,
            className: "bg-green-50 text-green-700",
        },
        {
            title: "Pending Sellers",
            value: analytics.pendingSellers,
            icon: Clock,
            className: "bg-yellow-50 text-yellow-700",
        },
        {
            title: "Banned Sellers",
            value: analytics.bannedSellers,
            icon: UserRoundX,
            className: "bg-orange-50 text-orange-700",
        },
    ]

    const subscriptionCards = [
        {
            title: "Pending Requests",
            value: analytics.pendingSubscriptions,
            icon: AlertCircle,
            className: "bg-yellow-50 text-yellow-700",
        },
        {
            title: "Rejected Requests",
            value: analytics.rejectedSubscriptions,
            icon: XCircle,
            className: "bg-red-50 text-red-700",
        },
        {
            title: "Expired Plans",
            value: analytics.expiredSubscriptions,
            icon: ShieldAlert,
            className: "bg-gray-100 text-gray-700",
        },
    ]

    return (
        <>
            <div className='bg-[#fafafa] px-3 sm:px-5 md:px-8 py-2.5 sm:py-4'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3'>
                    <div>
                        <p className='font-bold text-gray-900'>Dashboard</p>
                        <p className='text-[12px] sm:text-[13px] text-gray-900'>
                            Monitor users, sellers, subscriptions and platform revenue from one place.
                        </p>
                    </div>

                    <button
                        onClick={fetchAnalytics}
                        disabled={loading}
                        className='w-fit flex items-center gap-2 text-xs bg-[var(--secondary)] text-white px-4 py-2 font-semibold hover:bg-[var(--secondary)]/80 disabled:opacity-60'
                    >
                        <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className='admin-container'>
                <p className='w-fit text-[12px] font-bold'>
                    <span className='text-gray-400'>Admin</span> / Dashboard
                </p>

                {/* Main Analytics */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6'>
                    {mainCards.map((card, index) => {
                        const Icon = card.icon

                        return (
                            <div key={index} className='bg-white border border-gray-200 p-5 shadow-sm'>
                                <div className='flex justify-between items-start gap-4'>
                                    <div>
                                        <p className='text-xs font-semibold text-gray-500'>{card.title}</p>
                                        <h2 className='text-2xl font-bold text-gray-900 mt-2'>
                                            {typeof card.value === "number" ? formatNumber(card.value) : card.value}
                                        </h2>
                                        <p className='text-xs text-gray-400 mt-1'>{card.subtitle}</p>
                                    </div>

                                    <div className={`w-11 h-11 flex items-center justify-center ${card.iconBg}`}>
                                        <Icon size={22} className={card.iconColor} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Status Breakdown */}
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5'>
                    <div className='bg-white border border-gray-200 p-5 shadow-sm'>
                        <div className='flex justify-between items-center mb-5'>
                            <div>
                                <p className='font-bold text-gray-900'>Seller Status</p>
                                <p className='text-xs text-gray-500'>Breakdown of seller accounts</p>
                            </div>
                            <Store size={20} className='text-gray-400' />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                            {sellerCards.map((card, index) => {
                                const Icon = card.icon

                                return (
                                    <div key={index} className={`p-4 ${card.className}`}>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-xs font-bold'>{card.title}</p>
                                            <Icon size={18} />
                                        </div>
                                        <p className='text-2xl font-bold mt-3'>{formatNumber(card.value)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='bg-white border border-gray-200 p-5 shadow-sm'>
                        <div className='flex justify-between items-center mb-5'>
                            <div>
                                <p className='font-bold text-gray-900'>Subscription Status</p>
                                <p className='text-xs text-gray-500'>Breakdown of plan requests</p>
                            </div>
                            <CreditCard size={20} className='text-gray-400' />
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                            {subscriptionCards.map((card, index) => {
                                const Icon = card.icon

                                return (
                                    <div key={index} className={`p-4 ${card.className}`}>
                                        <div className='flex justify-between items-center'>
                                            <p className='text-xs font-bold'>{card.title}</p>
                                            <Icon size={18} />
                                        </div>
                                        <p className='text-2xl font-bold mt-3'>{formatNumber(card.value)}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Tables */}
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5'>
                    {/* Recent Sellers */}
                    <div className='bg-white border border-gray-200 shadow-sm overflow-hidden'>
                        <div className='flex justify-between items-center p-5 border-b border-gray-100'>
                            <div>
                                <p className='font-bold text-gray-900'>Recent Sellers</p>
                                <p className='text-xs text-gray-500'>Latest seller registrations</p>
                            </div>

                            <ArrowUpRight size={18} className='text-gray-400' />
                        </div>

                        <div className='overflow-x-auto'>
                            <table className='w-full text-xs text-left text-gray-600'>
                                <thead className='text-[10px] text-[var(--secondary)] bg-[var(--secondary)]/5 uppercase border-b border-gray-200'>
                                    <tr>
                                        <th className='font-bold px-5 py-4'>Seller</th>
                                        <th className='font-bold px-5 py-4'>Brand</th>
                                        <th className='font-bold px-5 py-4'>Status</th>
                                        <th className='font-bold px-5 py-4'>Joined</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {analytics.recentSellers?.length > 0 ? (
                                        analytics.recentSellers.map(seller => (
                                            <tr key={seller._id} className='border-b border-gray-100'>
                                                <td className='px-5 py-4'>
                                                    <p className='font-bold text-gray-900'>{seller.username}</p>
                                                    <p className='text-gray-500'>{seller.email}</p>
                                                </td>

                                                <td className='px-5 py-4'>
                                                    <p className='font-semibold text-gray-800'>{seller.brandName || '-'}</p>
                                                    <p className='text-gray-400'>/{seller.brandSlug || '-'}</p>
                                                </td>

                                                <td className='px-5 py-4'>
                                                    <span className={`px-2 py-1 text-[10px] font-bold capitalize ${getSellerStatusClass(seller.status)}`}>
                                                        {seller.status}
                                                    </span>
                                                </td>

                                                <td className='px-5 py-4 whitespace-nowrap'>
                                                    {seller.createdAt ? dayjs(seller.createdAt).format('DD MMM YYYY') : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className='px-5 py-8 text-center text-red-500'>
                                                No seller found!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Subscriptions */}
                    <div className='bg-white border border-gray-200 shadow-sm overflow-hidden'>
                        <div className='flex justify-between items-center p-5 border-b border-gray-100'>
                            <div>
                                <p className='font-bold text-gray-900'>Recent Subscriptions</p>
                                <p className='text-xs text-gray-500'>Latest subscription activity</p>
                            </div>

                            <ArrowUpRight size={18} className='text-gray-400' />
                        </div>

                        <div className='overflow-x-auto'>
                            <table className='w-full text-xs text-left text-gray-600'>
                                <thead className='text-[10px] text-[var(--secondary)] bg-[var(--secondary)]/5 uppercase border-b border-gray-200'>
                                    <tr>
                                        <th className='font-bold px-5 py-4'>Seller</th>
                                        <th className='font-bold px-5 py-4'>Plan</th>
                                        <th className='font-bold px-5 py-4'>Amount</th>
                                        <th className='font-bold px-5 py-4'>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {analytics.recentSubscriptions?.length > 0 ? (
                                        analytics.recentSubscriptions.map(sub => (
                                            <tr key={sub._id} className='border-b border-gray-100'>
                                                <td className='px-5 py-4'>
                                                    <p className='font-bold text-gray-900'>
                                                        {sub.sellerID?.brandName || sub.sellerID?.username || '-'}
                                                    </p>
                                                    <p className='text-gray-500'>
                                                        {sub.sellerID?.email || '-'}
                                                    </p>
                                                </td>

                                                <td className='px-5 py-4 font-semibold text-gray-900'>
                                                    {sub.plan}
                                                </td>

                                                <td className='px-5 py-4'>
                                                    Rs {formatNumber(sub.amount)}
                                                </td>

                                                <td className='px-5 py-4'>
                                                    <span className={`px-2 py-1 text-[10px] font-bold capitalize ${getSubscriptionStatusClass(sub.status)}`}>
                                                        {sub.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className='px-5 py-8 text-center text-red-500'>
                                                No subscription found!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Revenue Note */}
                <div className='mt-5 bg-[#111827] p-5 text-white'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <CheckCircle size={18} className='text-green-400' />
                                <p className='font-bold'>Revenue Calculation</p>
                            </div>
                            <p className='text-xs text-gray-300 mt-2'>
                                Subscription revenue is calculated from approved subscription requests only.
                                Pending, rejected and expired requests are not counted in revenue.
                            </p>
                        </div>

                        <div className='bg-white/10 px-5 py-3'>
                            <p className='text-xs text-gray-300'>Total Revenue</p>
                            <p className='text-xl font-bold'>Rs {formatNumber(analytics.totalSubscriptionRevenue)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}