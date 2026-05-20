import React, { useEffect, useState } from 'react'
import './seller.css'
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom'
import { useSellerAuthContext } from '../../contexts/SellerAuthContext'
import { Banknote, CodeXml, Gauge, Globe, Package, ShoppingBag, Store, UserCog2, CreditCard } from 'lucide-react';
import { BsArrowRight } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { FiLogOut } from 'react-icons/fi'
import SidebarDropdown from '../../components/SidebarDropdown'
import Dashboard from './Dashboard'
import AddProduct from './Inventory/AddProduct'
import ManageProducts from './Inventory/ManageProducts'
import Categories from './Inventory/Categories'
import Settings from './Store/Settings'
import Coupons from './Store/Coupons'
import SizeCharts from './Inventory/SizeCharts'
import EditProduct from './Inventory/ManageProducts/EditProduct'
import Profile from './Profile'
import DeliveryChargesAndPaymentMethods from './Payments/DeliveryChargesAndPaymentMethods';
import ManageOrders from './Orders/ManageOrders';
import UpdateOrder from './Orders/ManageOrders/UpdateOrder';
import ManagePayments from './Payments/MangePayments';
import Domain from './Domain';
import Faqs from './Store/Faqs';
import TagsManager from './TagsManager';
import ImageGallery from './Inventory/ImageGallery';
import DeliveryDateEstimate from './Orders/DeliveryDateEstimate';
import Sale from './Store/Sale';
import Pages from './Store/Pages';
import AddPage from './Store/Pages/AddPage';
import UpdatePage from './Store/Pages/UpdatePage';
import Menus from './Store/Menus';
import CreateMenu from './Store/Menus/CreateMenu';
import UpdateMenu from './Store/Menus/UpdateMenu';
import Subscriptions from './Subscriptions'

