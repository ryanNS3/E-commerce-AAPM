import { Outlet } from 'react-router-dom'
import { NavBar } from '../../components/navBar'
import { Footer } from '../../components/footer'

export function StandardLayout() {
  return (
    <div className="flex flex-col">
      <div className="  space-y-8 sm:mx-4 md:mx-32 md:mt-12 xl:flex  xl:flex-col xl:justify-center">
        <NavBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
