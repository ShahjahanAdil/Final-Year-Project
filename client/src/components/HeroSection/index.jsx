import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ArrowRight,
    Store,
    ShoppingBag,
    CreditCard,
    ShieldCheck,
    Zap,
} from 'lucide-react'
import './herosection.css'
import heroImg from '../../assets/images/image.png'

export default function HeroSection() {
    const navigate = useNavigate()

    const words = ['Online Store', 'Brand Store', 'Seller Dashboard', 'Ecommerce Business']
    const [text, setText] = useState('')
    const [index, setIndex] = useState(0)
    const [subIndex, setSubIndex] = useState(0)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        if (subIndex === words[index].length + 1 && !deleting) {
            const wait = setTimeout(() => setDeleting(true), 1000)
            return () => clearTimeout(wait)
        }

        if (subIndex === 0 && deleting) {
            setDeleting(false)
            setIndex(prev => (prev + 1) % words.length)
            return
        }

        const timeout = setTimeout(() => {
            setSubIndex(prev => prev + (deleting ? -1 : 1))
        }, deleting ? 50 : 90)

        return () => clearTimeout(timeout)
    }, [subIndex, index, deleting])

    useEffect(() => {
        setText(words[index].substring(0, subIndex))
    }, [subIndex, index])

    return (
        <section className='relative overflow-hidden bg-[#fff7f9] px-4 py-16 lg:py-20'>
            <div className='absolute -top-24 -right-24 w-80 h-80 bg-[#EE3E5A]/10 rounded-full blur-3xl'></div>
            <div className='absolute -bottom-24 -left-24 w-80 h-80 bg-[#EE3E5A]/10 rounded-full blur-3xl'></div>

            <div className='max-w-7xl mx-auto relative'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                    <div>
                        <div className='inline-flex items-center gap-2 bg-white border border-[#EE3E5A]/20 rounded-full px-4 py-2 text-sm font-bold text-[#EE3E5A]'>
                            <Zap size={16} />
                            7-Day Free Trial After Approval
                        </div>

                        <h1 className='mt-6 text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight'>
                            Launch your{' '}
                            <span className='block text-[#EE3E5A]'>
                                {text}
                                <span className='animate-pulse'>|</span>
                            </span>
                            with Sorty
                        </h1>

                        <p className='mt-5 text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl'>
                            Sorty helps sellers create a professional ecommerce store, add products,
                            manage orders, receive payments and grow their brand online without building a separate website.
                        </p>

                        <div className='mt-8 flex flex-col sm:flex-row gap-3'>
                            <button
                                onClick={() => navigate('/join-as-seller')}
                                className='inline-flex items-center justify-center gap-2 bg-[#EE3E5A] text-white px-7 py-3 rounded-md text-sm font-bold hover:bg-[#EE3E5A]/85 transition-all'
                            >
                                Start Selling <ArrowRight size={16} />
                            </button>

                            <button
                                onClick={() => navigate('/subscription/buy/Basic')}
                                className='inline-flex items-center justify-center gap-2 bg-white text-gray-900 border border-gray-200 px-7 py-3 rounded-md text-sm font-bold hover:bg-gray-50 transition-all'
                            >
                                View Plans
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
                                <CreditCard className='text-[#EE3E5A] mb-2' size={22} />
                                <p className='text-sm font-bold text-gray-900'>Payments</p>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-xl p-4'>
                                <ShieldCheck className='text-[#EE3E5A] mb-2' size={22} />
                                <p className='text-sm font-bold text-gray-900'>Verified Sellers</p>
                            </div>
                        </div>
                    </div>

                    <div className='relative hidden lg:block'>
                        <div className='absolute inset-0 bg-[#EE3E5A]/10 rounded-[2rem] rotate-3'></div>
                        <div className='relative bg-white border border-gray-200 rounded-[2rem] p-6 shadow-xl'>
                            <img
                                src={heroImg}
                                alt='Sorty seller ecommerce store'
                                className='w-full h-auto object-contain'
                            />

                            <div className='absolute -bottom-5 -left-5 bg-white border border-gray-200 shadow-lg rounded-xl p-4'>
                                <p className='text-xs text-gray-500'>Trial Access</p>
                                <p className='text-lg font-bold text-gray-900'>7 Days Free</p>
                            </div>

                            <div className='absolute -top-5 -right-5 bg-white border border-gray-200 shadow-lg rounded-xl p-4'>
                                <p className='text-xs text-gray-500'>Monthly Plans</p>
                                <p className='text-lg font-bold text-gray-900'>Rs 2000+</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}