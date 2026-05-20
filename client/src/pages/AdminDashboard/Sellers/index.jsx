import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdOutlineEdit } from 'react-icons/md'
import { RxTrash } from 'react-icons/rx'
import dayjs from 'dayjs'
import axios from 'axios'
import { BiX } from 'react-icons/bi'

export default function Sellers() {
    const [sellers, setSellers] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [searchText, setSearchText] = useState("")
    const [activeSearch, setActiveSearch] = useState("")
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (activeSearch) {
            fetchSearchedSellers(activeSearch, page)
        } else {
            fetchSellers(page)
        }
    }, [page, activeSearch])

    const fetchSellers = (page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/sellers/list/all?page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setSellers(data?.sellers || [])
                    setTotalPages(Math.ceil(data?.totalSellers / 20))
                }
            })
            .catch(err => console.error('Frontend GET error', err.message))
            .finally(() => setLoading(false))
    }

    const fetchSearchedSellers = (text, page) => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/admin/sellers/list/search?searchText=${text}&page=${page}`)
            .then(res => {
                if (res.status === 200) {
                    setSellers(res.data?.searchedSellers || [])
                    setTotalPages(Math.ceil(res.data?.totalSearchedSellers / 20))
                }
            })
            .catch(err => console.error('Frontend GET error', err.message))
            .finally(() => setLoading(false))
    }

    const handleSearch = () => {
        if (!searchText) {
            setActiveSearch("")
            setPage(1)
            return
        }
        setActiveSearch(searchText)
        setPage(1)
    }

    const handleUpdateSeller = async (ans) => {
        setLoading(true);
        try {
            const res = await axios.put(`${import.meta.env.VITE_HOST}/admin/sellers/list/update-status/${selectedSeller._id}`, { status: ans });
            if (res.status === 202) {
                setShowUpdateModal(false);
                setSelectedSeller(null);
                window.toastify(res.data.message, "success")
                if (activeSearch) {
                    fetchSearchedSellers(activeSearch, page);
                } else {
                    fetchSellers(page);
                }
            }
        } catch (err) {
            console.error("Frontend UPDATE error", err.message);
            window.toastify(err.response.data.message || "Something went wrong! Please try again.", "error")
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteSeller = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this seller?");
        if (!confirmDelete) return;

        setLoading(true);
        try {
            const res = await axios.delete(`${import.meta.env.VITE_HOST}/admin/sellers/list/delete/${id}`);
            if (res.status === 203) {
                window.toastify("Seller deleted successfully!", "success")
                if (activeSearch) {
                    fetchSearchedSellers(activeSearch, page);
                } else {
                    fetchSellers(page);
                }
            }
        } catch (err) {
            console.error("Frontend DELETE error", err.message);
            window.toastify(err.response.data.message || "Something went wrong! Please try again.", "error")
        } finally {
            setLoading(false);
        }
    };

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i ? 'bg-[var(--secondary)]/75 text-white' : 'bg-white !text-gray-700'}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    return (
        <>
            <div className='bg-[#fafafa] px-3 sm:px-5 md:px-8 py-2.5 sm:py-4'>
                <p className='font-bold text-gray-900'>Seller List</p>
                <p className='text-[12px] sm:text-[13px] text-gray-900'>View and manage all registered sellers on the platform.</p>
            </div>

            <div className='admin-container'>
                <div className='flex justify-between items-center gap-5'>
                    <p className='w-fit text-[12px] font-bold'><span className='text-gray-400'>Admin</span> / Seller List</p>

                    <div className='flex flex-1 justify-end items-center gap-2.5'>
                        <input type="text" name="searchText" id="searchText" value={searchText} placeholder='Search by id, username or email' className='w-full max-w-[250px] text-sm bg-white !px-4 !py-2 !rounded-none' onChange={e => setSearchText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} />
                        <button className='text-sm text-white bg-[var(--secondary)] px-6 py-2 transition-all duration-150 ease-linear hover:bg-[var(--secondary)]/70' onClick={handleSearch}>Search</button>
                    </div>
                </div>

                <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-xs text-left rtl:text-right text-gray-600">
                        <thead className="text-[10px] text-[var(--secondary)] bg-white uppercase border-b border-gray-200">
                            <tr>
                                <th scope="col" className="font-bold px-6 py-4">Seller ID</th>
                                <th scope="col" className="font-bold px-6 py-4">Seller</th>
                                <th scope="col" className="font-bold px-6 py-4">Reg. Date</th>
                                <th scope="col" className="font-bold px-6 py-4">Status</th>
                                <th scope="col" className="font-bold px-6 py-4 text-end">Actions</th>
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
                                    sellers.length > 0 ?
                                        sellers.map(seller => (
                                            <tr className="bg-white border-b border-gray-200">
                                                <td className="px-6 py-4">{seller.userID}</td>
                                                <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap">
                                                    <div className='flex flex-col gap-1'>
                                                        <p className='text-gray-900 font-bold'>{seller.username}</p>
                                                        <p className='text-gray-600'>{seller.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{dayjs(seller.createdAt).format('DD MMM YYYY HH:mm')}</td>
                                                <td className="px-6 py-4 capitalize">
                                                    <span className={`text-[10px] px-2 py-1 font-bold ${seller.status === 'pending' ? 'text-[#d4d407] bg-[#f6fac6]' :
                                                        seller.status === 'approved' ? 'text-[#0ec520] bg-[#d1ffd5]' :
                                                            seller.status === 'rejected' ? 'text-[#e63636] bg-[#ffe4e4]' :
                                                                'text-[#eb990c] bg-[#fff0d1]'}`}
                                                    >
                                                        {seller.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className='flex justify-end gap-2 items-center'>
                                                        <MdOutlineEdit className='text-[16px] text-blue-500 cursor-pointer hover:text-blue-300'
                                                            onClick={() => {
                                                                setSelectedSeller(seller);
                                                                setShowUpdateModal(true);
                                                            }}
                                                        />
                                                        <RxTrash className='text-[16px] text-red-500 cursor-pointer hover:text-red-300' onClick={() => handleDeleteSeller(seller._id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr className='bg-white'>
                                            <td colSpan={5} className='px-6 py-4 text-center text-red-500'>No seller found!</td>
                                        </tr>
                            }
                        </tbody>
                    </table>
                </div>

                {
                    !loading &&
                    totalPages > 1 &&
                    <div className='flex flex-wrap my-8 items-center justify-center gap-1'>
                        {renderPageNumbers()}
                    </div>
                }

                {/* Update Modal */}
                <div className={`fixed inset-0 z-50 bg-black/40 transition-all duration-300 ease-linear ${showUpdateModal ? 'visible opacity-100' : 'invisible opacity-0'}`}
                    onClick={() => setShowUpdateModal(false)}
                >
                    <div className={`absolute right-0 top-0 h-full w-full max-w-4xl bg-white shadow-2xl transition-all duration-300 ease-linear ${showUpdateModal ? 'translate-x-0' : 'translate-x-full'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className='flex justify-between items-center px-6 py-5 border-b border-gray-200'>
                            <div>
                                <p className='font-bold text-gray-900 text-lg'>Seller Details</p>
                                <p className='text-xs text-gray-500'>View and manage seller account information</p>
                            </div>

                            <button
                                className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200'
                                onClick={() => setShowUpdateModal(false)}
                            >
                                <BiX className='text-2xl text-gray-700' />
                            </button>
                        </div>

                        <div className='h-[calc(100vh-150px)] overflow-y-auto p-6 bg-[#f8fafc]'>
                            {/* Top Brand Card */}
                            <div className='bg-white border border-gray-200 p-5 mb-5'>
                                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                                    <div>
                                        <p className='text-xs text-gray-500'>Brand Name</p>

                                        <h2 className='text-2xl font-bold text-gray-900'>
                                            {selectedSeller?.brandName || '-'}
                                        </h2>

                                        <p className='text-sm text-gray-500 mt-1'>
                                            /{selectedSeller?.brandSlug || '-'}
                                        </p>
                                    </div>

                                    <span className={`w-fit text-xs px-3 py-1 font-bold capitalize ${selectedSeller?.status === 'pending'
                                        ? 'text-yellow-700 bg-yellow-100'
                                        : selectedSeller?.status === 'approved'
                                            ? 'text-green-700 bg-green-100'
                                            : selectedSeller?.status === 'rejected'
                                                ? 'text-red-700 bg-red-100'
                                                : 'text-orange-700 bg-orange-100'
                                        }`}>
                                        {selectedSeller?.status || '-'}
                                    </span>
                                </div>
                            </div>

                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                                {/* Left Card */}
                                <div className='bg-white border border-gray-200 p-5'>
                                    <p className='font-bold text-gray-900 mb-4'>Account Information</p>

                                    <div className='space-y-4'>
                                        <div>
                                            <p className='text-xs text-gray-500'>Seller ID</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.userID || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>Full Name</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.fullname || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>Username</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.username || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>Email Address</p>
                                            <p className='text-sm font-semibold text-gray-900 break-all'>
                                                {selectedSeller?.email || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>Role</p>
                                            <p className='text-sm font-semibold text-gray-900 capitalize'>
                                                {selectedSeller?.role || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Card */}
                                <div className='bg-white border border-gray-200 p-5'>
                                    <p className='font-bold text-gray-900 mb-4'>Contact & Verification</p>

                                    <div className='space-y-4'>
                                        <div>
                                            <p className='text-xs text-gray-500'>Phone Number</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.phoneNumber || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>WhatsApp Number</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.whatsappNumber || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>CNIC Number</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.cnic || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>Address</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.address || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className='text-xs text-gray-500'>Registration Date</p>
                                            <p className='text-sm font-semibold text-gray-900'>
                                                {selectedSeller?.createdAt
                                                    ? dayjs(selectedSeller.createdAt).format('DD MMM YYYY HH:mm')
                                                    : '-'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subscription Card */}
                            <div className='bg-white border border-gray-200 p-5 mt-5'>
                                <p className='font-bold text-gray-900 mb-4'>Subscription Information</p>

                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <div className='bg-[#f8fafc] border border-gray-100 rounded-lg p-4'>
                                        <p className='text-xs text-gray-500'>Current Plan</p>
                                        <p className='text-sm font-bold text-gray-900'>
                                            {selectedSeller?.plan || 'No Plan'}
                                        </p>
                                    </div>

                                    <div className='bg-[#f8fafc] border border-gray-100 rounded-lg p-4'>
                                        <p className='text-xs text-gray-500'>Subscription Status</p>
                                        <p className='text-sm font-bold text-gray-900 capitalize'>
                                            {selectedSeller?.subscriptionStatus || 'none'}
                                        </p>
                                    </div>

                                    <div className='bg-[#f8fafc] border border-gray-100 rounded-lg p-4'>
                                        <p className='text-xs text-gray-500'>Expiry Date</p>
                                        <p className='text-sm font-bold text-gray-900'>
                                            {selectedSeller?.subscriptionEndsAt
                                                ? dayjs(selectedSeller.subscriptionEndsAt).format('DD MMM YYYY')
                                                : '-'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className='flex flex-wrap justify-end gap-3 px-6 pt-4 border-t border-gray-200 bg-white'>
                            <button
                                className='px-5 py-2 bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200'
                                onClick={() => setShowUpdateModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className='px-5 py-2 bg-[#f78330] text-white text-sm font-semibold hover:bg-[#e37320]'
                                onClick={() => handleUpdateSeller("banned")}
                            >
                                Ban Seller
                            </button>

                            <button
                                className='px-5 py-2 bg-[#f73535] text-white text-sm font-semibold hover:bg-[#df2d2d]'
                                onClick={() => handleUpdateSeller("rejected")}
                            >
                                Reject
                            </button>

                            <button
                                className='px-5 py-2 bg-[var(--secondary)] text-white text-sm font-semibold hover:bg-[var(--secondary)]/80'
                                onClick={() => handleUpdateSeller("approved")}
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}