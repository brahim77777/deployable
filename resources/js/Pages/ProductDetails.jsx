import { useState , useEffect } from "react"
import { Rating } from "@mui/material";
import { add } from "../redux/addToCartSlice";
import { useDispatch, useSelector } from 'react-redux'
import Carousel from "@/Components/Carousel";
import { TbMinus } from 'react-icons/tb'
import { TbPlus } from 'react-icons/tb'
import Modal from "../Components/ModalRiv"
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Toaster, toast } from 'sonner'

import { Link,router,useForm } from "@inertiajs/react";
import { FaDiagramSuccessor } from "react-icons/fa6";
// import { router } from '@inertiajs/react'


function RatioOfReview(productReviews) {
    let ratios = { one: 0, two: 0, three: 0, four: 0, five: 0 }; // Initialize ratios here
    productReviews.forEach((review) => {
        switch (review.rating) {
            case 1:
                ratios.one = ratios.one + 1;
                break;
            case 2:
                ratios.two = ratios.two + 1;
                break;
            case 3:
                ratios.three = ratios.three + 1;
                break;
            case 4:
                ratios.four = ratios.four + 1;
                break;
            case 5:
                ratios.five = ratios.five + 1;
                break;
            default:
                break;
        }
    });
    return ratios; // Return ratios object
}


