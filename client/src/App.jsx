import React from 'react'
import Routes from './pages/Routes'
import { useAuthContext } from './contexts/AuthContext'
import Loader from './components/Loader'
import { useSellerAuthContext } from './contexts/SellerAuthContext'

export default function App() {

    const { loading } = useAuthContext()
    const { loading: sellerLoading } = useSellerAuthContext()

    return (
        <div className='overflow-x-hidden'>
            {loading || sellerLoading ? <Loader /> : <Routes />}
        </div>
    )
}