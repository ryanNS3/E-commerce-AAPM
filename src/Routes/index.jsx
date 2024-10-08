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
import { PageNotFound } from '../pages/pageNotFound'
import { CartProvider } from '../Contexts/cartContext'
import { PagesProvider } from '../Contexts/pagesContext'
import { Perfil } from '../pages/perfil'
import { ResetPassword } from '../pages/resetPassword'
import { Signature } from '../pages/signature'

export function Router() {
  const queryClient = new QueryClient()
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastifyProvider>
          <ToastContainer />
          <PagesProvider>
            <UserProvider>
              <ProductProvider>
                <CartProvider>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<StandardLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/perfil" element={<Perfil />} />
                      <Route
                        path="/restaurarSenha"
                        element={<ResetPassword />}
                      />
                      <Route path="/produto/:id" element={<Product />} />
                      <Route path="/carrinho" element={<Cart />} />
                      <Route path="/assinatura" element={<Signature />} />
                      <Route path="/agendamento" element={<Scheduling />} />
                      <Route path="/*" element={<PageNotFound />} />
                    </Route>
                  </Routes>
                </CartProvider>
              </ProductProvider>
            </UserProvider>
          </PagesProvider>
        </ToastifyProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
