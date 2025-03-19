import Carousel from "react-multi-carousel";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import { changeImage } from "@/redux/productImageSlice";
import { useSelector, useDispatch } from 'react-redux'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4
  }
};

export default function Carousel1({secondary_images}){
    // const [productImage, setProductImage] = useState(import.meta.env.VITE_APP_PRODUCT_IMAGE1)
    const dispatch = useDispatch()
    const productImage = useSelector((state)=>state.productImage.value)
    console.log('Product Image ===========================> ', secondary_images)

    return(

        <Carousel className="w-full z-0 " responsive={responsive}>
            {secondary_images.map((image)=>{
                return <div class="bg-gray-800   p-[2px] h-[8rem] w-[7rem] flex-none">
                    <img onClick={(e)=>{dispatch(changeImage(e.target.src));console.log(e.target.src)}} src={`/storage/${image}`} alt="Product1"
                class={`${(productImage === import.meta.env.VITE_APP_PRODUCT_IMAGE1)?` opacity-30`:` opacity-100`} object-cover size-full cursor-pointer `} />
                </div>
            })}



        </Carousel>
    )
}
