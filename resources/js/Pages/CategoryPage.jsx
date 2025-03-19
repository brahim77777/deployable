import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { BreadcrumbsWithIcon } from "@/Components/Breadcrumbs";
import NavLink from "@/Components/NavLink";
import AdvancedFilter from "../Components/sidebar_filters";
import Tooltip from "@/Components/Tooltip";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
import { Link, router } from "@inertiajs/react";
import { Breadcrumbs } from "@material-tailwind/react";

export default function CategoryPage({products}) {

    const [productsData, setProductsData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

console.log("category: ",products)
    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = (page = 1) => {

                setProductsData(products.data);
                setPageCount(products.meta.last_page); // Assuming 'last_page' is correct
                setCurrentPage(products.meta.current_page); // Set the current page

    };



    const handlePageClick = (data) => {
        console.log("data->"    ,data)
        setCurrentPage(data.selected + 1);
    };

    return (
        <div className="p-2">
            <div className="flex flex-col items-center">
                <div className="py-2 border-b w-[90vw] lg:w-[84.5vw]">
                    <div className="w-full mb-1">
                        <div className="border bg-gray-50 w-fit rounded-lg border-gray-400">
                        <Breadcrumbs>
                            <a href="#" className="opacity-60">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                >
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </a>
                            <Link href="/" className="opacity-60">
                                <span>Home</span>
                            </Link>
                            <Link href="/products">Products</Link>
                            <Link href="/products">{productsData[0]?.category || ""}</Link>
                        </Breadcrumbs>
                        </div>
                    </div>

                </div>
                <div className='m-auto mt-[3rem] gap-6 grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1' style={{ placeItems: 'center' }}>
                    {productsData?.map((e, index) => (
                        <Card
                            product={e}
                            index={index}
                            key={index}
                        />
                    ))}
                </div>
                {(products.meta.total > 20) &&
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    forcePage={currentPage - 1}
                    containerClassName="flex items-center justify-start space-x-2 mt-4"
                    pageClassName="border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                    activeClassName="bg-blue-500 text-white hover:text-black hover:bg-blue-200"
                    previousClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                    nextClassName="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md px-4 py-2"
                    breakClassName="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2"
                />}
            </div>
        </div>
    );
}
