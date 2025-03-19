import { useState } from "react";
import { GoHeartFill } from "react-icons/go";
import CurrencyInput from "react-currency-input-field";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@inertiajs/react";

function Favorite() {
    const favorite = useSelector(state=>state.favorite.value)

    const [focus, setFocus] = useState({state : false , target : -1});

    const onEnter = (index) => {
        setFocus({state : true, target : index});
    };
    const onLeave = (index) => {
        setFocus({state : false, target : -1});
    };

    return (
        <div className=" min-h-screen bg-gray-50 z-0">
            <div className="sm:p-12 p-4 space-y-4  ">
                <div className="">
                    <h1 className="font-bold text-3xl">MY WISHLIST</h1>
                    <div className="text-gray-900 ">{favorite.length} Items</div>
                </div>
                {favorite.length > 0 ?
                <div className='m-auto mt-[3rem] gap-6 grid  grid-cols-5  max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1' style={{ placeItems: 'center' }}>
                    {favorite.map((e, index) => (
                        <div
                            onMouseEnter={() => onEnter(index)}
                            onMouseLeave={() => onLeave(index)}
                            // onClick={() => onEnter(index)}
                            key={index}
                            className="relative shadow-lg bg-white"
                            >
                            <div className=" absolute w-full z-30  end-0 justify-end flex  m-[.71rem] ">
                                <GoHeartFill className="stroke-2 fill-black stroke-black"/>
                            </div>
                            <div className={`  border border-gray-600 ${(focus.state)?((focus.target === index)?` z-405 bg-white scale-105 ring `:` -z-50`):``} duration-300   `}>

                                <img className="min-size-48 size-60 min-w-[12rem]" src={`/storage/${e?.main_image}`} alt="Item" />
                                <div className="m-2 h-fit">
                                    <h1>{e.title}</h1>
                                    <h2>{e.category}</h2>
                                </div>
                            </div>
                        </div>
                    ))
                  }
                </div>
                :
                <div className=" relative z-10">
                <div className="w-screen pt-12 text-6xl items-center z-50 font-serif flex flex-col gap-4  translate-y-12 font-bold text-center">Nothing to show!
                <Link href="/" className="text-lg font-medium p-4 border py-2 w-fit z-50 shadow-lg rounded-full cursor-pointer hover:bg-black hover:text-white ">Go Home</Link></div>

                <div className="w-screen -z-10 absolute  text-[30rem] font-serif text-gray-600 -translate-y-[16rem]  text-nowrap -translate-x-[5rem] opacity-5  font-bold text-center">Nothing to show!</div>
                </div>
                }
            </div>

        </div>
    );
}

export default Favorite;
