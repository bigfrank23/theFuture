import React, { useState } from 'react'
import { Box, Button } from '@mui/material'
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SendIcon from "@mui/icons-material/Send";

const ChatInput = () => {
    const [showEmoji, setShowEmoji] = useState(false);
  return (
    <>
      <Box sx={{position: 'relative'}}>
        <Box sx={{display: 'flex', gap: '5px'}}>
            <Box
            component="input"
            placeholder="Type Something..."
            className="chatInputClass"
            />
            <Button color='primary' variant='contained' size='small'><SendIcon/></Button>
        </Box>
        <Box>
          <div style={{position: 'absolute', zIndex: 1, left: '10px', top:'45px', display: 'flex', gap: '.5rem'}}>
            <SentimentSatisfiedAltIcon sx={{fill: '#5d8ffc', cursor: 'pointer'}} onClick={()=> setShowEmoji(!showEmoji)} />
            <AddPhotoAlternateIcon sx={{fill: '#5d8ffc', cursor: 'pointer'}} />
            </div>
            {showEmoji && 
            <Box className='animate-emoji' sx={{mt:3}}>
              <Picker data={data} onEmojiSelect={console.log} />
            </Box>
            }
        </Box>
      </Box>
    </>
  )
}

export default ChatInput