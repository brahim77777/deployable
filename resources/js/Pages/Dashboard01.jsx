import SideBar from '@/Components/SideBar';
// import SideBar from "./SideBar"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ShoppingCart } from 'phosphor-react';
// import LineChart from "@/Components/LineChart"
import { useSelector,useDispatch } from 'react-redux';
import AddProduct from '@/Components/AddProduct';
import { Shop2 } from '@mui/icons-material';
import { TbBrandProducthunt } from 'react-icons/tb';
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { UsersIcon } from '@heroicons/react/24/outline';

import { useEffect,useState } from 'react';
import {Link} from '@inertiajs/react';
// import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
// import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
// import FilterButton from '../Components/DropdownFilter';
// import Datepicker from '../Components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
// import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import { Add, EditTwoTone } from '@mui/icons-material';
import { openProducts } from '@/redux/openProductsSlice';
import { MdAdd, MdDelete } from 'react-icons/md';
// import Banner from '../partials/Banner';
import { openStat } from '@/redux/openStatSlice';

import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from 'react-icons/tb';
import { FcAddRow } from 'react-icons/fc';
import axios from 'axios';




export default function Dashboard({ auth, products }) {
    console.log("From dashboard: ",products)
    console.log(products.data)
    const [productsList,setProductsList] = useState(products.data)
    const openStat = useSelector((state) => state.openStatState.value)
    const openProductsState = useSelector((state) => state.openProductsState.value)
    console.log(openStat)
    const toggleDarkMode = useSelector((state)=>state.changeTheme.value)
    const dispatch = useDispatch()
    const sideOpen = useSelector((state)=>state.sideBar.value)
    function deleteProduct(slug){


        // alert(slug)


        axios.delete('/products/'+slug).then((res)=>{
            // alert(res.data)
            console.log("deleted check!",res.data)

            // Assuming 'myArray' is the state variable storing the array and 'setMyArray' is the setter function

            // Remove an element from the array based on some condition

        // Assuming 'myArray' is the state variable storing the array and 'setMyArray' is the setter function

        // Remove an element from the array based on some condition

            setProductsList(res.data.products)


        })
    }
    const [isMediumScreen, setIsMediumScreen] = useState(false);
    const[isInAddProduct,setAddProduct] = useState(!openProductsState)
    useEffect(() => {
      const checkScreenWidth = () => {
        setIsMediumScreen(window.innerWidth <= 768); // Assuming medium screen width is 768px or less
      };

      checkScreenWidth(); // Check on component mount

      const handleResize = () => {
        checkScreenWidth();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    // const products = useSelector(state=>state.products.value)

    return (
        <div>
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
            >
            <Head  title="Dashboard" />
            <div className='flex'>
                    <SideBar setAddProduct={setAddProduct} isInAddProduct={isInAddProduct}/>

            {(openStat)&&
                    <main className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300 ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'} h-full p-4 ml-auto`}>
                    <div className=''>
                        <WelcomeBanner />
                    </div>
                    <div className='cards grid grid-cols-12 min-w-[13rem]  gap-6 mt-[2rem]  '>

                        <DashboardCard01 />
                        <DashboardCard02 />
                        <DashboardCard03 />
                        <DashboardCard04 />
                         <DashboardCard05 />
                        <DashboardCard06 />
                        <DashboardCard07 />
                        <DashboardCard08 />
                        <DashboardCard09 />
                        <DashboardCard11 />
                        <DashboardCard12 />
                        <DashboardCard13 />
                        {/* {setAddProduct(!isInAddProduct)} */}
                        {/* <div className='card h-[10rem] bg-white p-6 relative '>
                            <EyeIcon className='size-[3rem] p-3 rounded-full mb-2 bg-indigo-50 text-indigo-700'/>
                            <div>
                                <div className=' font-bold text-xl'>3.458k</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total view</label>
                            </div>
                            <div className=' text-green-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>0.43%<ArrowUp/></div>
                        </div>


                        <div className='card h-[10rem] bg-white p-6 relative '>
                            <ShoppingCart className='size-[3rem] p-3 rounded-full mb-2 bg-indigo-50 text-indigo-700'/>
                            <div>
                                <div className=' font-bold text-xl'>$45.23k</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total profit</label>
                            </div>
                            <div className=' text-green-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>4.35%<ArrowUp/></div>
                        </div>


                        <div className='card h-[10rem] bg-white p-6 relative  '>
                            <div className='p-2 bg-indigo-50 size-12 rounded-full flex  items-center justify-center '>
                                <HiOutlineShoppingBag className='size-[1.6rem]  text-indigo-700'/>
                            </div>
                            <div>
                                <div className=' font-bold text-xl'>160</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total view</label>
                            </div>
                            <div className=' text-green-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>2.59%<ArrowUp/></div>
                        </div>


                        <div className='card h-[10rem] bg-white p-6 relative '>
                            <UsersIcon className='size-[3rem] p-3 rounded-full mb-2 bg-indigo-50 text-indigo-700'/>
                            <div>
                                <div className=' font-bold text-xl'>3.456</div>
                                <label className=' font-medium text-gray-600 text-sm'>Total users</label>
                            </div>
                            <div className='text-blue-500 right-0 bottom-0 absolute m-6 flex items-center gap-1'>0.95%<ArrowDown/></div>
                        </div>*/}
                    </div>
                </main>
        }
        {((openProductsState))&&<div className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300  ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-gray-100 text-gray-900'} h-full  p-4  ml-auto `}>
                                    {/* // temp */}
                                    {/* <div className='mt-64'></div> */}
                            {/* //temp */}

                        <div className=' w-full flex justify-end'>

                            <button onClick={()=>{
                                // dispatch(openStat(false))
                                setAddProduct(true)
                                dispatch(openProducts(false))
                                }} className="flex bg-white bg-opacity-75 items-center py-1 rounded-md pl-2 pr-[4px] justify-between border border-gray-500">Add<MdAdd/></button>
                        </div>
                        <div class="overflow-x-auto w-full mx-auto   ">

                            <div class="inline-block min-w-full py-2  rounded-md mt-4 ">
                            <div class="overflow-hidden  ">
                                <table
                                class="min-w-full bg-white rounded-md  text-left text-sm font-light text-surface  ">
                                <thead
                                    class={`border-b   border-neutral-200 font-medium text-nowrap `}>
                                    <tr>
                                    <th scope="col" class="px-6 py-4 pr-10">Slug</th>
                                    <th scope="col" class="px-6 py-4">Title</th>
                                    <th scope="col" class="px-6 py-4">Quantity</th>
                                    <th scope="col" class="px-6 py-4">Last Update</th>
                                    <th scope="col" class="px-6 py-4">Created at</th>
                                    <th scope="col" class="px-6 py-4">Price</th>
                                    <th scope="col" class="px-6 py-4">More Details</th>
                                    <th scope="col" class="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {productsList.map((e,index)=>(
                                            <tr
                                            class="border-b relative border-neutral-200  transition duration-300 ease-in-out hover:bg-neutral-100  ">
                                            <td class="whitespace-nowrap px-6 py-4 font-medium  max-w-[100px] duration-300 m-auto flex items-center jus absolute  hover:max-w-full bg-white h-full line-clamp-1">{e.slug}</td>
                                            <td class=" whitespace-nowrap px-6 py-4">{e.title}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.quantity}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.updated_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{(e.created_at)}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{e.price}</td>
                                            <td class="whitespace-nowrap px-6 py-4"><Link href={'/products/'+e.slug} className='px-2 bg-gray-50 hover:bg-neutral-100 py-1 border-gray-500  rounded border'>Click here</Link></td>
                                            <td class="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                                                <button className='flex justify-between items-center gap-1 p-1 rounded bg-green-50 border border-green-500 text-green-500 hover:bg-green-600 hover:text-black'><TbEdit className=''/>Edit</button>
                                                <button onClick={()=>deleteProduct(e.slug)} className='flex justify-between items-center gap-1 p-1 rounded bg-red-50 border border-red-500 text-red-500 hover:bg-red-600 hover:text-black'>Delete<RiDeleteBin6Line /></button>
                                            </td>
                                            </tr>
                                        ))

                                        }
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>}
                    {
                        ((isInAddProduct)&&<AddProduct setAddProduct={setAddProduct} isInAddProduct={isInAddProduct}/>)
                    }
        </div>
        </AuthenticatedLayout>
        </div>
    );
}
