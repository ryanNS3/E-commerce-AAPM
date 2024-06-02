import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StandardLayout } from '../layout/standardLayout'
import { Home } from '../pages/home'
import { Product } from '../pages/product'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StandardLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produto" element={<Product/>} />
          <Route path="/carrinho" element={<div>Carrinho</div>} />
          <Route path="/assinatura" element={<div>Assinatura</div>} />
          <Route path="/agendamento" element={<div>Agendamento</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
