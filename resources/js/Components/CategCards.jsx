import { Delete } from '@mui/icons-material';
import React from 'react'
import { useState } from 'react';
import { Link } from '@inertiajs/react';

const CategCards = ({Categs}) => {



    const [focus, setFocus] = useState({state : false , target : -1});

    const onEnter = (index) => {
        setFocus({state : true, target : index});
    };
    const onLeave = (index) => {
        setFocus({state : false, target : -1});
    };
  return (
    <div className='mx-6'>
    <div className=' grid grid-cols-3 gap-4'>
       {
        Categs.map(e=>(
            <Link
            className='relative drop-shadow'
            href={"/products/category/"+e.title}
            onMouseEnter={() => onEnter(e.id)}
            onMouseLeave={() => onLeave(e.id)}>
                <div

                    key={e.id}
                    className={`${focus.state == true & focus.target != e.id &&` bg-gray-400 border-gray-200 duration-300  `} bg-opacity-5 flex cursor-pointer hover:scale-105 hover:border-gray-600  duration-200 ease-in-out relative w-full overflow-hidden items-start h-[7rem] justify-between border rounded-md p-4`}
                >
                    <span className=' font-serif  text-xl uppercase'>{e.title}</span>
                    <span className={` ${focus.state == true & focus.target == e.id &&` scale-125 rotate-12  ease-in-out `} ${focus.state == true & focus.target != e.id&&` blur-sm `} duration-300 font-bold opacity-10 rotate-6 top-0 right-0 -translate-y-16 absolute text-[11rem]`}>{e.id}</span>
                </div>
            </Link>
        ))
    }
    </div>

  </div>

  )
}

export default CategCards;
