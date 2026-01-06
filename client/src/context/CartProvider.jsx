import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { CartContext } from './CartContext';
import { use } from 'react';
import { AuthContext } from './AuthContext';

const CartProvider = ({children}) => {
    const [cart, setcart] = useState([])
    const axiosSecure = useAxiosSecure()
    const {user} = use(AuthContext)
    const [loading,setLoading] = useState(true)
    const [refatch,setRefatch] = useState(false)


    useEffect(()=>{
        setLoading(true)
        axiosSecure.get(`/cart?email=${user?.email}`)
        .then(data=>{
            // console.log(data.data.result)
            setcart(data.data.result)
            setLoading(false)
        })
    },[axiosSecure,user,refatch])

    const removeFromCart = (id) =>{
        axiosSecure.delete(`/cart/${id}`)
        .then(()=>{
            setRefatch(!refatch)
        })
    }

    const cartProviderData = {
        cart,
        setcart,
        loading,
        refatch,
        setRefatch,
        removeFromCart
    }

    return <CartContext value={cartProviderData}>{children}</CartContext>
};

export default CartProvider;
