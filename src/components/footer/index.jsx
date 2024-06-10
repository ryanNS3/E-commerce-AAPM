import { PhoneIcon } from '../../assets/icons/call'
import { EmailIcon } from '../../assets/icons/email'
import { LogoEnuxus } from '../../assets/logoEnexus'

export function Footer() {
  return (
    <footer className="mt-52 flex flex-wrap sm:grid h-64 sm:grid-cols-3 items-center rounded-lg bg-[#F8F8F8] px-4 lg:px-36">
      <nav>
        <ul className=" w-full flex justify-center items-center  sm:flex-col gap-4">
          <li>
            <a className="flex items-center gap-2 text-fun2 uppercase" href="">
              <div className=" rounded-md bg-[#F2F2F2] px-6 py-3">
                <PhoneIcon />
              </div>
              Telefone
            </a>
          </li>
          <li>
            <a className=" flex items-center gap-2 text-fun2 uppercase" href="">
              <div className=" rounded-md bg-[#F2F2F2] px-6 py-3">
                <EmailIcon />
              </div>
              Email
            </a>
          </li>
        </ul>
      </nav>

      <div className=" w-full flex flex-col items-center justify-center gap-4">
        <LogoEnuxus />
        <span className=" text-center">Alguns direitos reservados</span>
      </div>
    </footer>
  )
}
