import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiSend } from 'react-icons/fi'
import { IoCheckmark } from "react-icons/io5";
import { RiSecurePaymentFill } from "react-icons/ri";
import axios from 'axios'

const initialState = { fullname: "", username: "", email: "", password: "", confirmPassword: "", address: "", phoneNumber: "", whatsappNumber: "", cnic: "", brandName: "" }

export default function SellerSignup() {
    const [state, setState] = useState(initialState)
    const [activeTab, setActiveTab] = useState(1)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleNext = () => {
        if (activeTab === 1) {
            if (!state.fullname || !state.username || !state.email || !state.password || !state.confirmPassword) return alert("Please fill all fields in Step 1")
            if (state.password.length < 6) return alert("Password must be at least 6 characters long!")
            if (state.password !== state.confirmPassword) return alert("Passwords do not match!")
        }
        if (activeTab === 2) {
            if (!state.phoneNumber || !state.whatsappNumber || !state.address || !state.cnic) return alert("Please fill all fields in Step 2")
        }
        setActiveTab(prev => prev + 1);
    };

    const handleSubmit = async () => {
        if (!state.brandName) return alert("Please enter a brand name")

        setLoading(true)

        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST}/auth/seller/signup`, state)

            if (res.status === 201) {
                setState(initialState)
                setActiveTab(4)
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-gray-100 p-2.5 sm:p-6'>
            <div className='w-full max-w-[800px] bg-white p-4 sm:p-6 rounded-xl shad'>
                {
                    activeTab < 4 &&
                    <>
                        <div className='flex justify-between items-center mb-6'>
                            <p className='w-10 h-10 text-[var(--primary)] flex justify-center items-center rounded-full border border-[var(--primary)]'>1</p>
                            <div className={`flex-1 h-[1px] ${activeTab >= 2 ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}></div>
                            <p className={`w-10 h-10 flex justify-center items-center rounded-full border ${activeTab >= 2 ? 'text-[var(--primary)] border-[var(--primary)]' : 'border-gray-300'}`}>2</p>
                            <div className={`flex-1 h-[1px] ${activeTab === 3 ? 'bg-[var(--primary)]' : 'bg-gray-300'}`}></div>
                            <p className={`w-10 h-10 flex justify-center items-center rounded-full border ${activeTab === 3 ? 'text-[var(--primary)] border-[var(--primary)]' : 'border-gray-300'}`}>3</p>
                        </div>

                        <h2 className='text-xl text-[var(--primary)]'>Create your seller account</h2>
                        <p className='text-gray-700'>* Please fill all fields</p>
                    </>
                }

                {
                    activeTab === 1 ?
                        <div className='flex flex-col gap-4 mt-6'>
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Fullname *</label>
                                    <input
                                        type="text"
                                        name='fullname'
                                        value={state.fullname}
                                        placeholder="Enter fullname"
                                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Username *</label>
                                    <input
                                        type="text"
                                        name='username'
                                        value={state.username}
                                        placeholder="Enter username"
                                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-semibold text-gray-700'>Email *</label>
                                <input
                                    type="email"
                                    name='email'
                                    value={state.email}
                                    placeholder="Enter email"
                                    className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex flex-col sm:flex-row gap-4'>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Password *</label>
                                    <input
                                        type="password"
                                        name='password'
                                        value={state.password}
                                        placeholder="Enter password"
                                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-1 flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Confirm Password *</label>
                                    <input
                                        type="password"
                                        name='confirmPassword'
                                        value={state.confirmPassword}
                                        placeholder="Enter password again"
                                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        activeTab === 2 ?
                            <div className='flex flex-col gap-4 mt-6'>
                                <div className='flex flex-col sm:flex-row gap-4'>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <label className='text-sm font-semibold text-gray-700'>Phone Number *</label>
                                        <input
                                            type="number"
                                            name='phoneNumber'
                                            value={state.phoneNumber}
                                            placeholder="Enter phone number"
                                            className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <label className='text-sm font-semibold text-gray-700'>Whatsapp Number *</label>
                                        <input
                                            type="number"
                                            name='whatsappNumber'
                                            value={state.whatsappNumber}
                                            placeholder="Enter whatsapp number"
                                            className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>Address *</label>
                                    <input
                                        type="text"
                                        name='address'
                                        value={state.address}
                                        placeholder="Enter address"
                                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-700'>CNIC *</label>
                                    <input
                                        type="text"
                                        name='cnic'
                                        value={state.cnic}
                                        placeholder="Enter CNIC number (e.g. XXXXX-XXXXXXX-X)"
                                        className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            :
                            activeTab === 3 ?
                                <div className='flex flex-col gap-4 mt-6'>
                                    <div className='flex flex-1 flex-col gap-2'>
                                        <label className='text-sm font-semibold text-gray-700'>Brand Name *</label>
                                        <input
                                            type="text"
                                            name='brandName'
                                            value={state.brandName}
                                            placeholder="Enter brand name (e.g., gucci, versace, etc.)"
                                            className="w-full border border-gray-300 text-sm focus:outline-none focus:border-[var(--secondary)]"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                :
                                <div className='flex flex-col justify-center items-center'>
                                    <h2 className='text-2xl text-[var(--primary)]'>Congratulations!</h2>
                                    <p className='text-gray-900'>Your application has been submitted</p>
                                    <div className='flex justify-center items-center w-30 h-30 border-4 border-[#32ee32] rounded-full mt-6'>
                                        <IoCheckmark size={60} className='text-[#32ee32]' />
                                    </div>
                                    <p className='text-sm text-gray-900 mt-6'>Your application will be reviewed by Admin shortly.</p>
                                    <p className='text-sm text-gray-900'>Check your <span className='text-[var(--secondary)] cursor-pointer hover:underline'>application status</span></p>
                                </div>
                }

                {
                    activeTab < 3 &&
                    <p className='flex items-center gap-2 w-fit text-sm text-[#01750f] bg-[#cff9d4] mt-8 px-4 py-1.5 rounded-[8px]'><RiSecurePaymentFill /> Your data is 100% secured</p>
                }

                <div className='flex justify-end mt-8'>
                    {
                        activeTab > 1 && activeTab < 3 ?
                            <div className='flex gap-3'>
                                <button className='flex items-center gap-2 bg-gray-200 text-gray-700 px-8 py-2 rounded-[4px] transition-all duration-200 ease-linear hover:bg-gray-300' onClick={() => setActiveTab(prev => prev - 1)}>Go Back</button>
                                <button className='flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-2 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/50' onClick={handleNext}>Next <FiArrowRight /></button>
                            </div>
                            :
                            activeTab === 1 ?
                                <button className='flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-2 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/50' onClick={handleNext}>Next <FiArrowRight /></button>
                                :
                                activeTab === 3 ?
                                    <div className='flex gap-3'>
                                        <button className='flex items-center gap-2 bg-gray-200 text-gray-700 px-8 py-2 rounded-[4px] transition-all duration-200 ease-linear hover:bg-gray-300' onClick={() => setActiveTab(prev => prev - 1)}>Go Back</button>
                                        <button className='flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-2 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/50'
                                            disabled={loading}
                                            onClick={handleSubmit}>
                                            {
                                                !loading ?
                                                    <>Submit <FiSend /></>
                                                    :
                                                    <>Please wait...</>
                                            }
                                        </button>
                                    </div>
                                    :
                                    <button className='flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-2 rounded-[4px] transition-all duration-200 ease-linear hover:bg-[var(--primary)]/50' onClick={() => navigate("/")}>Finish</button>
                    }
                </div>
            </div>
        </div >
    )
}