import { Outlet } from 'react-router-dom'
import { NavBar } from '../../components/navBar'

export function StandardLayout() {
  return (
    <div className="  space-y-8 md:mx-32 md:mt-12 xl:flex  xl:flex-col xl:justify-center">
      <NavBar />
      <Outlet />
    </div>
  )
}
