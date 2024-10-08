import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { USER_ICON } from '../utils/constants';

 const Dropdown =({url}) =>{

    const navigate =useNavigate();

    const handleSignout =()=>{
        signOut(auth).then(() => {
          
          }).catch((error) => {
            navigate("/error")
          });
    }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900  bg-black shadow-sm  bg-transparent">
            {/* options */}
         <img className=' w-full rounded' src={USER_ICON} alt="" />
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href=""
              className="block px-4 py-2 text-sm text-white data-[focus]:opacity-50"
            >
              Account settings
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href=""
              className="block px-4 py-2 text-sm text-white data-[focus]:opacity-50"
            >
              Support
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href=""
              className="block px-4 py-2 text-sm text-white data-[focus]:opacity-50"
            >
              License
            </a>
          </MenuItem>
          

            <MenuItem>
              <button
                type="submit"
                onClick={handleSignout}
                className="block w-full px-4 py-2 text-left text-sm text-white data-[focus]:opacity-50"
              >
                Sign out
              </button>
            </MenuItem>

       
        </div>
      </MenuItems>
    </Menu>
  )
}

export default Dropdown;