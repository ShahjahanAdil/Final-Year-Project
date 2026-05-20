import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Store,
    UserCheck,
    ShieldCheck,
    ShoppingBag,
    CreditCard,
    Globe,
    Palette,
    PackageCheck,
    Tags,
    Truck,
    BarChart3,
    MessageCircle,
    ArrowRight,
    CheckCircle,
    ChevronDown,
    Zap,
    FileCheck,
    Clock,
} from 'lucide-react'

export default function JoinAsSeller() {
    const navigate = useNavigate()
    const [openIndex, setOpenIndex] = useState(0)

    const steps = [
        {
            icon: UserCheck,
            title: 'Create Seller Account',
            desc: 'Register with your personal, contact and login details.',
        },
        {
            icon: FileCheck,
            title: 'Submit Brand Details',
            desc: 'Add your brand name, brand slug, CNIC and verification documents.',
        },
        {
            icon: ShieldCheck,
            title: 'Get Approved',
            desc: 'After review, your seller account becomes active and your free trial starts.',
        },
        {
            icon: Store,
            title: 'Build Your Store',
            desc: 'Add products, customize design, set payment methods and start receiving orders.',
        },
    ]

    const features = [
        {
            icon: Store,
            title: 'Dedicated Brand Store',
            desc: 'Your store gets its own brand page using your brand slug.',
        },
        {
            icon: ShoppingBag,
            title: 'Product Management',
            desc: 'Add products, categories, product images and size charts.',
        },
        {
            icon: Palette,
            title: 'Store Customization',
            desc: 'Customize theme colors, layouts, pages, menus, header and footer.',
        },
        {
            icon: CreditCard,
            title: 'Payment Setup',
            desc: 'Configure COD and online/manual payment methods for your customers.',
        },
        {
            icon: PackageCheck,
            title: 'Order Management',
            desc: 'View orders, update order status and manage payment records.',
        },
        {
            icon: Globe,
            title: 'Domain Support',
            desc: 'Use your brand slug or connect a custom domain where available.',
        },
    ]

    const dashboardItems = [
        'Store theme and layout settings',
        'Menus, pages, sale banners and FAQs',
        'Products, categories, image gallery and size charts',
        'Orders, delivery estimate and payment management',
        'Coupons, payment methods and delivery charges',
        'Subscription history and plan purchase requests',
    ]

    const trialBenefits = [
        '7-day free trial after approval',
        'Basic Plan Rs 2000 / month',
        'Advanced Plan Rs 4000 / month',
        'Manual payment proof submission',
        'Admin approval after transaction review',
        'Store remains live while trial or plan is active',
    ]

    const faqs = [
        {
            question: 'How can I become a seller on Sorty?',
            answer:
                'Click Register Now and create your seller account. You will need to provide your profile details, brand information, CNIC details and required document images for verification.',
        },
        {
            question: 'When will my store become active?',
            answer:
                'Your store becomes active after your seller account is approved. Once approved, your 7-day free trial starts automatically and you can configure your store from the seller dashboard.',
        },
        {
            question: 'Is there a free trial for sellers?',
            answer:
                'Yes. Approved sellers get a 7-day free trial. During the trial, your store can remain live while you set up products, store design, payment options and order settings.',
        },
        {
            question: 'What happens when my trial expires?',
            answer:
                'After the trial expires, your public store will show a maintenance message until you purchase a monthly subscription plan and your payment is approved.',
        },
        {
            question: 'How do I purchase a subscription plan?',
            answer:
                'You can choose Basic or Advanced plan, pay manually through the available bank or wallet account, then submit your transaction ID and payment screenshot. After review, your plan will be activated.',
        },
        {
            question: 'Can I manage my own products and orders?',
            answer:
                'Yes. Sellers can add and manage products, categories, orders, payments, coupons, delivery settings and store customization from their own seller dashboard.',
        },
        {
            question: 'Can I use my own brand name?',
            answer:
                'Yes. Your store is created under your own brand name and brand slug. You can also manage branding elements like logo, theme colors, pages, menus and store content.',
        },
    ]

    return (
        <div className='bg-white'>
            {/* Hero */}
            <section className='relative overflow-hidden bg-[#fff7f9] px-4 py-16 lg:py-20'>
                <div className='absolute -top-24 -right-24 w-80 h-80 bg-[#EE3E5A]/10 rounded-full blur-3xl'></div>
                <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-[#EE3E5A]/10 rounded-full blur-3xl'></div>

                <div className='max-w-7xl mx-auto relative'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                        <div>
                            <div className='inline-flex items-center gap-2 bg-white border border-[#EE3E5A]/20 rounded-full px-4 py-2 text-sm font-bold text-[#EE3E5A]'>
                                <Zap size={16} />
                                Start with 7-Day Free Trial
                            </div>

                            <h1 className='mt-6 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight'>
                                Become a seller on{' '}
                                <span className='text-[#EE3E5A]'>Sorty</span>
                                <br />
                                and launch your store online
                            </h1>

                            <p className='mt-5 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl'>
                                Create your seller account, submit your brand details, get approved,
                                and manage your own ecommerce store with products, orders, payments,
                                coupons and custom store design.
                            </p>

                            <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                                <button
                                    onClick={() => navigate('/auth/seller/signup')}
                                    className='inline-flex items-center justify-center gap-2 bg-[#EE3E5A] text-white px-7 py-3 rounded-md text-sm font-bold hover:bg-[#EE3E5A]/85 transition-all'
                                >
                                    Register Now <ArrowRight size={16} />
                                </button>

                                <button
                                    onClick={() => navigate('/auth/seller/login')}
                                    className='inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-7 py-3 rounded-md text-sm font-bold hover:bg-gray-50 transition-all'
                                >
                                    Seller Login
                                </button>
                            </div>

                            <div className='mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl'>
                                <div className='bg-white border border-gray-200 rounded-xl p-4'>
                                    <Store className='text-[#EE3E5A] mb-2' size={22} />
                                    <p className='text-sm font-bold text-gray-900'>Brand Store</p>
                                </div>

                                <div className='bg-white border border-gray-200 rounded-xl p-4'>
                                    <ShoppingBag className='text-[#EE3E5A] mb-2' size={22} />
                                    <p className='text-sm font-bold text-gray-900'>Products</p>
                                </div>

                                <div className='bg-white border border-gray-200 rounded-xl p-4'>
                                    <PackageCheck className='text-[#EE3E5A] mb-2' size={22} />
                                    <p className='text-sm font-bold text-gray-900'>Orders</p>
                                </div>

                                <div className='bg-white border border-gray-200 rounded-xl p-4'>
                                    <CreditCard className='text-[#EE3E5A] mb-2' size={22} />
                                    <p className='text-sm font-bold text-gray-900'>Payments</p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white border border-gray-200 rounded-3xl p-6 shadow-xl'>
                            <div className='flex items-center justify-between border-b border-gray-100 pb-4'>
                                <div>
                                    <p className='text-sm text-gray-500'>Seller Store Preview</p>
                                    <h3 className='text-xl font-bold text-gray-900'>Your Brand Store</h3>
                                </div>
                                <div className='w-12 h-12 rounded-xl bg-[#EE3E5A]/10 flex items-center justify-center'>
                                    <Store className='text-[#EE3E5A]' />
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-4 mt-6'>
                                <div className='bg-[#fafafa] rounded-xl p-4 border border-gray-100'>
                                    <p className='text-xs text-gray-500'>Trial</p>
                                    <p className='text-2xl font-bold text-gray-900'>7 Days</p>
                                </div>

                                <div className='bg-[#fafafa] rounded-xl p-4 border border-gray-100'>
                                    <p className='text-xs text-gray-500'>Basic Plan</p>
                                    <p className='text-2xl font-bold text-gray-900'>Rs 2000</p>
                                </div>

                                <div className='bg-[#fafafa] rounded-xl p-4 border border-gray-100'>
                                    <p className='text-xs text-gray-500'>Advanced Plan</p>
                                    <p className='text-2xl font-bold text-gray-900'>Rs 4000</p>
                                </div>

                                <div className='bg-[#fafafa] rounded-xl p-4 border border-gray-100'>
                                    <p className='text-xs text-gray-500'>Duration</p>
                                    <p className='text-2xl font-bold text-gray-900'>1 Month</p>
                                </div>
                            </div>

                            <div className='mt-6 space-y-3'>
                                {[
                                    'Customize store theme and layout',
                                    'Add products and categories',
                                    'Manage orders and payments',
                                    'Purchase monthly subscription manually',
                                ].map((item, index) => (
                                    <div key={index} className='flex items-center gap-2 text-sm text-gray-700'>
                                        <CheckCircle size={16} className='text-green-500 shrink-0' />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className='bg-white py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center max-w-3xl mx-auto mb-10'>
                        <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                            Seller Onboarding
                        </p>
                        <h2 className='mt-3 text-3xl md:text-4xl font-bold text-gray-900'>
                            Start selling in four simple steps
                        </h2>
                        <p className='mt-4 text-gray-600'>
                            Sorty keeps onboarding simple: register, submit brand details,
                            get approved and start managing your online store.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {steps.map((step, index) => {
                            const Icon = step.icon

                            return (
                                <div
                                    key={index}
                                    className='bg-[#fafafa] border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-all'
                                >
                                    <div className='w-16 h-16 mx-auto rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4'>
                                        <Icon className='text-[#EE3E5A]' size={28} />
                                    </div>

                                    <h3 className='text-lg font-bold text-gray-900'>
                                        {step.title}
                                    </h3>

                                    <p className='mt-2 text-sm text-gray-600 leading-relaxed'>
                                        {step.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className='bg-[#fafafa] py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center max-w-3xl mx-auto mb-10'>
                        <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                            What You Get
                        </p>
                        <h2 className='mt-3 text-3xl md:text-4xl font-bold text-gray-900'>
                            A complete seller dashboard for your online store
                        </h2>
                        <p className='mt-4 text-gray-600'>
                            Manage your brand store, products, orders, payment methods and subscription from one place.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {features.map((item, index) => {
                            const Icon = item.icon

                            return (
                                <div
                                    key={index}
                                    className='bg-white border border-gray-200 p-6 rounded-xl hover:shadow-md transition-all duration-200'
                                >
                                    <div className='w-11 h-11 rounded-lg bg-[#EE3E5A]/10 flex items-center justify-center mb-4'>
                                        <Icon size={22} className='text-[#EE3E5A]' />
                                    </div>

                                    <h3 className='text-lg font-bold text-gray-900'>
                                        {item.title}
                                    </h3>

                                    <p className='mt-2 text-sm text-gray-600 leading-relaxed'>
                                        {item.desc}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Dashboard + Trial */}
            <section className='bg-white py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                        <div className='bg-[#111827] rounded-3xl p-6 md:p-8'>
                            <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                                Seller Dashboard
                            </p>

                            <h2 className='mt-3 text-3xl font-bold text-white'>
                                Control your store without technical complexity.
                            </h2>

                            <p className='mt-4 text-gray-300 leading-relaxed'>
                                Your seller dashboard gives you the tools to manage your store operations
                                without needing to build a separate ecommerce website.
                            </p>

                            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                {dashboardItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3'
                                    >
                                        <CheckCircle size={16} className='text-green-400 shrink-0' />
                                        <span className='text-sm text-gray-200'>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='bg-[#fff7f9] border border-[#EE3E5A]/15 rounded-3xl p-6 md:p-8'>
                            <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                                Trial & Subscription
                            </p>

                            <h2 className='mt-3 text-3xl font-bold text-gray-900'>
                                Start free, continue with a monthly plan.
                            </h2>

                            <p className='mt-4 text-gray-600 leading-relaxed'>
                                After approval, your store gets a 7-day free trial. Once the trial expires,
                                you can purchase a monthly plan manually and submit payment proof for approval.
                            </p>

                            <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                {trialBenefits.map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3'
                                    >
                                        <CheckCircle size={16} className='text-green-500 shrink-0' />
                                        <span className='text-sm text-gray-700'>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Store Tools */}
            <section className='bg-[#fafafa] py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                        <div>
                            <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                                Store Growth Tools
                            </p>

                            <h2 className='mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight'>
                                Everything a seller needs to prepare, promote and manage a store.
                            </h2>

                            <p className='mt-4 text-gray-600 leading-relaxed'>
                                Sorty helps you manage core ecommerce tasks from setup to selling:
                                store design, catalog management, coupons, delivery settings and customer orders.
                            </p>

                            <button
                                onClick={() => navigate('/auth/seller/signup')}
                                className='mt-7 inline-flex items-center gap-2 bg-[#EE3E5A] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-[#EE3E5A]/85 transition-all'
                            >
                                Create Seller Account <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='bg-white border border-gray-200 rounded-xl p-5'>
                                <Tags className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='font-bold text-gray-900'>Coupons & Sale</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Create coupons and promotional offers for your customers.
                                </p>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-xl p-5'>
                                <Truck className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='font-bold text-gray-900'>Delivery Settings</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Manage delivery charges and delivery date estimates.
                                </p>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-xl p-5'>
                                <BarChart3 className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='font-bold text-gray-900'>Store Views</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Track basic store activity and prepare for growth.
                                </p>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-xl p-5'>
                                <Clock className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='font-bold text-gray-900'>Monthly Access</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Keep your store live with an active monthly plan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className='bg-white py-16 px-4'>
                <div className='max-w-5xl mx-auto text-center rounded-3xl bg-[#111827] px-6 py-12'>
                    <MessageCircle className='mx-auto text-[#EE3E5A]' size={40} />

                    <h2 className='mt-4 text-3xl md:text-4xl font-bold text-white'>
                        Ready to open your Sorty store?
                    </h2>

                    <p className='mt-4 text-gray-300 max-w-2xl mx-auto'>
                        Register as a seller, complete verification and start your 7-day trial after approval.
                    </p>

                    <div className='mt-8 flex flex-col sm:flex-row justify-center gap-3'>
                        <button
                            onClick={() => navigate('/auth/seller/signup')}
                            className='inline-flex items-center justify-center gap-2 bg-[#EE3E5A] text-white px-7 py-3 rounded-md text-sm font-bold hover:bg-[#EE3E5A]/85 transition-all'
                        >
                            Register Now <ArrowRight size={16} />
                        </button>

                        <button
                            onClick={() => navigate('/subscription/buy/Basic')}
                            className='inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-7 py-3 rounded-md text-sm font-bold hover:bg-gray-100 transition-all'
                        >
                            View Plans
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className='bg-[#fafafa] py-16 px-4'>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-10'>
                        <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                            Seller FAQs
                        </p>

                        <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2'>
                            Frequently asked questions
                        </h2>

                        <p className='text-gray-600 text-sm mt-3'>
                            Clear answers about seller registration, trial access, subscriptions and store management.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className='rounded-xl border border-gray-200 bg-white overflow-hidden'
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                    className='w-full flex justify-between items-center gap-4 px-5 py-4 text-left font-bold text-gray-900 hover:bg-[#fafafa] focus:outline-none'
                                >
                                    <span>{faq.question}</span>

                                    <ChevronDown
                                        className={`w-5 h-5 text-[#EE3E5A] shrink-0 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-60 pb-5' : 'max-h-0 pb-0'
                                        }`}
                                >
                                    <p className='text-sm text-gray-600 leading-relaxed'>
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

// import React from 'react'
// import JoinAsSellerHero from '../../../components/JoinAsSellerHero'
// import JoinAsSellerServices from '../../../components/JoinAsSellerServices'
// import JoinAsSellerFAQs from '../../../components/JoinAsSellerFAQs'

// export default function JoinAsSeller() {
//     return (
//         <>
//             <JoinAsSellerHero />
//             <JoinAsSellerServices />
//             <JoinAsSellerFAQs />
//         </>
//     )
// }