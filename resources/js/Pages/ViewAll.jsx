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

export default function ViewAll() {
    const products = useSelector(state=>state.products.value)
    console.log("here is products ::", products)
    const [productsData, setProductsData] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUrl, setCurrentUrl] = useState("/api/products?page=1");
    const [ViewFilter, setViewFilter] = useState("");
    const filtersR = useSelector(state=>state.filtersList.value)

    console.log("Filter Redux:",filtersR)
    useEffect(() => {
        (products )?setProductsData(products.products):fetchProducts(ViewFilter,currentPage);


    }, [currentPage,products]);
    useEffect(() => {
        fetchProducts();
    }, [])
    const fetchProducts = (ViewFilter,page = 1) => {
        router.cancel();
        let url = "/api/products?page=" + page;
        if (ViewFilter) {
            url = '/api/products/'+ViewFilter+'?page='+page
        }
        if(ViewFilter)
            setViewFilter(ViewFilter)
        else setViewFilter("")

        console.log("url", url)

        axios.get(url).then((res) => {
            setProductsData(res.data.products);
            setPageCount(res.data.last_page);
            setCurrentPage(res.data.current_page);
        }).catch((error) => {
            console.error("Error fetching products:", error);
        });
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
                            <BreadcrumbsWithIcon />
                        </div>
                    </div>
                    <h1 className="text-3xl italic">NEW CLOTHES</h1>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex gap-2">
                            <button onClick={()=>fetchProducts()}  className='inline-flex items-center px-1 pt-1 border-b-2 border-b-transparent text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-700 hover:border-b-gray-300 '>New Arrivals</button >
                            <button onClick={()=>fetchProducts('bestsellers', 1)}  className='inline-flex items-center px-1 pt-1 border-b-2 border-b-transparent text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-700 hover:border-b-gray-300 '>Best Sellers</button >
                            <button onClick={()=>fetchProducts('newest', 1)}  className='inline-flex items-center px-1 pt-1 border-b-2 border-b-transparent text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none text-gray-700 hover:border-b-gray-300 '>Newest</button >

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
                />
            </div>
        </div>
    );
}
