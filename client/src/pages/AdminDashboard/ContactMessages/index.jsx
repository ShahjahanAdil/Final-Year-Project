import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Eye, Trash2, CheckCircle, X, Mail, Phone, MessageSquare } from 'lucide-react'

export default function ContactMessages() {
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [statusFilter, setStatusFilter] = useState("all")
    const [loading, setLoading] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [adminNotes, setAdminNotes] = useState("")
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchMessages()
    }, [page, statusFilter])

    const fetchMessages = async () => {
        setLoading(true)

        try {
            const res = await axios.get(`${import.meta.env.VITE_HOST}/contact-messages/admin/all?page=${page}&status=${statusFilter}`)

            if (res.status === 200) {
                setMessages(res.data.messages || [])
                setTotalPages(Math.ceil((res.data.totalMessages || 0) / 20))
            }
        } catch (error) {
            console.error(error)
            window.toastify?.(error.response?.data?.message || "Failed to fetch contact messages", "error")
        } finally {
            setLoading(false)
        }
    }

    const openModal = (message) => {
        setSelectedMessage(message)
        setAdminNotes(message.adminNotes || "")
        setShowModal(true)
    }

    const closeModal = () => {
        setSelectedMessage(null)
        setAdminNotes("")
        setShowModal(false)
    }

    const handleMarkReviewed = async () => {
        if (!selectedMessage?._id) return

        setSaving(true)

        try {
            const res = await axios.patch(`${import.meta.env.VITE_HOST}/contact-messages/admin/review/${selectedMessage._id}`, {
                adminNotes,
            })

            if (res.status === 202) {
                window.toastify?.(res.data.message, "success")
                closeModal()
                fetchMessages()
            }
        } catch (error) {
            console.error(error)
            window.toastify?.(error.response?.data?.message || "Failed to review message", "error")
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = confirm("Are you sure you want to delete this contact message?")
        if (!confirmDelete) return

        setLoading(true)

        try {
            const res = await axios.delete(`${import.meta.env.VITE_HOST}/contact-messages/admin/delete/${id}`)

            if (res.status === 203) {
                window.toastify?.(res.data.message, "success")
                fetchMessages()
            }
        } catch (error) {
            console.error(error)
            window.toastify?.(error.response?.data?.message || "Failed to delete message", "error")
        } finally {
            setLoading(false)
        }
    }

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

    const getStatusClass = (status) => {
        if (status === "new") return "bg-yellow-100 text-yellow-700"
        if (status === "reviewed") return "bg-green-100 text-green-700"
        return "bg-gray-100 text-gray-700"
    }

    return (
        <>
            <div className='bg-[#fafafa] px-3 sm:px-5 md:px-8 py-2.5 sm:py-4'>
                <p className='font-bold text-gray-900'>Contact Messages</p>
                <p className='text-[12px] sm:text-[13px] text-gray-900'>
                    View and review messages submitted from the contact us page.
                </p>
            </div>

            <div className='admin-container'>
                <div className='flex flex-col md:flex-row justify-between md:items-center gap-4'>
                    <p className='w-fit text-[12px] font-bold'>
                        <span className='text-gray-400'>Admin</span> / Contact Messages
                    </p>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)
                            setPage(1)
                        }}
                        className='w-full md:w-fit text-sm bg-white border border-gray-300 px-4 py-2 outline-none'
                    >
                        <option value="all">All Messages</option>
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                    </select>
                </div>

                <div className='relative overflow-x-auto mt-5'>
                    <table className='w-full text-xs text-left rtl:text-right text-gray-600'>
                        <thead className='text-[10px] text-[var(--secondary)] bg-white uppercase border-b border-gray-200'>
                            <tr>
                                <th className='font-bold px-6 py-4'>Sender</th>
                                <th className='font-bold px-6 py-4'>Subject</th>
                                <th className='font-bold px-6 py-4'>Message</th>
                                <th className='font-bold px-6 py-4'>Status</th>
                                <th className='font-bold px-6 py-4'>Submitted</th>
                                <th className='font-bold px-6 py-4 text-end'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr className='bg-white'>
                                    <td colSpan={6} className='py-20 text-center'>
                                        Loading...
                                    </td>
                                </tr>
                            ) : messages.length > 0 ? (
                                messages.map(msg => (
                                    <tr key={msg._id} className='bg-white border-b border-gray-200'>
                                        <td className='px-6 py-4'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-bold text-gray-900'>{msg.name}</p>
                                                <p className='text-gray-600'>{msg.email}</p>
                                                {msg.phone && <p className='text-gray-400'>{msg.phone}</p>}
                                            </div>
                                        </td>

                                        <td className='px-6 py-4 font-semibold text-gray-900'>
                                            {msg.subject || '-'}
                                        </td>

                                        <td className='px-6 py-4 max-w-[300px]'>
                                            <p className='line-clamp-2'>{msg.message}</p>
                                        </td>

                                        <td className='px-6 py-4'>
                                            <span className={`text-[10px] px-2 py-1 font-bold rounded-full capitalize ${getStatusClass(msg.status)}`}>
                                                {msg.status}
                                            </span>
                                        </td>

                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {dayjs(msg.createdAt).format('DD MMM YYYY HH:mm')}
                                        </td>

                                        <td className='px-6 py-4'>
                                            <div className='flex justify-end gap-3 items-center'>
                                                <Eye
                                                    size={16}
                                                    className='text-blue-500 cursor-pointer hover:text-blue-300'
                                                    onClick={() => openModal(msg)}
                                                />

                                                <Trash2
                                                    size={16}
                                                    className='text-red-500 cursor-pointer hover:text-red-300'
                                                    onClick={() => handleDelete(msg._id)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='bg-white'>
                                    <td colSpan={6} className='px-6 py-4 text-center text-red-500'>
                                        No contact message found!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {!loading && totalPages > 1 && (
                    <div className='flex flex-wrap my-8 items-center justify-center gap-1'>
                        {renderPageNumbers()}
                    </div>
                )}

                {/* Detail Modal */}
                <div className={`fixed inset-0 z-50 bg-black/40 transition-all duration-300 ease-linear ${showModal ? 'visible opacity-100' : 'invisible opacity-0'}`}>
                    <div className={`absolute right-0 top-0 h-full w-full max-w-3xl bg-white shadow-2xl transition-all duration-300 ease-linear ${showModal ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className='flex justify-between items-center px-6 py-5 border-b border-gray-200'>
                            <div>
                                <p className='font-bold text-gray-900 text-lg'>Contact Message Details</p>
                                <p className='text-xs text-gray-500'>Review sender message and add internal notes</p>
                            </div>

                            <button
                                className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200'
                                onClick={closeModal}
                            >
                                <X size={18} className='text-gray-700' />
                            </button>
                        </div>

                        <div className='h-[calc(100vh-145px)] overflow-y-auto p-6 bg-[#f8fafc]'>
                            <div className='bg-white border border-gray-200 rounded-xl p-5'>
                                <div className='flex justify-between items-start gap-4'>
                                    <div>
                                        <p className='text-xs text-gray-500'>Sender</p>
                                        <h2 className='text-2xl font-bold text-gray-900'>{selectedMessage?.name}</h2>
                                    </div>

                                    <span className={`w-fit text-xs px-3 py-1 rounded-full font-bold capitalize ${getStatusClass(selectedMessage?.status)}`}>
                                        {selectedMessage?.status}
                                    </span>
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
                                    <div className='flex gap-3 bg-[#f8fafc] border border-gray-100 rounded-xl p-4'>
                                        <Mail size={18} className='text-[#ee3e5a] shrink-0' />
                                        <div>
                                            <p className='text-xs text-gray-500'>Email</p>
                                            <p className='text-sm font-semibold text-gray-900 break-all'>{selectedMessage?.email}</p>
                                        </div>
                                    </div>

                                    <div className='flex gap-3 bg-[#f8fafc] border border-gray-100 rounded-xl p-4'>
                                        <Phone size={18} className='text-[#ee3e5a] shrink-0' />
                                        <div>
                                            <p className='text-xs text-gray-500'>Phone</p>
                                            <p className='text-sm font-semibold text-gray-900'>{selectedMessage?.phone || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-xl p-5 mt-5'>
                                <p className='font-bold text-gray-900 mb-3'>Message</p>

                                <div className='bg-[#f8fafc] border border-gray-100 rounded-xl p-4'>
                                    <p className='text-xs text-gray-500 mb-1'>Subject</p>
                                    <p className='text-sm font-bold text-gray-900'>{selectedMessage?.subject || '-'}</p>

                                    <div className='border-t border-gray-200 mt-4 pt-4'>
                                        <p className='text-xs text-gray-500 mb-1'>Message Body</p>
                                        <p className='text-sm text-gray-700 whitespace-pre-line leading-relaxed'>
                                            {selectedMessage?.message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='bg-white border border-gray-200 rounded-xl p-5 mt-5'>
                                <p className='font-bold text-gray-900 mb-3'>Admin Notes</p>

                                <textarea
                                    rows={5}
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    placeholder='Write internal review note here...'
                                    className='w-full border border-gray-300 rounded-xl px-4 py-3 text-sm outline-none focus:border-[var(--secondary)]'
                                />

                                {selectedMessage?.reviewedAt && (
                                    <p className='text-xs text-gray-400 mt-2'>
                                        Reviewed at: {dayjs(selectedMessage.reviewedAt).format('DD MMM YYYY HH:mm')}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='flex justify-end gap-3 px-6 py-5 border-t border-gray-200 bg-white'>
                            <button
                                className='px-5 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-200'
                                onClick={closeModal}
                            >
                                Cancel
                            </button>

                            <button
                                className='flex items-center gap-2 px-5 py-2 bg-[var(--secondary)] text-white text-sm font-semibold rounded-md hover:bg-[var(--secondary)]/80 disabled:opacity-60'
                                disabled={saving}
                                onClick={handleMarkReviewed}
                            >
                                <CheckCircle size={16} />
                                {saving ? "Saving..." : "Mark Reviewed"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}