export default function ProductDetails({product}){

    const [relatedProducts, setRelatedProducts] = useState([]);

    const colors = product.colors.split(",")
    const sizes = product.sizes.split(",")
    const cart = useSelector(state=>state.cart.value)
    const ratios = RatioOfReview(product.reviews);
    RatioOfReview(product.reviews)
    const dispatch = useDispatch()
    const[qnt,setQnt] = useState(1)
    const[size , setSize] = useState(product.sizes.split(",")[0])
    const[color , setColor] = useState(product.colors.split(",")[0])
    const [readAll,setReadAll] = useState(false)
    console.log("det:",product)
    console.log("cart data: ",cart)
    console.log("this is PRoductDeatils---> Product", product)
    console.log("sizes: ",product.sizes)

    useEffect(() => {
        axios.get(`/products/related/${product.id}`)
            .then(response => {
                setRelatedProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the related products!", error);
            });
    }, [product.id]);

    console.log("relatedProducts: ",relatedProducts)

    let arrImages = product.secondary_images.split(',')
    arrImages.unshift(product.main_image)
    const productImageR = useSelector((state)=>state.productImage.value)
    const [productImage,setProductImage] = useState('/storage/'+arrImages[1])
    useEffect(()=>{
        setProductImage(productImageR)
    },[productImageR])

    return(
        <div className="font-[sans-serif]  ">
            <Toaster  className="mt-[2.5rem] -mr-[4rem]" toastOptions={{
    unstyled: true,
    classNames: {
      toast: 'bg-green-400 flex items-center p-2 gap-2 rounded',
      title: 'text-white',
      icon:' text-white',

    },
  }} position="top-right"   />

      <div class="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">

        <div class="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div class="lg:col-span-3 w-full lg:sticky top-0 text-center">
            <div class=" relative h-[85vh] m-auto  shadow  ">
              <img   src={productImage || '/storage/'+arrImages[0]}
                alt="Product"
                className=" z-10 duration-300 ease-in-out absolute top-0 left-0 object-cover hover:object-contain w-full h-full" />
                <div className="  relative overflow-hidden  h-full">
              {/* <img src={product.secondary_images} alt="Product"
               className="blur-md z-0 scale-110   object-cover hover:object-contain h-full w-full" /> */}
                </div>
            </div>
            {product.secondary_images.split(',').length > 0&&<div className="Parent mt-1 flex items-center relative h-[8rem]   " >
            <Carousel secondary_images={arrImages}/>
            </div>}
          </div>
          <div class="lg:col-span-2">
            <h2 class="text-2xl font-extrabold ">{product.title} | {product.category.title}</h2>
            <div class="flex flex-wrap gap-4 mt-4">
              <p class="  text-xl font-bold">{product.price} MAD</p>
            </div>
            <div className="flex items-center space-x-1 mb-4">
            <Rating defaultValue={product.rating} readOnly/>
            <span className=" text-sm">({product.reviews.length} reviews)</span>
            </div>
{/*---------COUNTER ---------------------------------------------------------------------- */}
            <div>
              <div className=' flex items-center space-x-3 border border-neutral-400 rounded-md w-fit'>
                <button
                className='border flex items-center justify-center hover:bg-neutral-100 border-r-neutral-400 rounded-md w-8 h-7 '
                  aria-label="Increment value"
                  onClick={() => setQnt(qnt+1)}
                >
                  <TbPlus/>
                </button>
                <span>{qnt}</span>
                <button
                className='border flex items-center justify-center hover:bg-neutral-100 border-l-neutral-400 rounded-md w-8 h-7 '
                  aria-label="Decrement value"
                  onClick={() => setQnt((qnt === 0) ?qnt:qnt-1)}
                >
                  <TbMinus/>
                </button>
              </div>
            </div>
            {/* <Counter/> */}
            {/*MAIN ACTION BUTTONS*/}
            <div class="flex flex-wrap gap-4 mt-2 ">
              <button onClick={
                ()=>{
                  dispatch(add(
                        {
                            'id':product.id,
                            'title' : product.title,
                            'category_id':product.category,
                            'main_image':product.main_image,
                            'description':product.description,
                            'color':color,
                            'size':size,
                            'price':product.price,
                            'rating':product.rating,
                            'slug':product.slug,
                            'quantity':qnt,
                          }
                    ))
                    router.visit("/check_out")

                }


              } type="button" class="min-w-[200px] px-4 py-3 bg-[#b38962] text-white hover:bg-[#a77343]  text-sm font-bold rounded">Buy now</button>
              <button onClick={()=>{
                dispatch(add(
                    {
                        'id':product.id,
                        'title' : product.title,
                        'category_id':product.category,
                        'main_image':product.main_image,
                        'description':product.description,
                        'color':color,
                        'size':size,
                        'price':product.price,
                        'rating':product.rating,
                        'slug':product.slug,
                        'quantity':qnt,
                      }
                ))
                toast.success('added to cart successfully!',{
                    className: 'my-classname',
                    // description: 'My description',
                    duration: 1000,
                    // icon: <MyIcon />,
                  })
            }
            } type="button" class="min-w-[200px] px-4 py-2.5 border border-neutral-300 bg-transparent text-yellow-30 text-sm font-bold rounded">Add to cart</button>
              {/* <button type="button" class="min-w-[200px] px-4 py-3 border border-neutral-300  bg-transparent  text-sm font-bold rounded">Submit your riview</button> */}
              <Modal slug={product.slug} />
            </div>
            {/* ABOUT PRODUCT */}
            <div class="mt-8">
              <h3 class="text-lg font-bold text-yellow-30">About the Product</h3>
              <ul  class="space-y-3 list-disc mt-4 pl-4 text-sm ">
                <li>{product.description}</li>
              </ul>
            </div>
            <div class="mt-8 flex gap-2 items-center">
            Available product sizes { sizes.map((e,index)=>
                <button onClick={()=>setSize(e)} className={`px-2 py-[2px] ${size == e ? `bg-blue-500 text-white`: `border-gray-500 text-gray-600 bg-gray-50 `} min-w-[2rem] rounded border`} key={index}>{e}</button>)}
            </div>
            <div class="mt-8 flex gap-2 items-center">
            Available product colors
                <div className='flex gap-2 flex-wrap'>
                {colors.map((e, index) => (
                    <button onClick={()=>setColor(e)} key={index} className={`p-2  ${color == e && `ring-[2px] `} ring-offset-1 ring-gray-500 shadow  size-6 rounded-full `} style={{ backgroundColor: e}}></button>
                ))}
            </div>
            </div>
            <div class="mt-8">
              <div class="mt-8">
                <h3 class="text-lg font-bold text-yellow-30">Reviews({product.reviews.length})</h3>
                <div class="space-y-3 mt-4">
                  <div class="flex items-center">
                    <p class="text-sm text-whit font-bold">5.0</p>
                    <svg class="w-5 fill-yellow-30 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-slate-200 rounded w-full h-2 ml-3">
                      <div style={{width: isNaN(Math.floor(ratios.five/product.reviews.length*100)) ? 0 : Math.floor(ratios.five/product.reviews.length*100) +'%'}} class={ "h-full rounded  bg-amber-400"}></div>
                    </div>
                    <p class="text-sm text-whit font-bold ml-3">{isNaN(Math.floor(ratios.five/product.reviews.length*100)) ? 0 : Math.floor(ratios.five/product.reviews.length*100) }%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-whit font-bold">4.0</p>
                    <svg class="w-5 fill-yellow-30 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-slate-200 rounded w-full h-2 ml-3">
                      <div style={{width: isNaN(Math.floor(ratios.four/product.reviews.length*100)) ? 0 : Math.floor(ratios.four/product.reviews.length*100) +'%'}} class={ " h-full rounded  bg-amber-400"} ></div>
                    </div>
                    <p class="text-sm text-whit font-bold ml-3">{isNaN(Math.floor(ratios.four/product.reviews.length*100)) ? 0 : Math.floor(ratios.four/product.reviews.length*100) }%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-whit font-bold">3.0</p>
                    <svg class="w-5 fill-yellow-30 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-slate-200 rounded w-full h-2 ml-3">
                      <div style={{width: isNaN(Math.floor(ratios.three/product.reviews.length*100)) ? 0 : Math.floor(ratios.three/product.reviews.length*100) +'%'}} class={ " h-full rounded  bg-amber-400"}></div>
                    </div>
                    <p class="text-sm text-whit font-bold ml-3">{isNaN(Math.floor(ratios.three/product.reviews.length*100)) ? 0 : Math.floor(ratios.three/product.reviews.length*100) }%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-whit font-bold">2.0</p>
                    <svg class="w-5 fill-yellow-30 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-slate-200 rounded w-full h-2 ml-3">
                      <div style={{width: isNaN(Math.floor(ratios.two/product.reviews.length*100)) ? 0 : Math.floor(ratios.two/product.reviews.length*100) +'%'}} class={ " h-full rounded  bg-amber-400"}></div>
                    </div>
                    <p class="text-sm text-whit font-bold ml-3">{isNaN(Math.floor(ratios.two/product.reviews.length*100)) ? 0 : Math.floor(ratios.two/product.reviews.length*100) }%</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm text-whit font-bold">1.0</p>
                    <svg class="w-5 fill-yellow-30 ml-1" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div class="bg-slate-200 rounded w-full h-2 ml-3">
                    <div style={{width: isNaN(Math.floor(ratios.one/product.reviews.length*100)) ? 0 : Math.floor(ratios.one/product.reviews.length*100) +'%'}} className={` h-full rounded bg-amber-400`}></div>
                    </div>
                    <p class="text-sm text-whit font-bold ml-3">{isNaN(Math.floor(ratios.one/product.reviews.length*100)) ? 0 : Math.floor(ratios.one/product.reviews.length*100) }%</p>
                  </div>
                </div>
              </div>


             { product.reviews.length > 0 ?
               readAll ?
                product.reviews?.map((e,index)=>
                    <div key={index} class="flex items-start mt-8">
                    <div class="ml-3">
                      <h4 class="text-sm font-bold text-whit">{e.user_name}</h4>
                      <div class="flex items-center space-x-1 mt-1">
                        <Rating defaultValue={e.rating} size="small" readOnly/>
                        <p class="text-xs !ml-2 font-semibold text-whit">{formatDistanceToNow(parseISO(e.created_at))}</p>
                      </div>
                      <p class="text-xs mt-4 text-whit">{e.body}</p>
                    </div>
                  </div>
                )
                :
                <div class="flex items-start mt-8">
                <div class="ml-3">
                  <h4 class="text-sm font-bold text-whit">{product.reviews[0].user_name}</h4>
                  <div class="flex items-center space-x-1 mt-1">
                    <Rating defaultValue={product.reviews[0].rating} size="small" readOnly/>
                    <p class="text-xs !ml-2 font-semibold text-whit">{formatDistanceToNow(parseISO(product.reviews[0].created_at))}</p>
                  </div>
                  <p class="text-xs mt-4 text-whit">{product.reviews[0].body}</p>
                </div>
              </div>
              :
              <p class="text-xs mt-4 text-whit">No reviews yet</p>

             }
              <button onClick={()=>setReadAll(!readAll)} type="button" class="w-full mt-8 px-4 py-2 bg-transparent border-2 border-yellow-30 text-yellow-30 font-bold rounded">Read all reviews</button>
            </div>
          </div>
        </div>
            <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((relatedProduct) => (
                            <div key={relatedProduct.id} className="border border-neutral-400 rounded p-4 shadow-lg">
                                <img src={`/storage/${relatedProduct.main_image}`} alt={relatedProduct.title} className="w-full h-48 object-cover mb-2" />
                                <h3 className="text-lg font-bold">{relatedProduct.title}</h3>
                                <p className="text-sm">{relatedProduct.price} MAD</p>
                                <Link href={`/products/${relatedProduct.slug}`} className="text-blue-500 hover:underline">View Product</Link>
                            </div>
                        ))}
                    </div>
                </div>
      </div>
    </div>
    )
}
