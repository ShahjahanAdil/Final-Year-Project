import React, { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import axios from 'axios'

export default function BrandFaqs({ settings }) {
    const [faqs, setFaqs] = useState([])
    const [loading, setLoading] = useState(true)

    const [openIndex, setOpenIndex] = useState(null);
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    };

    useEffect(() => {
        if (settings) {
            fetchFaqs()
        }
    }, [settings])

    const fetchFaqs = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/platform/home/fetch-faqs?sellerID=${settings?.sellerID}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setFaqs(data?.faqs)
                }
            })
            .catch(err => console.error('Frontend GET error', err.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className='w-full mx-auto max-w-5xl py-10 sm:py-16 px-3 sm:px-8 !my-10'>
            <div className='flex flex-col justify-center items-center space-y-4 mb-4'>
                <h1 className='head text-2xl font-extrabold text-[var(--text)] text-center'>Frequently asked questions</h1>
                <button className='justify-center  text-[#fff] bg-[var(--pr)] hover:bg-[var(--pr)]/70 border-gray-600 transform transition-all ease-linear duration-300 px-4 py-2 rounded-lg mb-6'>Contact Support</button>
            </div>
            <div className='space-y-6'>
                {loading ? (
                    <p className='text-center text-gray-500'>Loading FAQs...</p>
                ) : faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                        <div key={faq._id} className='bg-[#f3f3f3] border border-gray-200 rounded-[12px]' >
                            <button className='w-full flex justify-between items-center p-3 sm:p-6 text-left font-medium' onClick={() => toggleFAQ(index)}>
                                <span>{faq.question}</span>
                                <FiChevronDown className={`text-xl transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
                            </button>
                            <div className={`px-4 overflow-hidden transition-all duration-200 ${openIndex === index ? "max-h-96 pb-4" : "max-h-0"}`}>
                                <p className="text-[var(--text)]/80 whitespace-pre-line">{faq.answer}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center text-red-500'>No FAQs found.</p>
                )}
            </div>
        </div>
    )
}