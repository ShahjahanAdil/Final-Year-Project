import React, { useEffect, useState } from "react";
import ProductBoxFashion from "../ProductBoxFashion";
import axios from "axios";

export default function PlatformRecentProductsFashion({ storeSettings, isCustomDomain }) {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [loadingCategories, setLoadingCategories] = useState(true)

    useEffect(() => {
        if (storeSettings?.sellerID) {
            fetchRecentProducts()
        }
    }, [storeSettings, selectedCategory])

    useEffect(() => {
        if (storeSettings?.sellerID) {
            fetchPlatformHomeCategories()
        }
    }, [storeSettings])

    const fetchPlatformHomeCategories = () => {
        setLoadingCategories(true)
        axios.get(`${import.meta.env.VITE_HOST}/platform/home/fetch-categories?sellerID=${storeSettings?.sellerID}`)
            .then(res => {
                if (res.status === 200) {
                    setCategories(res.data?.categories)
                }
            })
            .catch(err => console.error('Frontend GET error', err.message))
            .finally(() => setLoadingCategories(false))
    }

    const fetchRecentProducts = () => {
        setLoadingProducts(true)
        axios.get(`${import.meta.env.VITE_HOST}/platform/home/fetch-recent-products-filtered?sellerID=${storeSettings?.sellerID}&category=${selectedCategory}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setProducts(data?.products)
                }
            })
            .catch(err => console.error('Frontend GET error', err.message))
            .finally(() => setLoadingProducts(false))
    }

    return (
        <section className="relative main-container min-h-[650px] px-4 pt-8 pb-20">
            <h2 className="text-2xl text-center mb-4 font-bold">Lastest Products</h2>

            <div className="flex justify-start md:justify-center items-center gap-2.5 overflow-x-auto mb-10">
                {loadingCategories ?
                    <p>Loading...</p>
                    :
                    <>
                        <button className={`group min-w-fit relative text-sm capitalize font-bold px-8 sm:px-10 py-3 sm:py-4 border border-gray-300 rounded-full whitespace-nowrap overflow-hidden transition-all duration-200 ease-linear hover:text-white
                        ${selectedCategory === "all" ? "text-white" : "text-black"}`}
                            onClick={() => setSelectedCategory("all")}
                        >
                            <span className="z-0">Shop All</span>
                            <span className={`absolute top-0 left-0 w-0 h-full bg-black -z-1 transition-all duration-200 ease-linear group-hover:w-full
                                ${selectedCategory === "all" ? "w-full" : "w-0"}`}> </span>
                        </button>
                        {categories.map(cat => (
                            <button key={cat._id} className={`group min-w-fit relative text-sm capitalize font-bold px-8 sm:px-10 py-3 sm:py-4 border border-gray-300 rounded-full whitespace-nowrap overflow-hidden transition-all duration-200 ease-linear hover:text-white
                        ${selectedCategory === cat.name ? "text-white" : "text-black"}`}
                                onClick={() => setSelectedCategory(cat.name)}
                            >
                                <span className="z-0">{cat.name}</span>
                                <span className={`absolute top-0 left-0 w-0 h-full bg-black -z-1 transition-all duration-200 ease-linear group-hover:w-full
                                ${selectedCategory === cat.name ? "w-full" : "w-0"}`}> </span>
                            </button>
                        ))}
                    </>
                }
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {loadingProducts ?
                    <p>Loading...</p>
                    :
                    (!loadingProducts && products.length > 0) ?
                        products.map((item, idx) => (
                            <ProductBoxFashion key={idx} item={item} idx={idx} settings={storeSettings} isCustomDomain={isCustomDomain} />
                        ))
                        :
                        <p className="text-red-500">No latest product found!</p>
                }
            </div>
        </section>
    );
}