import { use } from 'react';
import { CartContext } from '../context/CartContext';
import { FaCartArrowDown } from 'react-icons/fa';
import { MdOutlineCancel } from "react-icons/md";
import { Link } from 'react-router';
import { getTotalPrice } from '../helpers/getTotalPrice';



const CartView = () => {
    const {cart, removeFromCart } = use(CartContext)
    return (
        <div>
            <div className="dropdown dropdown-end">
                <button className='btn btn-circle relative'><FaCartArrowDown size={25} />
                    <div className='bg-red-500 w-5 h-5 rounded-full absolute text-white font-bold -top-1 -right-2'>{cart.length}</div>
                </button>
                <ul tabIndex="-1" 
                    className="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm space-y-4 w-[350px] border">

                    <h1 className='text-xl font-bold px-2'>Cart({cart.length})</h1>  
                    {
                        cart.length=== 0 && <div className='flex flex-col gap-5 items-center justify-center'>
                            <div>
                                <img className='object-cover h-38' src='https://cdn-icons-png.flaticon.com/512/412/412986.png'></img>
                            </div>
                            <p className='text-center text-xl font-bold'>No items in cart</p>
                        </div>
                    }  
                    {cart.map((c) =>(
                        <div key={c._id} className='flex items-center gap-3 border rounded-lg shadow-lg border-gray-100 px-3 relative'>
                            <div className='h-28 w-28 flex items-center'><img className='object-cover rounded-lg' src={c.foodImage}/></div>
                            <div>
                                <p className='text-lg font-semibold'>{c.foodName}</p>
                                <p className='text-md font-bold'>${c.price}</p>
                            </div>
                            <div onClick={()=> removeFromCart(c._id)} className='absolute right-3 top-3'><MdOutlineCancel size={25} /></div>
                        </div>
                    ))}
                    <hr className='mb-3'></hr>
                    <div className='flex justify-between px-5 text-xl'>
                        <p className='font-semibold'>Total :</p>
                        <p className='font-bold'>${getTotalPrice(cart)}</p>
                    </div>

                    <Link to={'/checkout'} className='w-full'>
                        <button className='btn bg-linear-to-r from pink-500 to-red-500 w-full'>Checkout</button>
                    </Link>
                </ul>
            </div>
        </div>
    );
};

export default CartView;