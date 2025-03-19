import React, { useEffect } from "react";
import { AiFillProfile } from "react-icons/ai";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { VscAdd } from "react-icons/vsc";
import { useSelector,useDispatch } from "react-redux";
import { ChevronRightIcon, ChevronDownIcon, UsersIcon } from "@heroicons/react/24/outline";
import { openStat } from "@/redux/openStatSlice";
import { FaBarsStaggered, FaSalesforce } from "react-icons/fa6";
import { useState } from "react";
import { BsSliders } from "react-icons/bs";
import { setOpenSide } from "@/redux/sideBarSlice";
import { Analytics, CategoryOutlined, ProductionQuantityLimitsSharp } from "@mui/icons-material";
import { GiPriceTag } from "react-icons/gi";
import { openProducts } from "@/redux/openProductsSlice";
export default function SideBar({setAddProduct}) {
  const [open, setOpen] = React.useState(0);
//   const openStatState = useSelector((state) => state.openStatState.value)
  const dispatch = useDispatch()
//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value);
//   };

//   const[sideOpen,setSideOpen] = useState(true)
  useEffect(()=>{
    if(window.screen.width < 500){
        console.log("<500"+window.screen.width)
    }else{
        console.log(">500"+window.screen.width)
    }
  },[window.screen])
  const sideOpen = useSelector((state)=>state.sideBar.value)
  return (
         <Card className={` ${(sideOpen)?`  translate-x-0 `:`-translate-x-full`} fixed max-w-[18rem] z-40 bg-[#1C2434] text-white  ease-in-out duration-500 h-[calc(100vh-2rem)] w-full   p-4 shadow-xl shadow-blue-gray-900/5`}>

      <div className=" flex mb-8  py-2 rounded-md  ">
        <button onClick={()=>{dispatch(setOpenSide(!sideOpen))}} className={`${sideOpen?` opacity-100`:` opacity-0 hidden`} duration-500 z-50  flex left-0 mx-2 p-2 text-white bg-[#4338CA]  rounded cursor-pointer`}>
            <FaBarsStaggered/>
       </button >
        <div className=" text-xl  font-semibold" color="blue-gray">
          Dashboard
        </div>
      </div>
      <List>

        <ListItem
            onClick={()=>{
            dispatch(openProducts(true))
            dispatch(openStat(false))
            setAddProduct(false)
            }}>
          <ListItemPrefix>
            <AiFillProfile className="h-5 w-5" />
          </ListItemPrefix>
          products
          <ListItemSuffix>
            <Chip value="" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem >
          <ListItemPrefix>
            <UsersIcon className="size-5" />
          </ListItemPrefix>
          Users
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <GiPriceTag className="h-5 w-5" />
          </ListItemPrefix>
          Sales
        </ListItem>
        <ListItem onClick={()=>{
            dispatch(openStat(true))
            dispatch(openProducts(false))
            setAddProduct(false)
            }}>
          <ListItemPrefix>
            <Analytics  className="h-5 w-5" />
          </ListItemPrefix>
          Statistiques
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
