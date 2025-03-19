import { Delete } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbEdit, TbCategory2, TbTruckLoading } from 'react-icons/tb';
import { VscLoading } from 'react-icons/vsc';
import ReactPaginate from 'react-paginate';

const CategTable = () => {
    const [categories, setCategories] = useState([]);
    const [totalCategories, setTotalCategories] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const categoriesPerPage = 10;
    const [itemOffset, setItemOffset] = useState(0);

    const fetchCategories = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`/categories`);
            const { categories, total } = res.data;
            setCategories(categories);
            setTotalCategories(total);
            setCurrentPage(page);
            console.log("here all Categs:", res.data);
        } catch (error) {
            setError("Error fetching categories");
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories(currentPage);
    }, [currentPage]);

    const endOffset = itemOffset + categoriesPerPage;
    const currentItems = categories.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(totalCategories / categoriesPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * categoriesPerPage) % totalCategories;
        setItemOffset(newOffset);
        setCurrentPage(event.selected + 1);
    };

    return (
        <div>
            <div className='my-2 overflow-hidden bg-gray-50 font-semibold relative flex font-Nunito justify-between p-4 border rounded-lg text-[1.5rem]'>
                Categories List
                <TbCategory2 className='absolute right-10 size-[8rem] opacity-15 -rotate-6 -translate-y-10' />
            </div>
            <div className="overflow-x-auto w-full mx-auto">
                <div className="inline-block min-w-full py-2 rounded-md">
                    <div className="overflow-hidden">

                        {loading ? (
                            <div className="text-center p-4 w-full  flex justify-center"> <VscLoading className=' animate-spin size-7'/></div>
                        ) : error ? (
                            <div className="text-center p-4 text-red-500">{error}</div>
                        ) : (
                            <table className="min-w-full bg-white rounded-md text-left text-sm font-light text-surface">
                                <thead className="border-b border-neutral-200 font-medium text-nowrap">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 pr-10">ID</th>
                                        <th scope="col" className="px-6 py-4">Title</th>
                                        <th scope="col" className="px-6 py-4">Created At</th>
                                        <th scope="col" className="px-6 py-4">Last Update</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((e, index) => (
                                        <tr key={index} className="border-b relative border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100">
                                            <td className="whitespace-nowrap px-6 py-4">{e.id}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{e.title}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{e.created_at}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{e.updated_at}</td>
                                            <td className="whitespace-nowrap px-6 py-4 flex items-center gap-2">
                                                <button onClick={() => {}} className='flex justify-between items-center gap-1 p-1 rounded bg-green-50 border border-green-500 text-green-500 hover:bg-green-200 hover:text-green-600'>
                                                    <TbEdit /> Edit
                                                </button>
                                                <button onClick={() => {
                                                    if (confirm("are you sure you want to delete this category ?") )
                                                        axios.delete('/categories/'+e.title).then((res)=>{alert(res.data.success ? "done!":"Failed!")
                                                        fetchCategories()
                                                })
                                                }} className='flex justify-between items-center gap-1 p-1 rounded bg-red-50 border border-red-500 text-red-500 hover:bg-red-200 hover:text-red-600'>
                                                    Delete <RiDeleteBin6Line />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
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
};

export default CategTable;
