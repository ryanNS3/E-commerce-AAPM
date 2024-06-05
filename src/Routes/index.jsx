import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StandardLayout } from '../layout/standardLayout'
import { Home } from '../pages/home'
import { Product } from '../pages/product'
import { ProductProvider } from '../Contexts/productContext'
import { Cart } from '../pages/cart'
import { ScrollToTop } from '../layout/scrollToTop'
import { Login } from '../pages/login'
import { Scheduling } from '../pages/scheduling'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from '../Contexts/userContext'
import { ToastifyProvider } from '../Contexts/toastifyContext'
import { ToastContainer } from 'react-toastify'

export function Router() {
  const queryClient = new QueryClient()
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastifyProvider>
          <UserProvider>
            <ProductProvider>
              <ScrollToTop />
              <ToastContainer />
              <Routes>
                <Route path="/" element={<StandardLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/produto" element={<Product />} />
                  <Route path="/carrinho" element={<Cart />} />
                  <Route path="/assinatura" element={<div>Assinatura</div>} />
                  <Route path="/agendamento" element={<Scheduling />} />
                </Route>
              </Routes>
            </ProductProvider>
          </UserProvider>
        </ToastifyProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
