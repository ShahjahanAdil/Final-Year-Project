import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import { useSellerAuthContext } from '../../contexts/SellerAuthContext';
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { BiX } from "react-icons/bi"

export default function Header() {
    const { user } = useAuthContext()
    const { user: seller } = useSellerAuthContext()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <header className='flex justify-between items-center gap-5 px-4 py-2 sm:px-10 sm:py-3 md:px-14 lg:px-20 lg:py-3.5 border-b border-b-gray-300'>
            <div>
                <h1 className='text-xl sm:text2xl md:text-3xl text-[var(--primary)] italic cursor-pointer' onClick={() => navigate("/")}>Sorty</h1>
            </div>
            <div className='hidden md:flex items-center gap-4'>
                <button className='font-bold mr-3 transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => navigate("/about-us")}>About Us</button>
                <button className='font-bold mr-3 transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => navigate("/contact-us")}>Contact Us</button>
                <button className='font-bold mr-3 transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => navigate(`${seller?._id ? "/seller/dashboard" : "/join-as-seller"}`)}>Seller Account</button>
                {
                    user.role === 'admin' &&
                    <button className='font-bold mr-3 transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => navigate("/admin/dashboard")}>Admin</button>
                }
                {
                    !user.userID ?
                        <>
                            <button className='text-sm border border-[var(--primary)] text-[var(--primary)] font-bold px-6 py-1.5 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)] hover:text-white' onClick={() => navigate("/auth/login")}>Login</button>
                            <button className='text-sm bg-[var(--primary)] text-white font-bold px-6 py-1.5 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/60' onClick={() => navigate("/auth/signup")}>Signup</button>
                        </>
                        :
                        <button className='text-sm bg-[var(--primary)] text-white font-bold px-6 py-1.5 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/60' onClick={() => navigate("/user/dashboard")}>Dashboard</button>
                }
            </div>

            <div className='flex md:hidden gap-4 items-center'>
                <button className='text-xs bg-[var(--primary)] text-white font-bold px-4 py-1.5 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/60' onClick={() => navigate("/contact-us")}>Contact Us</button>
                <HiOutlineMenuAlt3 className='cursor-pointer' onClick={() => setOpen(true)} />
            </div>

            <div className={`fixed top-0 right-0 w-full h-screen bg-white p-4 overscroll-y-auto z-10 transition-all duration-300 ease-linear ${open ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                <div className='flex justify-end'>
                    <BiX className='text-2xl text-gray-800' onClick={() => setOpen(false)} />
                </div>

                <div className='flex flex-col gap-6 mt-10'>
                    <button className='font-bold transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => { navigate("/about-us"); setOpen(false) }}>About Us</button>
                    <button className='font-bold transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => navigate("/contact-us")}>Contact Us</button>
                    <button className='font-bold transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => { navigate("/join-as-seller"); setOpen(false) }}>Seller Account</button>
                    {
                        user.role === 'admin' &&
                        <button className='font-bold transition-all duration-200 ease-linear hover:text-[var(--primary)]' onClick={() => { navigate("/admin/dashboard"); setOpen(false) }}>Admin</button>
                    }
                    {
                        !user.userID ?
                            <>
                                <button className='text-sm border border-[var(--primary)] text-[var(--primary)] font-bold px-6 py-1.5 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)] hover:text-white' onClick={() => { navigate("/auth/login"); setOpen(false) }}>Login</button>
                                <button className='text-sm bg-[var(--primary)] text-white font-bold px-6 py-1.5 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/60' onClick={() => { navigate("/auth/signup"); setOpen(false) }}>Signup</button>
                            </>
                            :
                            <button className='text-sm bg-[var(--primary)] text-white font-bold px-6 py-1.5 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/60' onClick={() => { navigate("/user/dashboard"); setOpen(false) }}>Dashboard</button>
                    }
                </div>
            </div>
        </header >
    )
}