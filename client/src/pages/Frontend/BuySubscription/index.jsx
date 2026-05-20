import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useSellerAuthContext } from '../../../contexts/SellerAuthContext'

export default function BuySubscription() {
    const { user } = useSellerAuthContext()
    const { plan } = useParams()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const [plans, setPlans] = useState([])
    const [bankAccounts, setBankAccounts] = useState([])
    const [selectedPlan, setSelectedPlan] = useState(plan || "Basic")
    const [selectedBankIndex, setSelectedBankIndex] = useState(0)
    const [transactionID, setTransactionID] = useState("")
    const [transactionScreenshot, setTransactionScreenshot] = useState(null)
    const [loading, setLoading] = useState(false)

    const sellerID = searchParams.get("sellerID") || user?._id || ""

    const activePlan = useMemo(() => {
        return plans.find(item => item.plan === selectedPlan)
    }, [plans, selectedPlan])

    const selectedBank = bankAccounts[selectedBankIndex]

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [plansRes, banksRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_HOST}/subscriptions/plans`),
                axios.get(`${import.meta.env.VITE_HOST}/subscriptions/bank-accounts`)
            ])

            setPlans(plansRes.data.plans || [])
            setBankAccounts(banksRes.data.bankAccounts || [])
        } catch (error) {
            console.error(error)
            window.toastify?.("Failed to load subscription details", "error")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!sellerID) {
            window.toastify?.("Please login as seller first to purchase a plan", "error")
            navigate(`/auth/seller/login?redirect=/subscription/buy/${selectedPlan}`)
            return
        }

        if (!activePlan) {
            window.toastify?.("Please select a valid plan", "error")
            return
        }

        if (!selectedBank) {
            window.toastify?.("Please select payment account", "error")
            return
        }

        if (!transactionID.trim()) {
            window.toastify?.("Please enter transaction ID", "error")
            return
        }

        if (!transactionScreenshot) {
            window.toastify?.("Please upload transaction screenshot", "error")
            return
        }

        const formData = new FormData()
        formData.append("sellerID", sellerID)
        formData.append("plan", activePlan.plan)
        formData.append("bankName", selectedBank.bankName)
        formData.append("accountTitle", selectedBank.accountTitle)
        formData.append("accountName", selectedBank.accountName)
        formData.append("accountNumber", selectedBank.accountNumber)
        formData.append("iban", selectedBank.iban || "")
        formData.append("transactionID", transactionID)
        formData.append("transactionScreenshot", transactionScreenshot)

        setLoading(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST}/subscriptions/purchase`, formData)

            if (res.status === 201) {
                window.toastify?.(res.data.message, "success")
                navigate("/seller/subscriptions")
            }
        } catch (error) {
            console.error(error)
            window.toastify?.(error.response?.data?.message || "Failed to submit subscription", "error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='bg-[#fafafa] min-h-screen py-10 px-4'>
            <div className='max-w-6xl mx-auto'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900'>Purchase Subscription</h1>
                    <p className='text-sm text-gray-600 mt-2'>Select your plan, pay manually, and submit proof for admin approval.</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                    <div className='bg-white p-5 shadow-sm border border-gray-200'>
                        <p className='font-bold text-gray-900 mb-4'>Select Plan</p>

                        <div className='flex flex-col gap-3'>
                            {plans.map(item => (
                                <button
                                    key={item.plan}
                                    type='button'
                                    onClick={() => setSelectedPlan(item.plan)}
                                    className={`text-left border px-4 py-4 transition-all ${selectedPlan === item.plan
                                        ? 'bg-[var(--secondary)] text-white border-[var(--secondary)]'
                                        : 'bg-white text-gray-900 border-gray-200 hover:border-[var(--secondary)]'
                                        }`}
                                >
                                    <div className='flex justify-between items-center gap-3'>
                                        <p className='font-bold'>{item.plan} Plan</p>
                                        <p className='text-sm font-bold'>Rs {item.amount}</p>
                                    </div>
                                    <p className='text-xs mt-1 opacity-80'>{item.durationDays} days subscription</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='lg:col-span-2 bg-white p-5 shadow-sm border border-gray-200'>
                        <form onSubmit={handleSubmit}>
                            <p className='font-bold text-gray-900 mb-4'>Payment Breakdown</p>

                            {activePlan && (
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#fafafa] border border-gray-200 p-4 mb-5'>
                                    <div>
                                        <p className='text-xs text-gray-500'>Plan</p>
                                        <p className='font-bold text-gray-900'>{activePlan.plan}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-500'>Amount</p>
                                        <p className='font-bold text-gray-900'>Rs {activePlan.amount}</p>
                                    </div>
                                    <div>
                                        <p className='text-xs text-gray-500'>Duration</p>
                                        <p className='font-bold text-gray-900'>{activePlan.durationDays} Days</p>
                                    </div>
                                </div>
                            )}

                            <div className='mb-5'>
                                <label className='text-sm font-bold text-gray-800'>Select Payment Account</label>
                                <select
                                    value={selectedBankIndex}
                                    onChange={e => setSelectedBankIndex(Number(e.target.value))}
                                    className='w-full mt-2 bg-white border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[var(--secondary)]'
                                >
                                    {bankAccounts.map((bank, index) => (
                                        <option key={index} value={index}>{bank.bankName}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedBank && (
                                <div className='bg-[#f8fafc] border border-dashed border-gray-300 p-4 mb-5'>
                                    <p className='font-bold text-gray-900 mb-3'>{selectedBank.bankName}</p>

                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm'>
                                        <p><span className='font-bold'>Account Title:</span> {selectedBank.accountTitle}</p>
                                        <p><span className='font-bold'>Account Name:</span> {selectedBank.accountName}</p>
                                        <p><span className='font-bold'>Account Number:</span> {selectedBank.accountNumber}</p>
                                        {selectedBank.iban && <p><span className='font-bold'>IBAN:</span> {selectedBank.iban}</p>}
                                    </div>
                                </div>
                            )}

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                <div>
                                    <label className='text-sm font-bold text-gray-800'>Transaction ID</label>
                                    <input
                                        type='text'
                                        value={transactionID}
                                        onChange={e => setTransactionID(e.target.value)}
                                        className='w-full mt-2 bg-white border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[var(--secondary)]'
                                        placeholder='Enter Transaction ID'
                                    />
                                </div>

                                <div>
                                    <label className='text-sm font-bold text-gray-800'>Transaction Screenshot</label>
                                    <input
                                        type='file'
                                        accept='image/*'
                                        onChange={e => setTransactionScreenshot(e.target.files[0])}
                                        className='w-full mt-2 bg-white border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[var(--secondary)]'
                                    />
                                </div>
                            </div>

                            <button
                                type='submit'
                                disabled={loading}
                                className='mt-6 bg-[var(--secondary)] text-white px-6 py-2 text-sm font-bold hover:bg-[var(--secondary)]/80 disabled:opacity-60'
                            >
                                {loading ? "Submitting..." : "Submit Subscription Request"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}