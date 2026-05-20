import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
    {
        question: "How much payment processing fee does Sorty charge for an ecommerce site?",
        answer:
            "Sorty does not charge any payment processing/transaction fee for orders processed on Sorty based ecommerce website. \n\nNote: A standard transaction fee is charged by payment gateway providers for processing payments and Sorty in no way/form is a beneficiary of those charges/fees.",
    },
    {
        question: "Can we add a custom payment method like CoinPayments (using its API) in Sorty?",
        answer:
            "Yes, we can integrate custom payment methods like CoinPayments in Sorty. \n\nIn general, cost of payment gateway integration is 750 USD, but it can vary depending upon the complexity of payment gateway. We will have to analyse the documentation of the payment gateway before sharing the exact cost of payment gateway integration.",
    },
    {
        question: "Does Sorty charge any commission on sales?",
        answer:
            "No, Sorty does not charge any commission on sales made through your ecommerce platform. All revenue generated belongs to the marketplace owner.",
    },
    {
        question: "How do sellers receive their payouts?",
        answer:
            "Sellers receive their payouts directly through the payment gateway integrated into your ecommerce website. The timeline depends on the payment gateway's policies (usually 3–7 business days).",
    },
    {
        question: "Can sellers manage inventory and orders themselves?",
        answer:
            "Yes, Sorty provides a seller dashboard where sellers can manage their products, inventory, orders, and shipping details in real time.",
    },
];

export default function JoinAsSellerFAQs() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-8 py-10 sm:py-16">
            <h2 className="text-center text-2xl font-bold mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 border border-gray-200 rounded-lg"
                    >
                        <button className="w-full flex justify-between items-center p-3 sm:p-6 text-left font-medium"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span>{faq.question}</span>
                            <FiChevronDown className={`text-xl transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`} />
                        </button>
                        <div className={`px-4 overflow-hidden transition-all duration-200 ${openIndex === index ? "max-h-96 pb-4" : "max-h-0"}`}>
                            <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}