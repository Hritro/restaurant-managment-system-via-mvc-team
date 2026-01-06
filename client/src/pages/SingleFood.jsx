import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import {toast} from 'react-hot-toast'
import { CartContext } from "../context/CartContext";


const SingleFood = () => {
    const {id} = useParams()
    const [singleFood, setSingleFood] = useState({})
    const axiosSecure = useAxiosSecure()
    const [loading,setLoading] = useState(true)
    const {user} = use(AuthContext)
    const {refatch,setRefatch} = use(CartContext)

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

    // console.log(singleFood)
    const handleAddToCart = async() =>{
        const {_id, ...foodData} = singleFood
        const data = {
            ...foodData,
            buyersEmail: user.email,
            orderQuantity : 1
        }
        console.log(data)
        await axiosSecure.post('/add-to-cart', data)
        toast.success('Added to your cart!')
        setRefatch(!refatch)

    }

    return (
        <div className="border border-gray-200 shadow-lg rounded-lg mx-10 overflow-hidden flex">     
            <div className="w-1/2 p-5 space-y-3">
                <div className="text-xl font-bold">Food Name : {singleFood.foodName}</div>
                <div className="badge badge-primary">Catagory : {singleFood.foodCategory}</div>
                <div className="badge badge-secondary ml-3">Origin : {singleFood.foodOrigin}</div>
                <p>{singleFood.description}</p>
                <div className="flex items-center gap-3">
                    <div className="text=2xl font-bold">Price : ${singleFood.price}</div>
                    <div className="badge badge-info">Available: {singleFood.quantity}</div>
                    <div className="badge badge-info">Purchased: {singleFood.orderCount}</div>
                </div>
                <button onClick={handleAddToCart} className="btn btn-primary w-full">Add to Cart</button>
                <hr className="text-gray-300"/>

                <div className="text-sm">
                    <h3 className="font-bold">Added By: {singleFood.addedByName}</h3>
                    <p className="font-meduim text-xs">Adder Email: {singleFood.addedByEmail}</p>
                </div>

            </div>
            <div className="w-1/2 flex items-center">
                <img className="rounded-lg h-full w-full object-cover" src={singleFood.foodImage} alt=""/>
            </div>

        </div>
    );
};

export default SingleFood;