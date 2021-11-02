/* eslint-disable */
import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import plusFill from '@iconify/icons-eva/plus-fill'
import minusFill from '@iconify/icons-eva/minus-fill'
import { Box, Typography } from '@material-ui/core'
import { MIconButton } from '../components/@material-extend'

export default function Incrementer(props) {
  const { available } = props
  const [value, setValue] = useState(1)

  const incrementQuantity = () => {
    setValue(value + 1)
  }
  const decrementQuantity = () => {
    setValue(value - 1)
  }

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
        backgroundColor: 'black',
        color: 'white',
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block',
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  )
}
