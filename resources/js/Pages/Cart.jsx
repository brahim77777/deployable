import { HeartIcon } from "@heroicons/react/24/outline";
import { Cancel, CancelOutlined, CancelSharp } from "@mui/icons-material";
import { GiCancel } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { updateQuantity } from "@/redux/addToCartSlice";

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ArrowRight } from "phosphor-react";
import { FcGoogle } from "react-icons/fc";
import { useSelector,useDispatch } from "react-redux";
import { Link } from "@inertiajs/react";
import { GoAlert } from "react-icons/go";

const quantity = [];
const maxQuantity = 13;

for (let i = 1; i <= maxQuantity; i++) {
    quantity.push({ name: i });
}



export default function Cart(){
    const cart = useSelector(state=>state.cart.value)
    let total = 0;
    let itemsTotal = 0;
    cart?.forEach((e) => total += e.quantity * parseFloat(e.price));
    cart?.forEach((e) => itemsTotal += e.quantity);
    const fraiLivr = 49;

    const dispatch = useDispatch()

    console.log("update cart: ",cart)


    return(
        <div className=" m-4 xl:mx-12">
         {
            cart.length ==0 ?
            <div className="h-screen w-full ">
                <div className="w-[80%] h-fit bg-neutral-50 m-auto mt-[10rem] p-6 border-rose-600 rounded-[1rem] shadow-lg border">
                <h1 className="text-3xl flex items-center justify-between font-bold">Your Cart is Empty! <GoAlert/></h1>
                <h2 className="">Please consider checking out our featured products! </h2>
                </div>

            </div>
            :
            <div>
                   <div className="py-4 m-2 ">
                <h1 className="mb-2 font-bold text-xl">YOUR BAG</h1>
                <div>TOTAL: ({itemsTotal} items) <sapn className="font-semibold">{total} DH</sapn></div>
                <p>Items in your bag are note reserved - check out now to make them yours.</p>
            </div>
            <div className="flex gap-8 justify-between  max-xl:flex-col">
            <div class="w-full">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow-md rounded-lg border">
                    <table
                    class="min-w-full text-left  text-sm  text-surface ">
                    <thead
                        class="border-b border-neutral-200 bg-white font-medium order">
                        <tr>
                        <th scope="col" class="px-6 py-4">Product</th>
                        <th scope="col" class="px-6 py-4">Price</th>
                        <th scope="col" class="px-6 py-4">Quantity</th>
                        <th scope="col" class="px-6 py-4">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                                cart.map((product, index) =>(
                        <tr
                        class="border-b border-neutral-200 ">
                        <td class="whitespace-nowrap px-6 hover:overflow-visible overflow-clip py-4 min-w-[15rem] font-medium">
                            <div className="flex items-center gap-2"><img className=" sm:size-48 rounded border border-neutral-400 shadow-md " src={"/storage/"+product.main_image}/>
                            <div className=" z-0 bg-white ">{product.description}</div></div>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">{product.price} DH</td>
                        <td class="whitespace-nowrap px-6 py-4"><input max={13} min={1} onChange={(e)=>dispatch(updateQuantity([product.slug,parseInt(e.target.value)]))} className="w-fit max-w-[3.5rem] border-neutral-300 border p-2 rounded outline-none" value={product.quantity} type="number"/></td>
                        <td class="whitespace-nowrap px-6 py-4">{product.quantity * parseFloat(product.price)} DH</td>
                        </tr>

            ))
            }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>

            <div className="max-lg:mt-10 mt-2 min-w-[25vw] h-full z-40 right-8 xl-w-[20vw] sticky">
                            <div className="bg-white p-8 rounded-lg shadow-lg border border-rose-400">
                                <h2 className="text-2xl font-bold mb-2">Votre commande</h2>
                                <div className='my-2'>
                                    <div className='bg-gray-300 rounded-sm h-[2px]' />
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center m-auto">
                                        <div>Produit</div>
                                        <div>Sous-total</div>
                                    </div>
                                    {cart.map((product, index) =>
                                        <div key={index} className="flex justify-between">
                                            <div><span className='text-gray-500'>(×{product.quantity})</span> {product.title}</div>
                                            <div>{product.price * product.quantity} DH</div>
                                        </div>
                                    )}
                                    <div className='my-2'>
                                        <div className='bg-gray-300 rounded-sm h-[2px]' />
                                    </div>

                                    <div className="flex justify-between font-semibold">
                                        <div>Total</div>
                                        <div>{total} DH</div>
                                    </div>

                                    <Link href="/check_out" as="button" className={`w-full mt-6 py-3  bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}>valider la commande</Link>
                                </div>
                            </div>
                        </div>

            </div>

            </div>
         }

        </div>
    )
}
