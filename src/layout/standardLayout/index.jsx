import { Outlet } from 'react-router-dom'
import { NavBar } from '../../components/navBar'
import { Footer } from '../../components/footer'

export function StandardLayout() {
  return (
    <div className="flex flex-col">
      <div className=" mx-5 mt-8 flex flex-col  justify-between space-y-8 sm:mx-6 md:mx-32 md:mt-12 xl:flex  xl:flex-col xl:justify-center">
        <NavBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
