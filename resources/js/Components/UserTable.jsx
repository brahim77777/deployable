import { UsersIcon } from '@heroicons/react/24/outline';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { Users } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbEdit } from 'react-icons/tb';
import ReactPaginate from 'react-paginate';
import { HiUsers } from "react-icons/hi2";

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    const fetchUsers = (page = 1) => {
        axios.get(`/users?page=${page}`).then((res) => {
            setUsers(res.data.users);
            setPageCount(res.data.last_page); // Assuming 'last_page' represents the total pages
            setCurrentPage(res.data.current_page); // Set the current page
            console.log("Hello data: ",res.data)
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

    return (
        <div>
            <div className='my-2 overflow-hidden bg-gray-50 font-semibold relative flex font-Nunito justify-between p-4 border rounded-lg text-[1.5rem]'>
                Users List
                <HiUsers className='absolute right-0 size-[9rem] opacity-10 -rotate-12 -translate-y-10' />
            </div>
            <div className="overflow-x-auto w-full mx-auto">
                <div className="inline-block min-w-full py-2 rounded-md">
                    <div className="overflow-hidden">
                        <table className="min-w-full bg-white rounded-md text-left text-sm font-light text-surface">
                            <thead className="border-b border-neutral-200 font-medium text-nowrap">
                                <tr>
                                    <th scope="col" className="px-6 py-4 pr-10">ID</th>
                                    <th scope="col" className="px-6 py-4">Name</th>
                                    <th scope="col" className="px-6 py-4">Email</th>
                                    <th scope="col" className="px-6 py-4">Email Verification At</th>
                                    <th scope="col" className="px-6 py-4">Role</th>
                                    <th scope="col" className="px-6 py-4">Last Update</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((e, index) => (
                                    <tr key={index} className="border-b relative border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
                                        <td className="whitespace-nowrap px-6 py-4">{e.id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{e.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{e.email}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{e.email_verified_at}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{e.role}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{e.updated_at}</td>
                                        <td className="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                                            <button onClick={() => {}} className='flex justify-between items-center gap-1 p-1 rounded bg-green-50 border border-green-500 text-green-500 hover:bg-green-200 hover:text-green-600'>
                                                <TbEdit /> Edit
                                            </button>
                                            <button onClick={() => {
                                                if(confirm("are you sure you want to delete this user ?"))
                                                    axios.delete("/users/"+e.email).then((res)=>{
                                                        alert(res.data.success? "done!" : "Failed!")
                                                        fetchUsers()
                                                    })
                                            }} className='flex justify-between items-center gap-1 p-1 rounded bg-red-50 border border-red-500 text-red-500 hover:bg-red-200 hover:text-red-600'>
                                                Delete <RiDeleteBin6Line />
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
        </div>
    );
}

export default UserTable;
