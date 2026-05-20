import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { LiaPlusSolid } from "react-icons/lia";
import axios from 'axios';

export default function PlatformImageGalleryTwo({ settings }) {
    const [gallery, setGallery] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!settings.sellerID) return
        fetchPlatformHomeImageGallery()
    }, [settings])

    const fetchPlatformHomeImageGallery = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/platform/home/fetch-image-gallery?sellerID=${settings?.sellerID}`)
            .then(res => {
                if (res.status === 200) {
                    setGallery(res.data?.gallery)
                }
            })
            .catch(err => console.error('Frontend GET error', err.message))
            .finally(() => setLoading(false))
    }

    return (
        <div className='px-3'>
            <h2 className='text-2xl text-center'>#Image Gallery</h2>
            <p className='text-sm text-gray-700 text-center my-3'>Look at the collections we got for you</p>

            {loading ?
                <p className='text-center'>Loading...</p>
                :
                <div className='grid grid-cols-1 md:grid-cols-5 gap-3 mt-8'>
                    {gallery.map((img, i) => (
                        <Image key={img._id} src={`${import.meta.env.VITE_HOST}${img.imageURL}`} alt={`galler-image-${i}`} className='aspect-4/4 rounded-3xl object-cover' />
                    ))
                    }
                </div>
            }

            <div className='flex justify-center mt-8'>
                <LiaPlusSolid className='text-5xl cursor-pointer' />
            </div>
        </div>
    )
}