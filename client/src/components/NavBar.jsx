import { Link, Links, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { use, useEffect, useState } from 'react';
import logo from "../assets/yash-restaurant-logo.png";
const NavBar = () => {
    const {user , logout} = use(AuthContext)
    // console.log(user)
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


    useEffect(() => {
        const html = document.querySelector("html");
        html.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);


    const handleTheme = (checked) => {
        setTheme(checked ? "dark" : "light");
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    {/* For mobile device */}
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className='flex justify-center text-center'>
                    <Link to={'/'} >
                        <img className='w-15 h-12 mb-1 rounded-full shadow-lg' src={logo} />
                    </Link>
                    <Link to={'/'} className='btn btn-ghost text-xl'>My Restaurant</Link>
                </div>
            </div>
            {/* For medium to large device */}
            <div className="navbar-center hidden md:flex gap-10">
                <NavLink to='/'>Home</NavLink>
                <p>All Foods</p>
                <p>Gallery</p>
            </div>
            <div className="navbar-end gap-5">
                {user ? (
                    <> 
                        <input
                            onChange={(e) => handleTheme(e.target.checked)}
                            type="checkbox"
                            defaultChecked={localStorage.getItem('theme') === "dark"}
                            className="toggle"/>
                        
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button"><div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                                <img referrerPolicy='no-referrer' src={user.photoURL ? user.photoURL : "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"} />
                            </div>
                            </div></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li>
                                    <p>My Food</p>
                                </li>
                                <li>
                                    <p>Add Food</p>
                                </li>
                                <li>
                                    <p>My Orders</p>
                                </li>
                                <li>
                                    <button onClick={logout} className='btn btn-error btn-xs'>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </>): <Link to={'/login'} className='btn'>Login</Link>}
                </div>
        </div>
    );
};

export default NavBar;