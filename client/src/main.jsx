import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'

import AuthProvider from './context/AuthProvider.jsx'
import { router } from './router.jsx'
// import CartProvider from './context/CartProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* <CartProvider> */}
        <RouterProvider router={router}></RouterProvider>
      {/* </CartProvider> */}
    </AuthProvider>
  </StrictMode>,
)

