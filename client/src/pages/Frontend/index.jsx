import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import JoinAsSeller from './JoinAsSeller'
import Footer from '../../components/Footer'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Terms from './Terms'
import PrivacyPolicy from './PrivacyPolicy'
import Brands from './Brands'
import BuySubscription from './BuySubscription'

export default function Frontend() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
        <>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='about-us' element={<AboutUs />} />
                <Route path='contact-us' element={<ContactUs />} />
                <Route path='terms' element={<Terms />} />
                <Route path='privacy-policy' element={<PrivacyPolicy />} />
                <Route path='brands' element={<Brands />} />
                <Route path='join-as-seller' element={<JoinAsSeller />} />
                <Route path='subscription/buy/:plan' element={<BuySubscription />} />
            </Routes>
            <Footer />
        </>
    )
}