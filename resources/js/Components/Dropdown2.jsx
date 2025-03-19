import React ,{useState, useEffect} from "react";

import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Link} from '@inertiajs/react';
import { useSelector, useDispatch } from "react-redux";


import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,

} from "@heroicons/react/24/solid";
import { UserIcon } from '@heroicons/react/24/outline';
import { TbLogin as Login } from "react-icons/tb";
import { setAuth } from "@/redux/authSlice";


function ProfileMenu({toggleDarkMode}) {
    const auth = useSelector((state)=>state.auth.value)
    const dispatch = useDispatch()
    console.log("Auth obj: ",auth)
    // profile menu component
const [profileMenuItems, setProfileMenuItems] = useState([]);

  useEffect(() => {
    (auth.user == null) ?
      setProfileMenuItems( [
        {
          label: "Login",
          icon: Login,
          href: route("login"),
        //   func : ()=>dispatch(setAuth(useSelector((state)=>state.auth.value))),
          method: "get",
        },
        {
          label: "Sign up",
          icon: Login,
          href: route("register"),
          method: "get",
        },
      ])
      :
      setProfileMenuItems( [
            {
              label: "Profile",
              icon: UserCircleIcon,
              href: route("profile.edit"),
              method: "get",
            },
            {
                label: "Sign Out",
                icon: PowerIcon,
                href: route("logout"),
                func : ()=>dispatch(setAuth({user:null})),
                method: "post",
            },

      ])


    if(auth?.user?.role == "admin"){
      setProfileMenuItems((prevMenuItems) => [

        {
          label: "Dashboard",
          icon: Cog6ToothIcon,
          href: route("dashboard"),
          method: "get",
        },
        ...prevMenuItems,
      ]);
    }

  }, [auth]);

  console.log("Auth ogb: ",auth)

    console.log("DroPDown.jsx")
    console.log(profileMenuItems)

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu  open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">

      <MenuHandler>
      <button className=" bg-[#0095FB]f border p-2 font-light  rounded-full ">

            <UserIcon className={"max-sm:size-3 size-5"} />
        </button>
      </MenuHandler>

      <MenuList className={`p-2   gap-2 DropDown  ${(toggleDarkMode) ? ` bg-zinc-700 text-white`:`bg-white`}`}>
        {profileMenuItems.map(({ label, icon ,href, method,func }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Link href={href} onClick={func} method={method} key={label}>
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10 "
                  : " hover:bg-gray-100 "
              }`}
            >
              {React.createElement(icon, {
                className: `size-5  ${isLastItem ? "text-red-500 " : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal text-lg"
                color={isLastItem ? "red" : "inherit"}
              >
                <p>{label}</p>
              </Typography>
            </MenuItem></Link>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function UserDropDown({toggleDarkMode}) {

  return (
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <ProfileMenu toggleDarkMode={toggleDarkMode} />
      </div>
  );
}
