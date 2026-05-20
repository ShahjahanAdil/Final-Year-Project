import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqData = [
  {
    question: 'How can I start selling on Sorty?',
    answer:
      'You need to apply as a seller by submitting your profile, brand details and required verification information. After approval, your seller dashboard and store access will be available.',
  },
  {
    question: 'Do I get a free trial?',
    answer:
      'Yes. After your seller account is approved, you get a 7-day free trial. During this time, you can set up your store, add products and prepare your online business.',
  },
  {
    question: 'What happens after the free trial ends?',
    answer:
      'After the 7-day trial expires, your store will stop showing publicly until you purchase a monthly subscription plan. Visitors will see a maintenance message until your plan becomes active again.',
  },
  {
    question: 'How do I purchase a subscription plan?',
    answer:
      'You can choose Basic or Advanced plan, pay manually through the provided bank or wallet account, then submit your transaction ID and payment screenshot for review.',
  },
  {
    question: 'When will my plan become active?',
    answer:
      'Your plan becomes active after your payment proof is reviewed and approved. Once approved, your store will remain active for one month.',
  },
  {
    question: 'Can I customize my store design?',
    answer:
      'Yes. You can customize your store theme colors, layout, pages, menus, header, footer, product page settings and other store content from your seller dashboard.',
  },
  {
    question: 'Can I manage orders and payments?',
    answer:
      'Yes. Sellers can manage orders, update order status, manage payment methods and view payment-related details from the seller dashboard.',
  },
  {
    question: 'Can I connect my own domain?',
    answer:
      'Yes, custom domain support is available based on your plan and platform settings. You can manage domain-related options from your seller dashboard.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className='py-16 bg-white px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-10'>
          <p className='text-sm font-bold text-[#EE3E5A] uppercase tracking-wide'>
            Seller FAQs
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mt-2'>
            Questions sellers usually ask
          </h2>
          <p className='text-gray-600 text-sm mt-3'>
            Learn how seller approval, free trial, subscriptions and store management work on Sorty.
          </p>
        </div>

        <div className='space-y-4'>
          {faqData.map((item, index) => (
            <div
              key={index}
              className='rounded-xl border border-gray-200 bg-white overflow-hidden'
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className='w-full flex justify-between items-center gap-4 px-5 py-4 text-left font-bold text-gray-900 hover:bg-[#fafafa] focus:outline-none'
              >
                <span>{item.question}</span>

                <ChevronDown
                  className={`w-5 h-5 text-[#EE3E5A] shrink-0 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                />
              </button>

              <div
                className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-52 pb-5' : 'max-h-0 pb-0'
                  }`}
              >
                <p className='text-sm text-gray-600 leading-relaxed'>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}