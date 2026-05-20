import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function SubscriptionPlans() {
    const navigate = useNavigate()

    const plans = [
        {
            name: "Basic",
            price: 2000,
            description: "Best for small sellers starting their online store.",
            features: [
                "1 Month Store Access",
                "Basic Store Management",
                "Product Listing Access",
                "Order Management",
                "Manual Payment Verification",
                "Coupons & Discounts",
                "3 Layout Templates",
            ],
        },
        {
            name: "Advanced",
            price: 4000,
            description: "Best for sellers who want more control and growth features.",
            features: [
                "1 Month Store Access",
                "Advanced Store Management",
                "Product Listing Access",
                "Order Management",
                "Coupons & Discounts",
                "5 Layout Templates",
                "Custom Domain Support",
                "SEO Tags Management",
                "Advanced Store Customization",
            ],
        },
    ]

    return (
        <section className='bg-[#fafafa] py-6 sm:py-10 px-4'>
            <div className='max-w-6xl mx-auto'>
                <div className='text-center mb-10'>
                    <p className='text-sm font-bold text-[var(--primary)] uppercase'>Subscription Plans</p>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2'>
                        Choose the Right Plan for Your Store
                    </h2>
                    <p className='text-gray-600 text-sm mt-3 max-w-2xl mx-auto'>
                        Start with a 7-day free trial after admin approval. After trial expiry, purchase a monthly plan to keep your store live.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {plans.map(plan => (
                        <div
                            key={plan.name}
                            className='flex flex-col justify-between bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200'
                        >
                            <div>
                                <div className='flex justify-between items-start gap-4'>
                                    <div>
                                        <h3 className='text-2xl font-bold text-gray-900'>{plan.name}</h3>
                                        <p className='max-w-75 text-sm text-gray-500 mt-1'>{plan.description}</p>
                                    </div>

                                    <div className='text-right'>
                                        <p className='text-2xl font-bold text-gray-900'>Rs {plan.price}</p>
                                        <p className='text-xs text-gray-500'>/ month</p>
                                    </div>
                                </div>

                                <div className='mt-6 flex flex-col gap-3'>
                                    {plan.features.map((feature, index) => (
                                        <div key={index} className='flex items-center gap-2 text-sm text-gray-700'>
                                            <CheckCircle size={16} className='text-green-500' />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => navigate(`/subscription/buy/${plan.name}`)}
                                className='mt-7 w-full bg-[var(--secondary)] text-white px-6 py-2.5 text-sm font-bold hover:bg-[var(--secondary)]/80 transition-all duration-150'
                            >
                                Buy {plan.name} Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}