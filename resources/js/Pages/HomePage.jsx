import '../../css/app.css';
import React, { useEffect, useState } from "react";
import { Link, Head } from '@inertiajs/react';
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Hero from "../Components/Hero"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useDispatch,useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import Table from "../Components/Table"
// import Drag from "../Components/Drag"
import Carousel1 from '@/Components/Carousel2';
import { More, MoreHoriz } from '@mui/icons-material';
import { Disclosure } from '@headlessui/react'
import { CiCircleMore } from "react-icons/ci";
import { setRefresh } from '@/redux/refreshSlice';
import CategCards from '@/Components/CategCards';
import { FaAnglesRight } from "react-icons/fa6";

function App({categories, products}) {
    console.log("home categs:",categories)

  const toggleDarkMode = useSelector((state) => state.changeTheme.value)
  const refresh = useSelector(state=>state.refresh.value)
  const dispatch = useDispatch()
  const darkTheme = createTheme({
      palette: {
      mode:toggleDarkMode?'dark':"light",
      },
  });

    if(refresh){
        window.location.reload()
        dispatch(setRefresh(false))
    }


  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
      setIsExpanded(!isExpanded);
  };
  function HomePage(){
    return(
      <div className=''>
        <div className=' pb-2'>
            <Hero/>
        </div>

        <div className='mt-6 mb-8 mx-6 flex justify-between items-center'>
            <h3 className='text-4xl font-semibold'>The best and newest</h3>
            <Link href='/products' className='bg-gray-800 flex justify-between items-center gap-2 text-white border border-black px-2 py-1 hover:scale-105 duration-200 ease-in-out rounded text-xl font-serif'>View All
            <FaAnglesRight/>
            </Link>
        </div>
        <div>

            <Carousel1 isHome={true} Data={products}/>
        </div>

        <div>
            <h3 className='text-4xl font-semibold mt-6 mb-8 mx-6'>All categories</h3>
            <CategCards Categs={categories}/>
        </div>

      </div>
    )
  }


  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  const[sy,setSy] = useState(window.screenY)
  useEffect(()=>{
    setSy(window.screenY)
  },[window.screenY])


  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className={`HomePage`}>
      <div className='flex items-center  '>
      <div className='w-full h-screen absolute'>
      </div>
      </div>
        <HomePage/>
    </div>
    <button onClick={()=>ScrollToTop()}
      className={`bg-[#c9a98a]  text-[#543214] p-3 border border-[#543214]  mr-4 mb-4 bottom-4 fixed ${sy > 300 ?`flex`:`hidden`}  right-0 z-50 rounded-full`}>
      <ArrowUpIcon className=' size-5'/>
      {window.scrollY}
    </button>

    </ThemeProvider>
  );
}

export default App;









