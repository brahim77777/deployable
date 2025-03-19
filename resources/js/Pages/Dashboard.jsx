
import withLayout from '../withLayout';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ShoppingCart } from 'phosphor-react';
// import LineChart from "@/Components/LineChart"
import { useSelector,useDispatch } from 'react-redux';
import { CalculateOutlined, CategoryOutlined, Shop2, ThreePOutlined } from '@mui/icons-material';
import { TbBrandProducthunt, TbCategory2 } from 'react-icons/tb';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiDotsThreeOutlineVerticalFill, PiShoppingBagLight } from "react-icons/pi";

import { useEffect } from 'react';
import {Link} from '@inertiajs/react';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';



import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { RiSlashCommands } from 'react-icons/ri';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dashboard =  ({ children , auth,userName}) => {
    // const { products } = usePage().props;

    // const [page, setPage] = useState(0);

    console.log("this is auth:",children)


    const [sidebarOpen, setSidebarOpen] = useState(false)

      const [currentPath,setCurrentPath] = useState(window.location.pathname);



  const navigation = [
    { name: 'Products', icon: HomeIcon, current: (currentPath === "/dashboard/products"), href: "/dashboard/products"},
    { name: 'Categories', icon: TbCategory2, current: (currentPath === "/dashboard/categories") , href:"/dashboard/categories"},
    { name: 'Users', icon: UsersIcon, current: (currentPath === "/dashboard/users") ,href:"/dashboard/users"},
    { name: 'Orders', icon: PiShoppingBagLight, current: (currentPath === "/dashboard/commands") ,href:"/dashboard/commands"},
    // { name: 'Sales', icon: GiPriceTag, current: false },
    { name: 'Optimization ',href:"/dashboard/simplex", icon: CalculateOutlined, current: (currentPath === "/dashboard/simplex") },
    { name: 'Formule de Wilson ',href:"/dashboard/wilson", icon: CalculateOutlined, current: (currentPath === "/dashboard/wilson") },

    { name: 'Statistiques', icon: ChartBarIcon, current: (currentPath === "/dashboard/statistiques"), href :"/dashboard/statistiques"}
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '/profile' },
    { name: 'Sign out', href: '/signout' },
  ]

console.log("userName:",userName)
  return (
    <>
      <div className=''>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <Link href='/' className="flex w-full  bg-gray-900 px-4 top-0 absolute text-white font-serif font-thin text-2xl h-16 flex-shrink-0 items-center ">
                    <h1>BAZGUI</h1>
                    </Link>
                  <div className="mt-[5rem] h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex cursor-pointer items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <Link href='/' className="flex text-white font-serif font-thin text-2xl h-16 flex-shrink-0 items-center bg-gray-900 px-4">
             <h1>BAZGUI</h1>
            </Link>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4 ">
                {navigation.map((item) => (
                 <Link
                 key={item.name}
                 href={item.href}
                 className={classNames(
                   item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                   'group flex items-center cursor-pointer px-2 py-2 text-base font-medium rounded-md'
                 )}
               >
                 <item.icon
                   className={classNames(
                     item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                     'mr-3 flex-shrink-0 h-6 w-6'
                   )}
                   aria-hidden="true"
                 />
                 {item.name}
               </Link>

                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >

                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <PiDotsThreeOutlineVerticalFill

                        className=" size-9  fill-gray-500 border p-[0.4rem] focus:ring rounded-full"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1 ">
                   <div className="py-6 bg-white">
              {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div> */}
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 bg-white ">
              <AuthenticatedLayout
            user={auth?.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
            <Head  title="Dashboard" />
            <div className='flex flex-col bg-white'>
                    <div className=' '>
                        <WelcomeBanner name={userName} />
                    </div>

            { children }
            </div>
            </AuthenticatedLayout>
            </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
export default withLayout(Dashboard);

