import React, { useState } from "react";
import axios from "axios";
import { Send, Mail, Phone, User, MessageSquare } from "lucide-react";

const initialState = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export default function ContactForm() {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setState(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!state.name.trim() || !state.email.trim() || !state.message.trim()) {
            return window.toastify?.("Name, email and message are required!", "warning");
        }

        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_HOST}/contact-messages/submit`, state);

            if (res.status === 201) {
                window.toastify?.(res.data.message, "success");
                setState(initialState);
            }
        } catch (error) {
            console.error(error);
            window.toastify?.(error.response?.data?.message || "Failed to submit message", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative bg-[#fafafa] py-16 px-4">
            <div className="absolute top-0 left-0 w-full h-[280px] bg-[#ee3e5a]"></div>

            <div className="relative max-w-6xl mx-auto">
                <div className="text-center text-white mb-10">
                    <p className="text-sm font-bold uppercase tracking-wide">Contact Sorty</p>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        Have questions about selling on Sorty?
                    </h2>
                    <p className="mt-3 text-sm md:text-base max-w-2xl mx-auto text-white/90">
                        Send us your message. Our team will review it and get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900">Get in touch</h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Use this form for seller support, subscription questions, store setup help, or general platform inquiries.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#ee3e5a]/10 flex items-center justify-center shrink-0">
                                    <Mail size={18} className="text-[#ee3e5a]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Email Support</p>
                                    <p className="text-xs text-gray-500">Send your query anytime</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#ee3e5a]/10 flex items-center justify-center shrink-0">
                                    <MessageSquare size={18} className="text-[#ee3e5a]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Seller Questions</p>
                                    <p className="text-xs text-gray-500">Trial, subscription, store setup</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#ee3e5a]/10 flex items-center justify-center shrink-0">
                                    <Phone size={18} className="text-[#ee3e5a]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Contact Number</p>
                                    <p className="text-xs text-gray-500">Optional in form</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-bold text-gray-800">Name *</label>
                                    <div className="relative mt-2">
                                        <User size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={state.name}
                                            placeholder="Enter your name"
                                            className="w-full border border-gray-300 rounded-xl !pl-10 !pr-4 !py-3 text-sm outline-none focus:border-[#ee3e5a]"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-800">Email *</label>
                                    <div className="relative mt-2">
                                        <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={state.email}
                                            placeholder="Enter your email"
                                            className="w-full border border-gray-300 rounded-xl !pl-10 !pr-4 !py-3 text-sm outline-none focus:border-[#ee3e5a]"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-bold text-gray-800">Phone</label>
                                    <div className="relative mt-2">
                                        <Phone size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            name="phone"
                                            value={state.phone}
                                            placeholder="Enter phone number"
                                            className="w-full border border-gray-300 rounded-xl !pl-10 !pr-4 !py-3 text-sm outline-none focus:border-[#ee3e5a]"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-bold text-gray-800">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={state.subject}
                                        placeholder="Enter subject"
                                        className="w-full mt-2 border border-gray-300 rounded-xl !px-4 !py-3 text-sm outline-none focus:border-[#ee3e5a]"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-800">Message *</label>
                                <textarea
                                    name="message"
                                    value={state.message}
                                    placeholder="Write your message here..."
                                    rows="5"
                                    className="w-full mt-2 border border-gray-300 rounded-xl !px-4 !py-3 text-sm outline-none focus:border-[#ee3e5a]"
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 bg-[#ee3e5a] text-white py-3 rounded-xl font-bold hover:bg-[#d03451] transition duration-300 disabled:opacity-60"
                            >
                                {loading ? "Submitting..." : <>Submit Message <Send size={16} /></>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}