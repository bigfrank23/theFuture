import React, {useState} from 'react'
import { Box } from '@mui/material'
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import './emojiInput.css'
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import FilePicker from '../FilePicker';

const EmojiInput = ({className}) => {
    const [showEmoji, setShowEmoji] = useState(false)
    const [showPicker, setShowPicker] = useState(false)

  return (
    <>
      <Box sx={{position: 'relative'}} className={className}>
        <Box
          component="textarea"
          placeholder="What's on your mind?"
          className="inputClass"
          sx={{width: {xs: '100%', sm: '100%', md: '500px', lg: '500px'}}}
        />
        <Box>
          <div style={{position: 'absolute', zIndex: 1, left: '10px', top: '100px', display: 'flex', gap: '.5rem'}}>
            <SentimentSatisfiedAltIcon sx={{fill: '#5d8ffc', cursor: 'pointer'}} onClick={()=> setShowEmoji(!showEmoji)} />
            <AddPhotoAlternateIcon onClick={()=> setShowPicker(!showPicker)} sx={{fill: '#5d8ffc', cursor: 'pointer'}} />
            </div>
            {showPicker && <FilePicker/>}

            {showEmoji && 
            <Box className='animate-emoji'>
              <Picker data={data} onEmojiSelect={console.log} />
            </Box>
            }
        </Box>
      </Box>
    </>
  );
}

export default EmojiInput