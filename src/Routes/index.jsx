import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StandardLayout } from '../layout/standardLayout'
import { Home } from '../pages/home'
import { Product } from '../pages/product'
import { ProductProvider } from '../Contexts/productContext'
import { Cart } from '../pages/cart'

export function Router() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<StandardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/produto" element={<Product />} />
            <Route path="/carrinho" element={<Cart/>} />
            <Route path="/assinatura" element={<div>Assinatura</div>} />
            <Route path="/agendamento" element={<div>Agendamento</div>} />
          </Route>
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  )
}
