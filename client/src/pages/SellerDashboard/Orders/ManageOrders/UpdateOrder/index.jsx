import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSellerAuthContext } from '../../../../../contexts/SellerAuthContext'
import Loader from '../../../../../components/Loader'
import ButtonLoader from '../../../../../components/ButtonLoader'
import dayjs from 'dayjs'
import axios from 'axios'

function OrderTrackingVisual({ order }) {
    const steps = ['pending', 'processing', 'shipped', 'delivered']
    const isNegative = order.status === 'cancelled' || order.status === 'returned'

    const activeSteps = isNegative ? ['pending', order.status] : steps

    const getTimestamp = (status) => {
        const entry = order.statusHistory?.find(h => h.status === status)
        return entry ? dayjs(entry.timestamp).format('DD MMM YYYY, hh:mm A') : null
    }

    const currentIndex = activeSteps.indexOf(order.status)

    return (
        <div className='bg-white p-4 light-shad text-gray-900'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-2 border-b border-gray-200'>
                <div>
                    <p className='text-sm font-bold'>Order Tracking</p>
                    <p className='text-xs text-gray-500'>
                        Visual progress of order #{order?.orderID}
                    </p>
                </div>

                <span className={`w-fit text-[10px] px-2.5 py-1 rounded-md font-bold capitalize ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    order.status === 'processing' ? 'bg-amber-100 text-amber-600' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-600' :
                            order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                                order.status === 'returned' ? 'bg-red-100 text-red-600' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                        'bg-gray-100 text-gray-600'
                    }`}>
                    {order.status || '-'}
                </span>
            </div>

            <div className='flex flex-col gap-0'>
                {activeSteps.map((step, index) => {
                    const isDone = index <= currentIndex
                    const isLast = index === activeSteps.length - 1
                    const timestamp = getTimestamp(step)

                    const isCancel = step === 'cancelled'
                    const isReturn = step === 'returned'
                    const isBadStep = isCancel || isReturn

                    const dotColor = isDone
                        ? isBadStep ? 'bg-red-500' : 'bg-green-500'
                        : 'bg-gray-200'

                    const lineColor = index < currentIndex
                        ? isBadStep ? 'bg-red-300' : 'bg-green-400'
                        : 'bg-gray-200'

                    const labelColor = isDone
                        ? isBadStep ? 'text-red-600' : 'text-green-600'
                        : 'text-gray-400'

                    return (
                        <div key={step} className='flex gap-4'>
                            <div className='flex flex-col items-center'>
                                <div className={`w-4 h-4 rounded-full mt-0.5 shrink-0 border-2 ${isDone ? 'border-transparent' : 'border-gray-300'} ${dotColor}`} />

                                {!isLast && (
                                    <div className={`w-0.5 flex-1 min-h-[34px] my-1 ${lineColor}`} />
                                )}
                            </div>

                            <div className='pb-5'>
                                <p className={`text-sm font-semibold capitalize ${labelColor}`}>
                                    {step}
                                </p>

                                {timestamp ? (
                                    <p className='text-xs text-gray-400 mt-0.5'>
                                        {timestamp}
                                    </p>
                                ) : (
                                    <p className='text-xs text-gray-300 mt-0.5'>
                                        Awaiting update
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function UpdateOrder() {
    const { orderID } = useParams()
    const { user } = useSellerAuthContext()
    const [order, setOrder] = useState({})
    const [currency, setCurrency] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (orderID) {
            fetchOrder()
        }
    }, [orderID])

    const fetchOrder = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/seller/update-order/fetch-order?sellerID=${user._id}&orderID=${orderID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setOrder(data.order || {});
                    setCurrency(data.currency)
                }
            })
            .catch(err => console.error('Frontend GET error', err.message))
            .finally(() => setLoading(false))
    }

    const handleUpdateOrderStatus = () => {
        setSaving(true)
        axios.put(`${import.meta.env.VITE_HOST}/seller/update-order/update-status`, {
            sellerID: user._id, orderID, status: order.status
        })
            .then(res => {
                const { status, data } = res
                if (status === 202) {
                    window.toastify(data.message, "success")
                    setOrder(prev => ({
                        ...prev,
                        ...(data.order || {})
                    }));
                }
            })
            .catch(err => window.toastify(err.response.data.message || "Something went wrong! Please try again.", "error"))
            .finally(() => setSaving(false))
    }

    if (loading) return <Loader />

    return (
        <>
            <div className='bg-[#fafafa] px-3 sm:px-5 md:px-8 py-2.5 sm:py-4'>
                <p className='font-bold text-gray-900'>Update Order</p>
                <p className='text-[12px] sm:text-[13px] text-gray-900'>Monitor, manage and control the order status here.</p>
            </div>

            <div className='seller-container'>
                <p className='w-fit text-[12px] font-bold'><span className='text-gray-400'>Seller</span> / Orders / Update Order</p>

                <div className='flex flex-col gap-4 mt-6'>
                    <OrderTrackingVisual order={order} />

                    <div className='bg-white p-4 light-shad text-gray-900'>
                        <p className='text-sm font-bold mb-3 pb-2 border-b border-gray-200'>Order Status <span className='inline-block px-1.5 py-0.5 ml-1 text-[11px] text-amber-600 bg-amber-50 font-normal'>Update the order delivery status here</span></p>
                        <div className='flex gap-4'>
                            <select name="status" id="status" value={order.status} className='text-sm w-full border border-gray-300 p-2.5'
                                onChange={(e) => setOrder(prev => ({
                                    ...prev, status: e.target.value
                                }))}>
                                <option value="" disabled>Select order status</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="returned">Returned</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                            <button className='text-xs font-bold bg-[var(--primary)] text-white px-4 hover:bg-[var(--primary)]/70 disabled:opacity-50'
                                onClick={handleUpdateOrderStatus}
                            >
                                {!saving ? "Save" : <ButtonLoader />}
                            </button>
                        </div>
                    </div>

                    <div className='bg-white p-4 light-shad text-gray-900'>
                        <p className='text-sm font-bold mb-3 pb-2 border-b border-gray-200'>User Information</p>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm'>
                            <p><span className='font-bold'>Username:</span> {order?.userID?.username}</p>
                            <p><span className='font-bold'>Email:</span> {order?.userID?.email}</p>
                            <p><span className='font-bold'>Phone Number:</span> {order?.shippingDetails?.phoneNumber}</p>
                        </div>
                    </div>

                    <div className='bg-white p-4 light-shad text-gray-900'>
                        <p className='text-sm font-bold mb-3 pb-2 border-b border-gray-200'>Shipping Details</p>
                        <p className='text-xs inline-block px-1.5 py-0.5 bg-green-100 text-green-700 rounded-sm capitalize'>{order?.shippingDetails?.place}</p>
                        <p className='text-sm mt-2'><span className='font-bold'>Address:</span> {order?.shippingDetails?.address + ", " + order?.shippingDetails?.province + ", " + order?.shippingDetails?.city + "."}</p>
                    </div>

                    <div className='bg-white p-4 light-shad text-gray-900'>
                        <p className='text-sm font-bold mb-3 pb-2 border-b border-gray-200'>Ordered Products</p>

                        <div className="relative overflow-x-auto mt-5">
                            <table className="w-full text-xs text-left rtl:text-right text-gray-600">
                                <thead className="text-[10px] text-[var(--secondary)] bg-[var(--secondary)]/5 uppercase border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="font-bold px-6 py-4">#</th>
                                        <th scope="col" className="font-bold px-6 py-4">Product ID</th>
                                        <th scope="col" className="font-bold px-6 py-4">Product</th>
                                        <th scope="col" className="font-bold px-6 py-4 whitespace-nowrap">Quantity</th>
                                        <th scope="col" className="font-bold px-6 py-4 whitespace-nowrap">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ?
                                            <tr className='bg-white'>
                                                <td colSpan={5} className='py-20'>
                                                    <div className='flex justify-center'>
                                                        <div className='flex flex-col items-center gap-5'>
                                                            <span className='w-8 h-8 rounded-full border-t-2 border-[var(--secondary)] animate-spin'></span>
                                                            <p>Loading...</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            :
                                            order?.products?.length > 0 ?
                                                order?.products?.map((product, i) => (
                                                    <tr key={product._id} className="bg-white border-b border-gray-200">
                                                        <td className="px-6 py-4">{i + 1}</td>
                                                        <td className="px-6 py-4">{product.productID}</td>
                                                        <td className="px-6 py-4">
                                                            <div className='flex items-center gap-3'>
                                                                <img src={`${import.meta.env.VITE_HOST}${product.variantImageURL || product.mainImageURL}`} alt={product.title} className='w-14 h-14 p-1 object-contain bg-gray-100 rounded-full' />
                                                                <div>
                                                                    <a href={`/brand/${product?.brandSlug}/product/${product.slug}`} target='_blank' className="w-fit text-xs font-bold transition-all duration-200 ease-linear cursor-pointer hover:text-[var(--pr)]">{product.title}</a>
                                                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                                                        {Array.isArray(product?.selectedOptions) &&
                                                                            product.selectedOptions.map((opt, idx) => (
                                                                                <p
                                                                                    key={idx}
                                                                                    className="w-fit text-[10px] bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded-sm"
                                                                                >
                                                                                    {opt.optionName}: {opt.optionValue}
                                                                                </p>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 capitalize">
                                                            {product.quantity}
                                                        </td>
                                                        <td className="px-6 py-4 capitalize">
                                                            {currency} {product.price.toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))
                                                :
                                                <tr className='bg-white'>
                                                    <td colSpan={5} className='px-6 py-4 text-center text-red-500'>No product found!</td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='bg-white p-4 light-shad text-gray-900'>
                        <p className='text-sm font-bold mb-3 pb-2 border-b border-gray-200'>Billing</p>

                        <div className="relative overflow-x-auto mt-5">
                            <table className="w-full text-xs text-left rtl:text-right text-gray-600">
                                <thead className="text-[10px] text-[var(--secondary)] bg-[var(--secondary)]/5 uppercase border-b border-gray-200">
                                    <tr>
                                        <th scope="col" className="font-bold px-6 py-4">Total Amount</th>
                                        <th scope="col" className="font-bold px-6 py-4">Coupon Applied</th>
                                        <th scope="col" className="font-bold px-6 py-4 whitespace-nowrap">Discount</th>
                                        <th scope="col" className="font-bold px-6 py-4">Delivery Charges</th>
                                        <th scope="col" className="font-bold px-6 py-4 whitespace-nowrap">Net Payable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ?
                                            <tr className='bg-white'>
                                                <td colSpan={4} className='py-20'>
                                                    <div className='flex justify-center'>
                                                        <div className='flex flex-col items-center gap-5'>
                                                            <span className='w-8 h-8 rounded-full border-t-2 border-[var(--secondary)] animate-spin'></span>
                                                            <p>Loading...</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            :
                                            order?.orderID > 0 ?
                                                <tr className="bg-white border-b border-gray-200">
                                                    <td className="px-6 py-4">{currency} {order.totalAmount.toLocaleString()}</td>
                                                    <td className="px-6 py-4">{order.coupon || "_"}</td>
                                                    <td className="px-6 py-4">{currency} {order.discountAmount.toLocaleString()}</td>
                                                    <td className="px-6 py-4">{currency} {order.deliveryCharges.toLocaleString()}</td>
                                                    <td className="px-6 py-4">{currency} {order.finalAmount.toLocaleString()}</td>
                                                </tr>
                                                :
                                                <tr className='bg-white'>
                                                    <td colSpan={4} className='px-6 py-4 text-center text-red-500'>No product found!</td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}