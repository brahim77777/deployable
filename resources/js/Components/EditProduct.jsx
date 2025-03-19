import CurrencyInput from 'react-currency-input-field';
import '../../css/app.css';

import { SketchPicker } from 'react-color';
// import Sketch from './Sketch';
import React, { useEffect, useState, useCallback,useRef } from 'react';
import { MdCategory, MdColorLens, MdPublish } from 'react-icons/md';
import { Cancel, ClearAll, Create, Publish } from '@mui/icons-material';
import { TbCategoryPlus, TbClearAll, TbDragDrop } from 'react-icons/tb';
import { useDropzone } from "react-dropzone";
// import Dropdown from 'DropDownT';
import Dropdown from './DropDownT';
import Modal from './Modal';
import ModalCat from "./ModalCat"
import { useDispatch, useSelector } from 'react-redux';
import { openProducts } from '@/redux/openProductsSlice';
import Categs from './Categs';
//file pond imports

import { useForm } from '@inertiajs/react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageEdit,
    FilePondPluginImageResize,
    FilePondPluginImageTransform,
    FilePondPluginFileValidateSize,
    FilePondPluginFileValidateType
);
export default function EditProduct({isInAddProduct,setAddProduct,dataToUpdate}){
    const dispatch = useDispatch()
    const[selectedSizes,setSelectedSizes] = useState(dataToUpdate?.sizes || [])
    const[categories, setCategories] = useState([])
    const [files, setFiles] = useState([]);
    const onDrop = useCallback((acceptedFiles) => {
        setFiles((prevFiles) => [
          ...prevFiles,
          ...acceptedFiles.map((file) => ({
            ...file,
            preview: URL.createObjectURL(file),
          })),
        ]);
      }, []);




    const [state, setState] = useState({
        displayColorPicker: false,
        color: {
          r: '255',
          g: '255',
          b: '255',
          a: '1',
        },
      });
      function hexToRgba(hex, alpha = 1) {
        hex = hex.replace(/^#/, '');

        if (hex.length === 3) {
            hex = hex.split('').map(char => char + char).join('');
        }

        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return {r: r,g: g,b: b,a: alpha}
    }

    const colorsArr = (str) =>{
      return str?.split("#")?.filter((e)=>e!="")
    }

    const colorsToUpdateTorgba = (arr) =>{
        arr = colorsArr(arr)
        let res = []
        arr?.map(e=>{
            res.push(hexToRgba(e))
        })
        return res
    }
      const [colors,setColors] = useState(colorsToUpdateTorgba(dataToUpdate.colors))
      console.log("colors: ",colors)
      console.log("colors: ",colorsToUpdateTorgba(dataToUpdate.colors))




      const handleClick = () => {
          setState({ ...state, displayColorPicker: !state.displayColorPicker });
          if (!colors.some(c => c === state.color)&&state.displayColorPicker) {
            handleClose()
          }
        };



        const handleClose = () => {
            setColors([...colors, state.color]);
        };

      const handleChange = (color) => {
        setState({ ...state, color: color.rgb });


      };


      const color = colors.map((e,index)=>(<div key={index}>
        <div style={{border: '1px solid #ccc',backgroundColor: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,borderRadius: '5px'}} className={`size-6`} >

        <div />
      </div>

      </div>))

        const [tags, setTags] = useState([]);
        const [inputValue, setInputValue] = useState('');

        const handleInputChange = (e) => {
            setInputValue(e.target.value);
        };

        const handleInputKeyPress = (e) => {
            if (e.key === 'Enter' && inputValue.trim() !== '') {
                setTags([...tags, inputValue.trim()]);
                setInputValue('');
            }
        };

        const handleTagRemove = (indexToRemove) => {
            setTags(tags.filter((_, index) => index !== indexToRemove));
        };
        const handleSizeSelection = (e) => {
            e.preventDefault()
            const size = e.currentTarget.value;
            setSelectedSizes((prevSizes) => {
                if (prevSizes?.includes(size)) {
                    return prevSizes?.filter((s) => s !== size);
                } else {
                    return [...prevSizes, size];
                }
            });
        };
    const toggleDarkMode = useSelector((state)=>state.changeTheme.value)

    const sideOpen = useSelector((state)=>state.sideBar.value)
    const [isMediumScreen, setIsMediumScreen] = useState(false);

    const refreshCategoriesState = useSelector(state=>state.refreshCategoriesState.value)
    console.log("RefreshCateg: ",refreshCategoriesState)
    useEffect(() => {
        axios.get('/categories').then((res)=>{
            setCategories(res.data.categories)
            console.log("categ data: ",res.data)

        },[])
      const checkScreenWidth = () => {
        setIsMediumScreen(window.innerWidth <= 768); // Assuming medium screen width is 768px or less
      };

      checkScreenWidth(); // Check on component mount

      const handleResize = () => {
        checkScreenWidth();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [refreshCategoriesState]);

    //-----------------------Post Process-----------------------------------

    const { data, setData, post, progress } = useForm({
        name: '',
        avatars: [],
    });

    const srcList = [];

    const handleFileProcess = (error, file) => {
        if (!error) {
            console.log('File processed:', file);
        }
    };

    const handleUpdateFiles = (fileItems) => {
        setData('avatars', fileItems.map(fileItem => fileItem.file));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        data.avatars.forEach((file, index) => {
            formData.append(`avatar_${index}`, file);
        });

        post('/dashboard', formData);
    };

    console.log("DTU",dataToUpdate)

    const handleFileRemove = (file) => {
        const index = srcList.findIndex(item => item.id === file.id);

        if (index !== -1) {
            srcList.splice(index, 1);
            document.getElementById('con').children[index].remove();
        }
        console.log(srcList);
    };
    return(
        <div className={`${(sideOpen && !isMediumScreen) ? 'lg:w-[calc(100vw-18.5rem)] w-[calc(100vw-18.5rem)]' : 'w-full'} duration-300 ease-in-out min-h-screen ${toggleDarkMode ? 'bg-neutral-700' : 'bg-neutral-100'} h-full p-4 ml-auto ${!isInAddProduct&&`hidden`}`}>
                <form onSubmit={handleFormSubmit}>
        <div className='w-full mb-2 flex justify-between '>
            <h1 className="text-[1.4rem] font-semibold mb-4">Add a New Product</h1>
            <div className='flex gap-2'>
                <button onClick={()=>{
                    dispatch(openProducts())
                    setAddProduct(!isInAddProduct)
                }} className=' py-2 pl-1 pr-2 border border-[#1C2434] h-fit rounded-md flex text-[#1C2434] items-center gap-1'><Cancel className='size-5 '/>Cancel</button>
                <button className=' py-2 pl-1 pr-2 bg-[#1C2434] h-fit rounded-md flex text-white items-center gap-1'><MdPublish className='size-5 '/>Publish</button>
            </div>
        </div>

        <div className=' '>

        <div className=' flex max-lg:flex-col left-full   gap-4 '>
           <div className='lg:w-[65%] w-full bg-white p-4 rounded-md'>
                    <h2 className="mb-2  text-lg">General Information</h2>
                <div className="grid grid-cols-3 max-md:grid-cols-2 gap-4 mb-4  flex-wrap ">
                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="pn">Product Name</label>
                            <input required name='name' id="pn" defaultValue={dataToUpdate ? dataToUpdate.title:``} className="p-2 border  border-neutral-300 rounded" type="text" placeholder="type cloth name"/>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label>Categories</label>
                            {console.log("categ [0]:",categories[0]?.title)}
                            <Dropdown Items={categories} />
                            {/* <Dropdown Items={categories}/> */}


                        </div>
                        <div className="flex flex-col justify-end gap-2 w-fit text-nowrap mb-[2.5px]">
                            {/* <button className="p-2 border border-neutral-300 rounded gap-2 flex items-center justify-between">Create Category<TbCategoryPlus/></button> */}
                            <ModalCat/>
                        </div>
                </div>

                <div className="flex flex-col gap-2">
                        <label>Descreption</label>
                        <textarea className="p-2 border  border-neutral-300 rounded" defaultValue={dataToUpdate ? dataToUpdate.description:``}  name="description" id="" cols={30} rows={5}/>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 mb-4">
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="sl">Sale Price</label>
                        <CurrencyInput id='sl' defaultValue={dataToUpdate ? dataToUpdate.price:``} placeholder='220DH' className="p-2 border border-neutral-300 rounded" suffix="DH"  />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="qn">Quantity </label>
                        <input id='qn' type='number' defaultValue={dataToUpdate ? dataToUpdate.quantity:``} placeholder='20' className="p-2 border border-neutral-300 rounded"   />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="dc">Discount</label>
                        <CurrencyInput id='dc' placeholder='20%' className="p-2 border border-neutral-300 rounded" suffix="%"  />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full mb-4">
                    <label htmlFor="sl">select size(s)</label>
                    <div className='flex gap-2'>
                        <button onClick={(e) => { handleSizeSelection(e) }} value="XS" className={`${selectedSizes?.includes("XS") ? `border-gray-800 text-black border-2`:`text-zinc-400 bg-gray-100 `}   p-1 border rounded min-w-8 text-center border-neutral-400`}>XS</button>
                        <button onClick={(e) => { handleSizeSelection(e) }} value="S" className={`${selectedSizes?.includes("S") ? `border-gray-800 text-black border-2`:`text-zinc-400 bg-gray-100 `}   p-1 border rounded min-w-8 text-center border-neutral-400`}>S</button>
                        <button onClick={(e) => { handleSizeSelection(e) }} value="M" className={`${selectedSizes?.includes("M") ? `border-gray-800 text-black border-2`:`text-zinc-400 bg-gray-100 `}   p-1 border rounded min-w-8 text-center border-neutral-400`}>M</button>
                        <button onClick={(e) => { handleSizeSelection(e) }} value="L" className={`${selectedSizes?.includes("L") ? `border-gray-800 text-black border-2`:`text-zinc-400 bg-gray-100 `}   p-1 border rounded min-w-8 text-center border-neutral-400`}>L</button>
                        <button onClick={(e) => { handleSizeSelection(e) }} value="XL" className={`${selectedSizes?.includes("XL") ? `border-gray-800 text-black border-2`:`text-zinc-400 bg-gray-100 `}   p-1 border rounded min-w-8 text-center border-neutral-400`}>XL</button>
                        <button onClick={(e) => { handleSizeSelection(e) }} value="XXL" className={`${selectedSizes?.includes("XXL") ? `border-gray-800 text-black border-2`:`text-zinc-400 bg-gray-100 `}   p-1 border rounded min-w-8 text-center border-neutral-400`}>XXL</button>
                        <button onClick={(e) => { handleSizeSelection(e) }} value="XXXL" className={`${selectedSizes?.includes("XXXL") ? `border-gray-800 text-black border-2`:`text-zinc-400 bg-gray-100 `}   p-1 border rounded min-w-8 text-center border-neutral-400`}>XXXL</button>
                    </div>

                </div>
                <div className="flex flex-col gap-2 w-full">
                    <div className='flex justify-between'>
                    <label htmlFor="sl">Add color(s)</label>
                    {colors.length!==0&&<div className='text-green-400 size-5'>{colors.length}</div>}
                    </div>

                    <div className='flex gap-2 duration-300 w-full z-10 flex-wrap' >
                        {color}
                       <div className='relative' >
                       <div className={`size-6 border cursor-pointer border-neutral-400 flex items-center  justify-center rounded bg-white`} onClick={handleClick}>
                            <MdColorLens/>
                        </div>

                        {state.displayColorPicker ? (
                            <div className='mt-2 absolute '>
                                <SketchPicker className=' static' color={state.color} onChange={handleChange} />
                            </div>
                        ) : null}
                       </div>
                       {(colors?.length !== 0)&&
                            <div onClick={()=>setColors([])} className={`size-6 border cursor-pointer border-neutral-400 flex items-center  justify-center rounded bg-white`} >
                                <TbClearAll/>
                            </div>}
                </div>


            </div>

        </div>
            <div className='lg:w-[35%] w-full bg-white p-4 rounded-md'>
                <div className="flex flex-col gap-2 ">
                    <label>Product Tags</label>
                    <div>
                        <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleInputKeyPress}
                        placeholder="Type and press Enter to add tags"
                        className="border border-gray-300 rounded mb-2 p-2 w-full focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex flex-wrap gap-2 mb-2">
                            {tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-200 px-2 py-1 rounded flex items-center"
                                >
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleTagRemove(index)}
                                        className="ml-1"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                <fieldset className="flex flex-col gap-2 borderl px-2 rounded-md  border-[#1C2434]k  ">
                    <legend className='mb-2 borderl border-[#1C2434]k rounded-full px-2k pb-0.5' >Product Images </legend>
{/*//////////////// Drag and Drop Part /////////////////////////////////////////////////*/}
                    <div>
                    <FilePond
                    files={data.avatars}
                    allowMultiple={true}
                    allowReorder
                    allowImageEdit={true}
                    onpreparefile={(file, output) => {
                        const img = document.createElement("img");
                        img.src = URL.createObjectURL(output);
                        img.className = "rounded-md ring shadow size-[8rem] object-cover hover:object-contain";
                        document.getElementById('con').appendChild(img);

                        const index = srcList.findIndex(item => item.id === file.id);

                        if (index !== -1) {
                            srcList.splice(index, 1);
                            document.getElementById('con').children[index].remove();
                        }

                        srcList.push({ src: img.src, id: file.id, time: Date.now() });
                        console.log(srcList);
                    }}
                    onupdatefiles={handleUpdateFiles}
                    onprocessfile={handleFileProcess}
                    onremovefile={handleFileRemove}
                    server={{
                        url: '/dashboard',
                        process: {
                            method: 'POST',
                            withCredentials: true,
                            headers: {
                                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                            },
                            onload: (response) => {
                                if (Array.isArray(response)) {
                                    setData('avatars', response);
                                } else {
                                    console.error('Unexpected response format:', response);
                                }
                            }
                        }
                    }}
                    acceptedFileTypes={['image/*']}
                    maxFileSize="5MB"
                    beforeRemoveFile={handleFileRemove}
                    labelIdle='Drag & Drop your picture or <span class="filepond--label-action">Browse</span>'
                    imageResizeTargetWidth={200}
                    imageResizeTargetHeight={144}
                    imageResizeUpscale={false}
                    imageResizeMode={"contain"}
                />
                {progress && (
                    <progress className='rounded' value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <div className='flex gap-6 flex-wrap mt-4' id='con'></div>                    </div>
{/*//////////////// Drag and Drop Part /////////////////////////////////////////////////*/}

                </fieldset>
            </div>
            </div>
        </div>
        </form>
    </div>
    )
}
