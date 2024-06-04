import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StandardLayout } from '../layout/standardLayout'
import { Home } from '../pages/home'
import { Product } from '../pages/product'
import { ProductProvider } from '../Contexts/productContext'
import { Cart } from '../pages/cart'
import { ScrollToTop } from '../layout/scrollToTop'
import { Login } from '../pages/login'

export function Router() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<StandardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/produto" element={<Product />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/assinatura" element={<div>Assinatura</div>} />
            <Route path="/agendamento" element={<div>Agendamento</div>} />
          </Route>
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  )
}
