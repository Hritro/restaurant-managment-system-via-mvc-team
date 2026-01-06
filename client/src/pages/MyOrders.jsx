import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { use } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const axiosSecure = useAxiosSecure()
    const { user } = use(AuthContext)

    useEffect(()=>{
        axiosSecure.get(`/user-payments?email=${user.email}`)
        .then(res => {
            setOrders(res.data.result)
        })
    },[user, axiosSecure])
    console.log(orders)
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th></th>
                        <th>TransactionId</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index+1}</th>
                                <td>{order.transactionId}</td>
                                <td>{order.cart.length}</td>
                                <td>{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;