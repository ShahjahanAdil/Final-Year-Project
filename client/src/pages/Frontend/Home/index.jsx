import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Store,
    ShoppingBag,
    Palette,
    Globe,
    CreditCard,
    PackageCheck,
    Tags,
    BarChart3,
    Truck,
    MessageCircle,
    ArrowRight,
    CheckCircle,
    ShieldCheck,
    Zap,
    LayoutTemplate,
} from 'lucide-react'

import HeroSection from '../../../components/HeroSection'
import SubscriptionPlans from '../../../components/SubscriptionPlans'
import FaqSection from '../../../components/FaqSection'

export default function Home() {
    const navigate = useNavigate()

    const sellerFeatures = [
        {
            icon: Store,
            title: 'Your Own Brand Store',
            desc: 'Create a professional online store with your own brand name, logo, pages, menus and store identity.',
        },
        {
            icon: ShoppingBag,
            title: 'Product Management',
            desc: 'Add products, categories, images, size charts and manage your product listings from seller dashboard.',
        },
        {
            icon: Palette,
            title: 'Store Customization',
            desc: 'Customize theme colors, homepage layout, product page layout, header, footer and store content.',
        },
        {
            icon: CreditCard,
            title: 'Payment Methods',
            desc: 'Set up COD and online payment account details so customers can place orders easily.',
        },
        {
            icon: PackageCheck,
            title: 'Order Management',
            desc: 'View customer orders, update order status, manage payments and handle order processing.',
        },
        {
            icon: Globe,
            title: 'Brand URL & Domain',
            desc: 'Run your store on your brand slug URL and connect your own custom domain on supported plans.',
        },
    ]

    const steps = [
        {
            number: '01',
            title: 'Apply as Seller',
            desc: 'Submit your profile, brand details and verification documents.',
        },
        {
            number: '02',
            title: 'Get Approved',
            desc: 'Once your seller account is approved, your 7-day free trial starts automatically.',
        },
        {
            number: '03',
            title: 'Build Your Store',
            desc: 'Add products, customize your store, set payment methods and prepare for orders.',
        },
        {
            number: '04',
            title: 'Choose Monthly Plan',
            desc: 'After trial, buy Basic or Advanced plan manually to keep your store live.',
        },
    ]

    const benefits = [
        'No separate website development required',
        'Dedicated seller dashboard',
        'Professional brand store URL',
        'Product, order and payment management',
        'Custom store design settings',
        'Monthly subscription plans',
    ]

    return (
        <div className='bg-white'>
            <HeroSection />

            {/* Seller Intro */}
            <section className='bg-white py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                        <div>
                            <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                                Sell Online with Sorty
                            </p>

                            <h2 className='mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight'>
                                Start your online store without building a website from scratch.
                            </h2>

                            <p className='mt-5 text-gray-600 text-base leading-relaxed'>
                                Sorty gives sellers a ready-to-use ecommerce store where they can add products,
                                manage orders, customize their brand, set payment methods and grow their online business.
                            </p>

                            <div className='mt-7 flex flex-col sm:flex-row gap-3'>
                                <button
                                    onClick={() => navigate('/join-as-seller')}
                                    className='inline-flex items-center justify-center gap-2 bg-[#EE3E5A] text-white px-6 py-3 text-sm font-bold rounded-md hover:bg-[#EE3E5A]/85 transition-all'
                                >
                                    Join as Seller <ArrowRight size={16} />
                                </button>

                                <button
                                    onClick={() => navigate('/brands')}
                                    className='inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-3 text-sm font-bold rounded-md hover:bg-gray-200 transition-all'
                                >
                                    View Stores
                                </button>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className='bg-[#fafafa] border border-gray-200 p-5 rounded-xl'>
                                <Store className='text-[#EE3E5A] mb-4' size={30} />
                                <h3 className='text-xl font-bold text-gray-900'>Brand Store</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Launch your own store under your brand name.
                                </p>
                            </div>

                            <div className='bg-[#fafafa] border border-gray-200 p-5 rounded-xl'>
                                <Zap className='text-[#EE3E5A] mb-4' size={30} />
                                <h3 className='text-xl font-bold text-gray-900'>7-Day Trial</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Free trial starts after seller approval.
                                </p>
                            </div>

                            <div className='bg-[#fafafa] border border-gray-200 p-5 rounded-xl'>
                                <ShoppingBag className='text-[#EE3E5A] mb-4' size={30} />
                                <h3 className='text-xl font-bold text-gray-900'>Products</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Add and manage products from dashboard.
                                </p>
                            </div>

                            <div className='bg-[#fafafa] border border-gray-200 p-5 rounded-xl'>
                                <CreditCard className='text-[#EE3E5A] mb-4' size={30} />
                                <h3 className='text-xl font-bold text-gray-900'>Payments</h3>
                                <p className='text-sm text-gray-500 mt-2'>
                                    Manage COD and online payment options.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seller Features */}
            <section className='bg-[#fafafa] py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center max-w-3xl mx-auto mb-10'>
                        <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                            Seller Features
                        </p>
                        <h2 className='mt-3 text-3xl md:text-4xl font-bold text-gray-900'>
                            Everything you need to run your online store
                        </h2>
                        <p className='mt-4 text-gray-600'>
                            Sorty gives sellers the tools to manage products, orders, payments,
                            store design and customer-facing brand pages from one dashboard.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {sellerFeatures.map((item, index) => {
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

            {/* How It Works */}
            <section className='bg-white py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center max-w-3xl mx-auto mb-10'>
                        <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                            How It Works
                        </p>
                        <h2 className='mt-3 text-3xl md:text-4xl font-bold text-gray-900'>
                            From seller registration to live store
                        </h2>
                        <p className='mt-4 text-gray-600'>
                            Start with a simple application, get approved, use your free trial and continue with a monthly plan.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className='bg-[#fafafa] border border-gray-200 rounded-xl p-6'
                            >
                                <p className='text-3xl font-bold text-[#EE3E5A]'>
                                    {step.number}
                                </p>

                                <h3 className='mt-4 text-lg font-bold text-gray-900'>
                                    {step.title}
                                </h3>

                                <p className='mt-2 text-sm text-gray-600 leading-relaxed'>
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Store Management */}
            <section className='bg-[#111827] py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                        <div>
                            <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
                                Seller Dashboard
                            </p>

                            <h2 className='mt-3 text-3xl md:text-4xl font-bold text-white leading-tight'>
                                Manage your complete ecommerce store from one place.
                            </h2>

                            <p className='mt-5 text-gray-300 leading-relaxed'>
                                Your seller dashboard helps you control your store setup, product catalog,
                                order processing, coupons, payments, pages, menus, domain and subscription history.
                            </p>

                            <button
                                onClick={() => navigate('/join-as-seller')}
                                className='mt-7 inline-flex items-center gap-2 bg-[#EE3E5A] text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-[#EE3E5A]/85 transition-all'
                            >
                                Create Seller Account <ArrowRight size={16} />
                            </button>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='bg-white/5 border border-white/10 rounded-xl p-5'>
                                <LayoutTemplate className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='text-white font-bold'>Store Layout</h3>
                                <p className='text-sm text-gray-300 mt-2'>
                                    Choose and customize your store layout.
                                </p>
                            </div>

                            <div className='bg-white/5 border border-white/10 rounded-xl p-5'>
                                <Tags className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='text-white font-bold'>Coupons & Sale</h3>
                                <p className='text-sm text-gray-300 mt-2'>
                                    Create offers, coupons and promotional sales.
                                </p>
                            </div>

                            <div className='bg-white/5 border border-white/10 rounded-xl p-5'>
                                <Truck className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='text-white font-bold'>Delivery Settings</h3>
                                <p className='text-sm text-gray-300 mt-2'>
                                    Set delivery charges and estimated delivery days.
                                </p>
                            </div>

                            <div className='bg-white/5 border border-white/10 rounded-xl p-5'>
                                <BarChart3 className='text-[#EE3E5A] mb-3' size={28} />
                                <h3 className='text-white font-bold'>Store Insights</h3>
                                <p className='text-sm text-gray-300 mt-2'>
                                    Track your basic store activity and views.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className='bg-white py-16 px-4'>
                <div className='max-w-7xl mx-auto'>
                    <div className='rounded-3xl bg-[#fafafa] border border-gray-200 p-6 md:p-10'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
                            <div>
                                <div className='inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-bold text-gray-700'>
                                    <ShieldCheck size={16} className='text-[#EE3E5A]' />
                                    Built for serious sellers
                                </div>

                                <h2 className='mt-5 text-3xl md:text-4xl font-bold text-gray-900 leading-tight'>
                                    Focus on selling. Sorty handles your store setup.
                                </h2>

                                <p className='mt-4 text-gray-600 leading-relaxed'>
                                    Instead of spending time and money on separate website development,
                                    you can quickly start selling through a ready marketplace system.
                                </p>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                                {benefits.map((item, index) => (
                                    <div
                                        key={index}
                                        className='flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3'
                                    >
                                        <CheckCircle size={17} className='text-green-500 shrink-0' />
                                        <span className='text-sm font-medium text-gray-700'>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SubscriptionPlans />

            {/* Support CTA */}
            <section className='bg-[#fafafa] py-14 px-4'>
                <div className='max-w-5xl mx-auto text-center'>
                    <MessageCircle className='mx-auto text-[#EE3E5A]' size={38} />
                    <h2 className='mt-4 text-3xl font-bold text-gray-900'>
                        Ready to start your online store?
                    </h2>
                    <p className='mt-3 text-gray-600'>
                        Apply as a seller, get approved, use your 7-day trial and choose the plan that fits your store.
                    </p>

                    <button
                        onClick={() => navigate('/join-as-seller')}
                        className='mt-7 inline-flex items-center justify-center gap-2 bg-[#EE3E5A] text-white px-7 py-3 text-sm font-bold rounded-md hover:bg-[#EE3E5A]/85 transition-all'
                    >
                        Join as Seller <ArrowRight size={16} />
                    </button>
                </div>
            </section>

            <FaqSection />
        </div>
    )
}

// import React from 'react'
// import HeroSection from '../../../components/HeroSection'
// import HomePageService from '../../../components/HomePageService'
// import Adminfeatures from '../../../components/Adminfeatures'
// import Buyerfeatures from '../../../components/Buyerfeatures'
// import CaseStudy from '../../../components/CaseStudy'
// import Customization from '../../../components/Customization'
// import MobileApps from '../../../components/MobileApps'
// import ProcessSection from '../../../components/ProcessSection'
// import TestimonialSection from '../../../components/TestimonailSection'
// import BuyerApp from '../../../components/BuyerApp'
// import GuideSection from '../../../components/GuideSection'
// import SubscriptionPlans from '../../../components/SubscriptionPlans'
// import FaqSection from '../../../components/FaqSection'

// export default function Home() {
//     return (
//         <div>
//             <HeroSection />
//             <HomePageService />
//             <Adminfeatures />
//             <Buyerfeatures/>
//             <CaseStudy/>
//             <Customization/>
//             <MobileApps/>
//             <ProcessSection/>
//             <TestimonialSection/>
//             <BuyerApp/>
//             <GuideSection/>
//             <SubscriptionPlans />
//             <FaqSection/>
//         </div>
//     )
// }