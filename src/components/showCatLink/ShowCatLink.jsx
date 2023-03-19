import React from 'react'
import { Box } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const ShowCatLink = ({onClick, showCatLink}) => {
  return (
    <>
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', position:'fixed', top: '4rem', left: 0, cursor: 'pointer'}}>
        {showCatLink ? (
          <ArrowDropUpIcon onClick={onClick}/>) : (
            <ArrowDropDownIcon onClick={onClick}/>
          )
      }
    </Box>
    </>
  )
}

export default ShowCatLink