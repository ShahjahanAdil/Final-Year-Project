import React from 'react'

export default function Adminfeatures() {
  return (
    <div>
      <section className='section bg-[#fff] py-10 ' id='admin-features'>
        <div className='container px-22'>
            <div className=' section__header section__header-md '>
                <div className='cms text-md-center'>
                    <h2>Streamline Market Management with Robust Admin Features</h2>
                    <p className='p--large mt-4'>
                       Our eCommerce marketplace platform is developed while considering business-level objectives. To run a multi vendor marketplace effortlessly, we offer a wide set of features for business owners to focus on business goals & market objectives.
                    </p>
                </div>

            </div>
            <div className='admin-features-list mb-10  grid-cols-1 grid sm:grid-cols-2 gap-8  '>
                {/* Product */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/catalog.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                            Product Catalog System
                        </h6>
                        <p>
                            To maintain the quality of product data and make it configurable for buyers and sellers, our multivendor eCommerce marketplace platform comes with a catalog system.
                        </p>
                    </div>
                </div>
                {/* Payment */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/payment.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                            Multiple Payment Options
                        </h6>
                        <p>
                            Every buyer has a preferred payment method which they use for the majority of online transactions. Enable your buyers to pay using their preferential payment mode with Sorty's 20+ payment methods pre-integrated. The popular payment options include Stripe Connect, credit/debit card, Pay at Store, COD, and digital wallets.
                        </p>
                    </div>
                </div>
                {/* Functionality */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/function.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                            Multilingual Functionality
                        </h6>
                        <p>
                            Take your brand to the global market and provide a tailored online shopping experience with MSN language API integrated with our multivendor eCommerce platform.
                        </p>
                    </div>
                </div>
                {/* Tax Management */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/tax.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                            Tax Management
                        </h6>
                        <p>
                           In-built tax module system to support single vs combined tax structure. Manage tax categories manually or automate tax management using pre-integrated Tax Jar and Avalara Tax APIs. Admin decides whether product prices will be inclusive or exclusive of taxes and vendors can enter the selling price accordingly.
                        </p>
                    </div>
                </div>
                {/* Cart */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/cart.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                            Abandoned Cart
                        </h6>
                        <p>
                            This feature allows the admin to get reports of in-cart items abandoned by users and items deleted by the users. The reports generated can help the admin to strategize to recover the abandoned carts by sending discount coupons or reminders.
                        </p>
                    </div>
                </div>
            {/* Analytics and Reporting */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/analytics.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                            Analytics And Reporting
                        </h6>
                        <p>
                            The Dashboard has analytical information and statistics for the admin to refer to for making any future decisions. To review the performance of the marketplace the admin can check the Sales report, visitors data, revenue information on the dashboard itself.
                        </p>
                    </div>
                </div>
            {/* Shiping Managemnet */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/shiping.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                           
                            Shipping Management
                        </h6>
                        <p>
                            Fetch live shipping rates, create shipping labels, and track shipments quickly with pre-integrated Shipstation and AfterShip APIs. Also, with our in-built shipping module, Admin/sellers can now define shipping packages categorizing products either as order level, item level shipping, or a combination of both.


                        </p>
                    </div>
                </div>
                {/* Revenue channel */}
                <div className='colateral-content p-[calc(1rem+1.7vw)]
                 flex realtive z-1 border-1 border-[#dee2e6]'>
                    <div className='media-side small flex-[0_0_50px]  mr-4 '>
                        <img src='src/assets/images/revenue.svg' loading='lazy' alt='catalog' class='svg-img block h-auto w-auto overflow-clip ' height={35} width={35}></img>
                    </div>
                    <div className='detail cms'>
                        <h6>
                            Multiple Revenue Channels
                        </h6>
                        <p>
                            The admin of a website can earn revenue from multiple sources such as commission, promotional banners, display featured products on the homepage, Pay-Per-Click (PPC ) advertisements, and subscription.
                        </p>
                    </div>
                </div>
            </div>
        </div>

      </section>
    </div>
  )
}
