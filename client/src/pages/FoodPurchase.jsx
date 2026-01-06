import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const FoodPurchase = () => {
    const {id} = useParams()
    const [singleFood, setSingleFood] = useState({})
    const axiosSecure = useAxiosSecure()
    const [loading,setLoading] = useState(true)
    const {user} = use(AuthContext)
    const [quantity,setQuantity] = useState(1)

    useEffect(() =>{
        axiosSecure.get(`/food/${id}`)
        .then(res =>{
            setSingleFood(res.data.result)
            setLoading(false)
        })
        .catch((err) =>{
            setLoading(false)
            console.log(err)
        })
    },[axiosSecure, id])

    if(loading){
        return <div>Loading....</div>
    }

    const handleQuantityChange = (qty) =>{
        setQuantity(parseInt(qty))
    }

    const handleOrder = () => {
        const orderData = {
            foodName: singleFood.foodName,
            buyrsName: user.displayName,
            buyersEmail: user.email,
            quantity,
            price: parseInt(singleFood.price) * quantity,
            foodId: singleFood._id
        }

        axiosSecure.post('/purchase', orderData)
        .then(res =>{
            console.log(res.data)
            toast.success(res.data.message)
        })
        .catch(err => {
            console.log(err)
            toast.error("Something went wrong!")
        })
    }
    return (
        <div className=''>
            <div className='border p-5 border-gray-300 rounded-xl max-w-2xl mx-auto'>
                <h1 className='font-bold text-lg'>Purchase Food</h1>
                <div className='mt-5'>
                    <p><b>Food Name:</b> {singleFood.foodName}</p>
                    <p><b>Buyre's Name:</b> {user.displayName}</p>
                    <p><b>Buyre's Email:</b> {user.email}</p>
                </div>
                <div className='space-y-2 my-3'>
                    <p>Quantity:</p>
                    <input onChange={(e) => handleQuantityChange(e.target.value)} className='input' min={0} defaultValue={quantity} placeholder='Quantity' type='number'/>
                    <div>
                        Price: ${parseInt(singleFood.price) * quantity}
                    </div>
                </div>
                <button onClick={handleOrder} className='btn btn-success'>Purchase</button>
            </div>
        </div>
    );
};

export default FoodPurchase;