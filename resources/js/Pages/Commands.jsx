import { HiUsers } from "react-icons/hi2";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { BsSortAlphaDown, BsSortAlphaUp } from 'react-icons/bs';
import Dashboard from './Dashboard';
import { Link } from '@inertiajs/react';
import { ShoppingBag } from "@mui/icons-material";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const Commands = () => {
    const [commands, setCommands] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchCommands = (page = 1) => {
        axios.get(`/api/commands?page=${page}`)
            .then((res) => {
                console.log("commands: ",res.data.commands.data)
                setCommands(res.data.commands.data);
                setPageCount(res.data.commands.last_page); // Assuming 'last_page' is correct
                setCurrentPage(res.data.commands.current_page); // Set the current page
            })
            .catch((error) => {
                console.error("Error fetching commands:", error);
            });
    };

    useEffect(() => {
        fetchCommands();
    }, []);

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
        fetchCommands(selectedPage);
    };

    const format = (date) => {
        return new Date(date).toLocaleString();
    };

    const [sortName, setSortName] = useState({ order: "asc", target: "name" });
    const [sortEmail, setSortEmail] = useState({ order: "asc", target: "email" });
    const [sortEmailV, setSortEmailV] = useState({ order: "asc", target: "emailv" });
    const [sortLastUpdate, setSortLastUpdate] = useState({ order: "asc", target: "lastUpdate" });

    const handleSort = (order, target) => {
        console.log("sort target:", target);
        console.log("sort order:", order);
        // Implement your sorting logic here
    };

    useEffect(() => { handleSort(sortEmail.order, sortEmail.target); }, [sortEmail]);
    useEffect(() => { handleSort(sortEmailV.order, sortEmailV.target); }, [sortEmailV]);
    useEffect(() => { handleSort(sortLastUpdate.order, sortLastUpdate.target); }, [sortLastUpdate]);
    useEffect(() => { handleSort(sortName.order, sortName.target); }, [sortName]);

    return (
        <Dashboard>
            <div className='my-2 overflow-hidden bg-gray-50 font-semibold relative flex font-Nunito justify-between p-4 border rounded-lg text-[1.5rem]'>
                Commands List
                <ShoppingBagIcon className='absolute right-5 md:right-10 size-[9rem] opacity-10 -rotate-12 -translate-y-10' />
            </div>

            <div className="overflow-x-auto w-full mx-auto  shadow-lg">
                <div className="inline-block min-w-full py-2 rounded-md">
                    <div className="overflow-hidden">
                        <table className="min-w-full border  bg-white rounded-md text-left text-sm text-surface">
                            <thead className="border-b border-neutral-200 font-medium text-nowrap">
                                <tr>
                                    <th scope="col" className="px-6 py-4 pr-10">ID</th>
                                    <th scope="col" className="px-6 py-4 gap-4 flex justify-between items-center">
                                        <div className='flex gap-4 justify-between items-center'>
                                            Full Name
                                            <BsSortAlphaUp onClick={() => setSortName({ order: "asc", target: sortName.target })} className={`${sortName.order === "asc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                            <BsSortAlphaDown onClick={() => setSortName({ order: "desc", target: sortName.target })} className={`${sortName.order === "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        <div className='flex gap-4 justify-between items-center'>
                                            City
                                            <BsSortAlphaUp onClick={() => setSortEmail({ order: "asc", target: sortEmail.target })} className={`${sortEmail.order === "asc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                            <BsSortAlphaDown onClick={() => setSortEmail({ order: "desc", target: sortEmail.target })} className={`${sortEmail.order === "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        <div className='flex gap-4 justify-between items-center'>
                                            Status
                                            <BsSortAlphaUp onClick={() => setSortEmailV({ order: "asc", target: sortEmailV.target })} className={`${sortEmailV.order === "asc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                            <BsSortAlphaDown onClick={() => setSortEmailV({ order: "desc", target: sortEmailV.target })} className={`${sortEmailV.order === "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        <div className='flex gap-4 justify-between items-center'>
                                            CIN
                                            <BsSortAlphaUp onClick={() => setSortLastUpdate({ order: "asc", target: sortLastUpdate.target })} className={`${sortLastUpdate.order === "asc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                            <BsSortAlphaDown onClick={() => setSortLastUpdate({ order: "desc", target: sortLastUpdate.target })} className={`${sortLastUpdate.order === "desc" && `hidden`} size-8 rounded-full hover:border cursor-pointer duration-100 hover:bg-gray-50 p-1`} />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-4">Phone Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {commands.map((command, index) => (
                                    <tr key={index} className="border-b relative border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
                                        <td className="whitespace-nowrap px-6 py-4">{command.id}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{command.first_name} {command.last_name}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{command.city}</td>
                                        <td className={`whitespace-nowrap px-6 py-4 ${command.status==`paid`? `text-green-500`: command.status==`pending`? `text-amber-600`:command.status==`verified`? `text-indigo-600`:command.status==`failed`? `text-red-500` : command.status==`canceld`? `text-gray-600`:``}`}>{command.status}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{command.cin}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{command.phone}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link href={`command/${command.id}`} className='text-white bg-neutral-950/80 p-2 rounded'>View more details</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div  className="mx-2">
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
        </Dashboard>
    );
}

export default Commands;
