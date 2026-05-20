import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaShop, FaUserCheck, FaWallet } from "react-icons/fa6";

export default function JoinAsSellerHero() {
    const navigate = useNavigate()

    return (
        <>
            <div className='join-as-seller-hero relative flex items-center w-full h-[70vh]'>
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--primary)]/50 to-transparent"></div>

                <div className='main-container flex justify-between items-center gap-8 md:gap-8 lg:gap-12 px-3 sm:px-6 z-1'>
                    <div className='flex flex-col gap-4 w-full max-w-[600px] text-white'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl'>Selling on Yo-Kart is Easy!</h1>
                        <p>Got an established offline store that you want to move online, or just have a passion for selling products online?</p>
                        <p>Well, here’s how to take that next step with us</p>
                        <p>All you will need is:</p>
                        <ul className='list-disc ml-4'>
                            <li>Legal Shop Details</li>
                            <li>Your Business Details</li>
                            <li>Business Bank Account Details</li>
                        </ul>
                    </div>
                    <div className='flex flex-col items-center flex-1 gap-4 bg-[#F3F4F4] px-2.5 py-8 rounded-[6px]'>
                        <div className='text-center'>
                            <p className='font-bold text-sm'>Grow your business online and</p>
                            <h2 className='text-lg'>Simply <span className='text-[var(--primary)]' style={{ fontFamily: 'Montserrat-Bold' }}>Start Selling</span> Here By</h2>
                        </div>
                        <button className='font-bold px-8 py-2 bg-[var(--primary)] text-white rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/50' onClick={() => navigate("/auth/seller/signup")}>Register now</button>
                        <p>OR</p>
                        <button className='font-bold px-8 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)] hover:text-white' onClick={() => navigate("/auth/seller/login")}>Login with existing account</button>
                    </div>
                </div>
            </div>

            <div className='w-full max-w-5xl mx-auto flex flex-col items-center px-3 sm:px-8 py-12 sm:py-16'>
                <h1 className='text-3xl text-gray-900 mb-12'>Become a Seller on Yo-Kart in 3 easy steps</h1>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='flex flex-col items-center text-center gap-2 text-gray-900'>
                        <div className='flex justify-center items-center w-24 h-24 rounded-full border border-gray-200 shad mb-2'>
                            <FaUserCheck className='text-[30px] text-[var(--secondary)]' />
                        </div>
                        <h3 className='text-lg'>Create Account</h3>
                        <p>Add your email and business details to get started selling on Yokart.</p>
                    </div>
                    <div className='flex flex-col items-center text-center gap-2 text-gray-900'>
                        <div className='flex justify-center items-center w-24 h-24 rounded-full border border-gray-200 shad mb-2'>
                            <FaShop className='text-[30px] text-[var(--secondary)]' />
                        </div>
                        <h3 className='text-lg'>Add Business</h3>
                        <p>Add name, address & e-mail of your company, store/ business.</p>
                    </div>
                    <div className='flex flex-col items-center text-center gap-2 text-gray-900'>
                        <div className='flex justify-center items-center w-24 h-24 rounded-full border border-gray-200 shad mb-2'>
                            <FaWallet className='text-[30px] text-[var(--secondary)]' />
                        </div>
                        <h3 className='text-lg'>Add Products/ Services</h3>
                        <p>Minimum 3 products/ services needed for your free listing page.</p>
                    </div>
                </div>
            </div>
        </>
    )
}