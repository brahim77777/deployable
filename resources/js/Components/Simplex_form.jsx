import { SignalIcon } from '@heroicons/react/24/solid';
import { Menu, Transition } from '@headlessui/react';
import React, { useEffect, Fragment ,useState} from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import axios from 'axios';

function Simplex_form({products}) {

    // useEffect(()=>{
    //     axios.get("/calculs").then((res)=>{
    //         console.log("getPros: ",res.data)
    //     })
    // },[])

    console.log("prod:",products)

    const [productRow,setProductRow] = useState([null])
    const addRow = () => {
        setProductRow([...productRow,

            <div key={productRow.length}
            className='p-2 border border-indigo-400 rounded-lg my-2'>
            <div class="sm:col-span-2">
          <label for="product" class="block text-sm font-medium text-gray-700"> Product </label>
          <div class="mt-1">
            <input type="text" name="product" id="product" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="profit" class="block text-sm font-medium text-gray-700"> Profit per Unit </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm"> $ </span>
            </div>
            <input type="number" name="profit" id="profit" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" aria-describedby="profit-currency"/>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm" id="profit-currency"> DH </span>
            </div>
          </div>
        </div>

        <div class="sm:col-span-2">
          <label for="cost" class="block text-sm font-medium text-gray-700"> Cost per Unit </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm"> $ </span>
            </div>
            <input type="number" name="cost" id="cost" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" aria-describedby="cost-currency"/>
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm" id="cost-currency"> DH </span>
            </div>
          </div>
        </div>
        </div>


        ])



      }


    const [selectedItem, setSelectedItem] = useState({"id":null,"title":""});
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const[decisionVars , setDecisionVars] = useState({"product_id":null,
                                                       "profit_unit":null,
                                                       "cost_unit":null,
                                                       "constraints":[null]})

  return (
    <div className=''>

<div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
    <div class="sm:mx-auto sm:w-full sm:max-w-md ">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Simplex Solver</h2>
      <p class="mt-2 text-center text-sm text-gray-600">Optimize profits and costs for your e-commerce clothing business.</p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
      <div class="bg-white py-8 px-4 border border-indigo-500 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Decision Variables</h3>
            <p class="mt-1 text-sm text-gray-500">Enter the products you want to optimize for.</p>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-2">
                <label for="product" class="block text-sm font-medium text-gray-700"> Product </label>
                <div class="mt-1">
                <Menu as="div" className="relative align-middle items-center   ">
        <div className=' '>
        <Menu.Button className={"flex items-center justify-between px-2 border   rounded w-full  border-zinc-300 p-1  space-x-8 h-10  "} >
        <div className="[word-spacing:5px] line-clamp-1 text-left">

                <span key={selectedItem.id} className="p-1 text-neutral-600 rounded-lg mx-1">{selectedItem.title}</span>
        </div>

            <div>
                <MdKeyboardArrowDown size={20} />
            </div>
            </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute max-h-[15rem] overflow-y-auto overflow-x-hidden   z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {/* {console.log("selectedItem: ", Items)}{console.log(Items)} */}
                  {products.data?.map((item,index)=>(
                    <Menu.Item key={index}>
                      {({ active }) => (
                               <button
                               onClick={(e) => {
                                e.preventDefault()
                                setSelectedItem({"id":item.id,"title":item.title});
                            }}
                               className={classNames(active ? 'bg-gray-100' : '', ' relative  px-4 py-2 text-sm text-gray-700 w-full text-start flex space-x-3 items-center')}
                             >
                              <div id={item.id} type="checkbox" >{item.title}</div>
                              <div className='bg-transparant w-full h-full absolute '></div>
                             </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
        </Transition>
        </Menu>
                  {/* <input type="text" name="product" id="product" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 py-2"/> */}
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="profit" class="block text-sm font-medium text-gray-700"> Profit per Unit </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm"> $ </span>
                  </div>
                  <input type="number" name="profit" id="profit" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 py-2" placeholder="0.00" aria-describedby="profit-currency"/>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm" id="profit-currency"> DH </span>
                  </div>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="cost" class="block text-sm font-medium text-gray-700"> Cost per Unit </label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm"> $ </span>
                  </div>
                  <input type="number" name="cost" id="cost" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 py-2" placeholder="0.00" aria-describedby="cost-currency"/>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm" id="cost-currency"> DH </span>
                  </div>
                </div>
              </div>

              <div class="sm:col-span-full text-right">
                <button onClick={addRow} type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="add-row">
                  Add Product
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Constraints</h3>
            <p class="mt-1 text-sm text-gray-500">Enter any additional constraints like labor hours, material availability, etc.</p>
            <div class="mt-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                  <div>
                    <label for="constraint" class="sr-only">Constraint</label>
                    <input id="constraint" name="constraint" type="text" placeholder="e.g. Labor Hours <= 500" className="focus:ring-indigo-500 focus:border-indigo-500 block w py-2 w-full pl-7 pr-2  sm:text-sm  rounded-md outline-none border border-gray-300 "/>
                  </div>
                </div>
                <div>
                  <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add Constraint
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-5">
            <div class="flex justify-end">
              <button type="button" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="solve">
                Solve
              </button>
            </div>
          </div>
        </form>
        <div className='mt-4'>
            {productRow}
        </div>
      </div>
    </div>
  </div>
  <p className=' font-serif text-lg border p-4  rounded-lg bg-gray-800 text-white mt-8 sm:mx-auto sm:w-full sm:max-w-4xl'>
    <span className='flex gap-2 items-center text-yellow-300'>Notice<SignalIcon className=' size-6'/></span>
    This is an example implementation of a simplex solver interface for an e-commerce clothing company. The user can add products by specifying the product name, profit per unit, and cost per unit. They can also add constraints like labor hours or material availability.

    Once the user has entered all the required information, they can click the "Solve" button to get the optimal solution using the simplex method. The solution will determine the quantities of each product to produce in order to maximize profits while satisfying the specified constraints.

    The interface is built using Tailwind CSS and includes interactive elements like input fields and buttons. You can customize the layout, styling, and functionality as per your requirements.

  </p>


    </div>
  );
}

export default Simplex_form;
