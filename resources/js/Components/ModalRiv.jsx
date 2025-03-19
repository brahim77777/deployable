import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Link } from '@inertiajs/react'
import {router} from '@inertiajs/react'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  height : "50vh",
  padding: "1rem"
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

export default function BModal({slug}) {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [body,setBody] = React.useState("");
  const handleClose = () => setOpen(false);
  router.on('success', (event) => {
        // alert('sended successfuly')
  })
  router.on('error', (event) => {
    console.log(`Failed to make a visit to--------------------------------------909098098 `)
    console.log(event.detail.errors)
  })
  const sendRating = () => {
    let review = {body: body, rating: value, slug: slug}
    console.log(review)
    router.post('/rating', {
        review
    })


  }
  return (
    <div className=' '>
      {/* <button className='px-3 py-2 text-xs font-bold text-white uppercase bg-gray-500 rounded' onClick={handleOpen}>See More</button> */}
      <button onClick={handleOpen} type="button" class="min-w-[200px] px-4 py-3 border border-neutral-300  bg-transparent  text-sm font-bold rounded">Submit your riview</button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" className='pb-3 text-sky-600' component="h2">
            Give us your feedback!
          </Typography>
          <div className='flex space-x-6 '>
            <div>Rate this product</div>

            <Box
                sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                }}
                >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={1}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                    setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                )}
            </Box>
          </div>
          <div className='h-[65%]  mt-2 '>
            <textarea placeholder='What do you think about this product' onChange={(e)=>setBody(e.target.value)} className='p-2 w-full outline-none border h-full border-neutral-300 rounded-md' />
          </div>
          <div className='flex justify-end'>
          <ButtonGroup className='my-2' variant="outlined" aria-label="Basic button group">
            <Button onClick={handleClose}>canecl</Button>
            <Button onClick={sendRating} >Submit</Button>


          </ButtonGroup>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
