import { UsersIcon } from '@heroicons/react/24/outline';
import { Delete, Save, SaveAlt } from '@mui/icons-material';
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
// import { Users } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import ReactPaginate from 'react-paginate';
import { HiUsers } from "react-icons/hi2";
import Dashboard from './Dashboard';
import { BsSave, BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import { GiSave } from 'react-icons/gi';
import { VscSave } from 'react-icons/vsc';
import { MdSave } from 'react-icons/md';

const Users = () => {
    const role = [
        { name: 'user' },
        { name: 'admin' }
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = (page = 1) => {
        axios.get(`/users?page=${page}`).then((res) => {
            // Initialize the selectedRole for each user
            const updatedUsers = res.data.users.map(user => ({
                ...user,
                selectedRole: role.find(r => r.name === user.role) || role[0]
            }));
            setUsers(updatedUsers);
            setPageCount(res.data.last_page); // Assuming 'last_page' represents the total pages
            setCurrentPage(res.data.current_page); // Set the current page
            console.log("Hello data: ", res.data);

        }).catch((error) => {
            console.error("Error fetching users:", error);
        });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handlePageClick = (data) => {
        fetchUsers(data.selected + 1);
    };

    const handleRoleChange = (userId, selectedRole) => {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, selectedRole } : user
            )
        );
    };
    const format = (date) => {
        return new Date(date).toLocaleString()
    }

    const [changeRole, setChangeRole] = useState(false);

    const [sortName ,setSortName] = useState({"order":"asc","target":"name"})
    const [sortEmail ,setSortEmail] = useState({"order":"asc","target":"email"})
    const [sortEmailV ,setSortEmailV] = useState({"order":"asc","target":"emailv"})
    const [sortLastUpdate ,setSortLastUpdate] = useState({"order":"asc","target":"lastUpdate"})

    const handelSort = (order , target) => {
        console.log("sort target:",target)
        console.log("sort order:",order)
    }

    useEffect(()=>{handelSort(sortEmail.order , sortEmail.target)},[sortEmail])
    useEffect(()=>{handelSort(sortEmailV.order , sortEmailV.target)},[sortEmailV])
    useEffect(()=>{handelSort(sortLastUpdate.order , sortLastUpdate.target)},[sortLastUpdate])
    useEffect(()=>{handelSort(sortName.order , sortName.target)},[sortName])
    return (
        <Dashboard>
            <div className='my-2 overflow-hidden bg-gray-50 font-semibold relative flex font-Nunito justify-between p-4 border rounded-lg text-[1.5rem]'>
                Users List
                <HiUsers className='absolute right-0 size-[9rem] opacity-10 -rotate-12 -translate-y-10' />
            </div>

            <div className="overflow-x-auto w-full mx-auto">
                <div className="inline-block min-w-full py-2 rounded-md">
                    <div className="overflow-hidden">
                        <table className="min-w-full bg-white rounded-md text-left text-sm  text-surface">
                            <thead className="border-b border-neutral-200 font-medium text-nowrap">
                                <tr>
                                    <th scope="col" className="px-6 py-4 pr-10">ID</th>
                                    <th scope="col" class="px-6 py-4 gap-4 flex justify-between items-center">
                                    <div className='flex gap-4 justify-between items-center'>
                                            Name
                                            <BsSortAlphaUp onClick={()=>setSortName({"order":"asc","target":sortName.target})} className={` ${ sortName.order == "asc" && `hidden`} size-8  rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                            <BsSortAlphaDown onClick={()=>setSortName({"order":"desc","target":sortName.target})} className={`${ sortName.order == "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                    <div className='flex gap-4 justify-between items-center'>
                                            Email
                                            <BsSortAlphaUp onClick={()=>setSortEmail({"order":"asc","target":sortEmail.target})} className={` ${ sortEmail.order == "asc" && `hidden`} size-8  rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                            <BsSortAlphaDown onClick={()=>setSortEmail({"order":"desc","target":sortEmail.target})} className={`${ sortEmail.order == "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-6 py-4">
                                    <div className='flex gap-4 justify-between items-center'>
                                    Email Verification At
                                            <BsSortAlphaUp onClick={()=>setSortEmailV({"order":"asc","target":sortEmailV.target})} className={` ${ sortEmailV.order == "asc" && `hidden`} size-8  rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                            <BsSortAlphaDown onClick={()=>setSortEmailV({"order":"desc","target":sortEmailV.target})} className={`${ sortEmailV.order == "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope="col" className="px-6 py-4">
                                    <div className='flex gap-4 justify-between items-center'>
                                    Last Update
                                            <BsSortAlphaUp onClick={()=>setSortLastUpdate({"order":"asc","target":sortLastUpdate.target})} className={` ${ sortLastUpdate.order == "asc" && `hidden`} size-8  rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                            <BsSortAlphaDown onClick={()=>setSortLastUpdate({"order":"desc","target":sortLastUpdate.target})} className={`${ sortLastUpdate.order == "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`}/>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="border-b relative border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
                                        <td className="whitespace-nowrap px-6 py-4">{user.id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{format(user.email_verified_at)}</td>
                                        {(changeRole) ?
                                            <td className="whitespace-nowrap px-6 py-4 ">
                                                {user.role}
                                            </td>
                                            :
                                            <td className="whitespace-nowrap px-6 py-4 ">
                                                <Listbox value={user.selectedRole} onChange={(selectedRole) => handleRoleChange(user.id, selectedRole)}>
                                                    {({ open }) => (
                                                        <>
                                                            <div className="relative ">
                                                                <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                                                    <span className="flex items-center">
                                                                        <span className="ml-3 block truncate h-full min-w-10 w-fit">{user.selectedRole.name}</span>
                                                                    </span>
                                                                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                                    </span>
                                                                </Listbox.Button>

                                                                <Transition
                                                                    show={open}
                                                                    as={Fragment}
                                                                    leave="transition ease-in duration-100"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <Listbox.Options className="absolute  z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                        {role.map((roleOption) => (
                                                                            <Listbox.Option
                                                                                key={roleOption.name}
                                                                                className={({ active }) =>
                                                                                    classNames(
                                                                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                                        'relative cursor-default select-none py-2 pl-3 pr-9 '
                                                                                    )
                                                                                }
                                                                                value={roleOption}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                        <div className="flex items-center">
                                                                                            <span
                                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate w-fit')}
                                                                                            >
                                                                                                {roleOption.name}
                                                                                            </span>
                                                                                        </div>

                                                                                        {selected ? (
                                                                                            <span
                                                                                                className={classNames(
                                                                                                    active ? 'text-white' : 'text-indigo-300',
                                                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                                                )}
                                                                                            >
                                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                            </span>
                                                                                        ) : null}
                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        ))}
                                                                    </Listbox.Options>
                                                                </Transition>
                                                            </div>
                                                        </>
                                                    )}
                                                </Listbox>
                                            </td>
                                        }
                                        <td className="whitespace-nowrap px-6 py-4">{format(user.updated_at)}</td>
                                        <td className="whitespace-nowrap px-6 py-4 flex items-center gap-2  justify-center pt-5">
                                            <button onClick={() => { }} className='flex justify-between items-center gap-1 p-1 rounded   bg-[#3caeff] text-white   hover:bg-sky-200 hover:text-sky-600'>
                                            Save<MdSave className=' size-4' />
                                            </button>
                                            <button onClick={() => {
                                                if (confirm("are you sure you want to delete this user ?"))
                                                    axios.delete("/users/" + user.email).then((res) => {
                                                        // alert(res.data.success ? "done!" : "Failed!")
                                                        fetchUsers()
                                                    })
                                            }} className='flex justify-between items-center gap-1 p-1 rounded bg-red-500 text-white border  hover:bg-red-200 hover:text-red-600'>
                                                Delete <RiDeleteBin6Line className='size-4' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <ReactPaginate
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName="flex items-center justify-start space-x-2 mt-4"
                            pageClassName="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                            activeClassName="bg-blue-500 text-white hover:text-black hover:bg-blue-200"
                            previousClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                            nextClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                            breakClassName="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}

export default Users;