export default function Admin() {
    const { user, handleLogout } = useSellerAuthContext()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (window.innerWidth <= 991) {
            setOpen(true)
        }
    }, [])

    return (
        <>
            <div className='flex'>
                <div className={`seller-sider ${open ? 'seller-sider-open' : 'seller-sider-closed'}`}>
                    <h6 className={`text-xl text-black px-5 py-4 cursor-pointer italic ${open && '!hidden'}`} onClick={() => navigate('/')}>{user.brandName}</h6>

                    <div className={`seller-sider-links flex flex-col flex-1 overflow-y-auto justify-between ${open && 'items-center'}`}>
                        <div className={`flex flex-col gap-1 overflow-y-auto mt-5 ${open && 'mt-15'}`}>
                            <NavLink to="/seller/dashboard" className={({ isActive }) => `seller-sider-link !text-black hover:!text-[var(--primary)] ${open && '!p-[12px] w-fit'} ${isActive && 'seller-sider-link-active'}`}><Gauge size={16} /> <span className={`sider-text ${open && '!hidden'}`}>Dashboard</span></NavLink>
                            <SidebarDropdown
                                icon={Store}
                                title="Store"
                                open={open}
                                seller={true}
                                items={[
                                    { label: "Menus", path: "/seller/store/menus" },
                                    { label: "Pages", path: "/seller/store/pages" },
                                    { label: "Sale", path: "/seller/store/sale" },
                                    { label: "Coupons", path: "/seller/store/coupons" },
                                    { label: "Faqs", path: "/seller/store/faqs" },
                                    { label: "Settings", path: "/seller/store/settings/theme" },
                                ]}
                            />
                            <SidebarDropdown
                                icon={ShoppingBag}
                                title="Inventory"
                                open={open}
                                seller={true}
                                items={[
                                    { label: "Add Product", path: "/seller/inventory/add-product" },
                                    { label: "Manage Products", path: "/seller/inventory/manage-products" },
                                    { label: "Categories", path: "/seller/inventory/categories" },
                                    { label: "Size Charts", path: "/seller/inventory/size-charts" },
                                    { label: "Image Gallery", path: "/seller/inventory/image-gallery" },
                                ]}
                            />
                            <SidebarDropdown
                                icon={Package}
                                title="Orders"
                                open={open}
                                seller={true}
                                items={[
                                    { label: "Manage Orders", path: "/seller/orders/manage-orders" },
                                    { label: "Delivery Date Estimate", path: "/seller/orders/delivery-date-estimate" },
                                    // { label: "Cancellation Requests", path: "/seller/orders/cancellation-requests" },
                                ]}
                            />
                            <SidebarDropdown
                                icon={Banknote}
                                title="Payments"
                                open={open}
                                seller={true}
                                items={[
                                    { label: "Manage Payments", path: "/seller/payments/manage-payments" },
                                    // { label: "Refund Requests", path: "/seller/payments/refund-requests" },
                                    { label: "Delivery Charges & Payment Methods", path: "/seller/payments/charges-and-methods" },
                                ]}
                            />
                            <NavLink to="/seller/profile" className={({ isActive }) => `seller-sider-link !text-black hover:!text-[var(--primary)] ${open && '!p-[12px] w-fit'} ${isActive && 'seller-sider-link-active'}`}><UserCog2 size={16} /> <span className={`sider-text ${open && '!hidden'}`}>Profile</span></NavLink>
                            <NavLink to="/seller/domain" className={({ isActive }) => `seller-sider-link !text-black hover:!text-[var(--primary)] ${open && '!p-[12px] w-fit'} ${isActive && 'seller-sider-link-active'}`}><Globe size={16} /> <span className={`sider-text ${open && '!hidden'}`}>Domain</span></NavLink>
                            <NavLink to="/seller/tags-manager" className={({ isActive }) => `seller-sider-link !text-black hover:!text-[var(--primary)] ${open && '!p-[12px] w-fit'} ${isActive && 'seller-sider-link-active'}`}><CodeXml size={16} /> <span className={`sider-text ${open && '!hidden'}`}>Tags Manager</span></NavLink>
                            <NavLink to="/seller/subscriptions" className={({ isActive }) => `seller-sider-link !text-black hover:!text-[var(--primary)] ${open && '!p-[12px] w-fit'} ${isActive && 'seller-sider-link-active'}`}><CreditCard size={16} /> <span className={`sider-text ${open && '!hidden'}`}>Subscriptions</span></NavLink>
                        </div>

                        <div className='pt-5'>
                            <div className='flex gap-2 items-center p-2'>
                                <CiUser className='bg-[#e8e8e8] p-2 w-8 h-8 rounded-full' />
                                <div className={`${open && '!hidden'}`}>
                                    <div className='text-black'>{user?.username}</div>
                                    <div className='text-gray-900 text-[12px]'>{user?.email}</div>
                                </div>
                            </div>

                            <div className='flex justify-center py-3.5'>
                                <button className='text-sm flex gap-2 items-center text-red-500'><FiLogOut /> <span className={`sider-text ${open && '!hidden'}`} onClick={() => handleLogout()}>Logout</span></button>
                            </div>
                        </div>
                    </div>

                    <div className={`seller-sider-arrow bg-[var(--primary)]/75 !text-white cursor-pointer p-3 rounded-full transition-all duration-200 ease-out ${open ? 'rotate-0' : 'rotate-180'}`} onClick={() => setOpen(prev => !prev)}>
                        <BsArrowRight />
                    </div>
                </div>

                <div className={`seller-content overflow-x-hidden ${open ? '!ml-[50px] md:!ml-[65px]' : '!ml-[220px]'}`}>
                    <Routes>
                        <Route index element={<Dashboard />} />
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route path='store/menus' element={<Menus />} />
                        <Route path='store/menus/create' element={<CreateMenu />} />
                        <Route path='store/menus/update/:menuID' element={<UpdateMenu />} />
                        <Route path='store/pages' element={<Pages />} />
                        <Route path='store/pages/add' element={<AddPage />} />
                        <Route path='store/pages/update/:pageID' element={<UpdatePage />} />
                        <Route path='store/sale' element={<Sale />} />
                        <Route path='store/coupons' element={<Coupons />} />
                        <Route path='store/faqs' element={<Faqs />} />
                        <Route path='store/settings/*' element={<Settings />} />
                        <Route path='inventory/add-product' element={<AddProduct />} />
                        <Route path='inventory/manage-products' element={<ManageProducts />} />
                        <Route path='inventory/manage-products/edit/:productID' element={<EditProduct />} />
                        <Route path='inventory/categories' element={<Categories />} />
                        <Route path='inventory/size-charts' element={<SizeCharts />} />
                        <Route path='inventory/image-gallery' element={<ImageGallery />} />
                        <Route path='orders/manage-orders' element={<ManageOrders />} />
                        <Route path='orders/manage-orders/update/:orderID' element={<UpdateOrder />} />
                        <Route path='orders/delivery-date-estimate' element={<DeliveryDateEstimate />} />
                        <Route path='payments/manage-payments' element={<ManagePayments />} />
                        <Route path='payments/charges-and-methods' element={<DeliveryChargesAndPaymentMethods />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='domain' element={<Domain />} />
                        <Route path='tags-manager' element={<TagsManager />} />
                        <Route path='subscriptions' element={<Subscriptions />} />
                    </Routes>
                </div>
            </div>
        </>
    )
}