/* eslint-disable */
import React from 'react'
// material
import {
  TableContainer,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
  Stack
} from '@material-ui/core'
// hooks
import useSettings from '../../../hooks/useSettings'
// components
import Page from '../../../components/Page'

// ----------------------------------------------------------------------

export default function PredictionTable() {
  const { themeStretch } = useSettings()
  const total_entries = 40000;
  const prediction_list = [];

  let winners;
  // const prediction = (total_entries) => {
  //   // if ( total_entries < 0 )
  //   //   return  ;
  //   // Quantity of rooms in current day
  //   const room_qty = Math.floor(total_entries / 20000);
  //   // Rest entries after rooms are filled.
  //   const rest_room_entries = total_entries % 20000;
  //   // Quantity of tables for rest of entries at next room 
  //   const table_qty = (rest_room_entries / 10);
  //   // Rest entries of last table
  //   const rest_table_entries = rest_entries % 10;

  //   if ( rest_table_entries >= 4 ) {
  //     // 2000: quantity of tables, 3: winners per table
  //     winners = room_qty * 2000 * 3 + table_qty * 3 + 3;
  //   } else {
  //     winners = room_qty * 2000 * 3 + table_qty * 3 + rest_table_entries;
  //   }

  //   // Save information of this room( current user and user of after draw)
  //   prediction_list.push({
  //     currentUser: total_entries,
  //     afterDraw: winners
  //   })

  //   prediction(winners)

  //   console.log(prediction_list)

  //   // prediction(winners);
  // }

  const prediction = (total_entries) => {
    if (winners <= 3) {
      
    }
    const winners = total_entries * (3 / 10)
    prediction(winners)
  }

  return (
    <>
      <Stack spacing={2} direction="row" sx={{mb: 2, justifyContent: 'right'}}>
        <Button variant="outlined" sx={{ color: '#fff',
                      '&:hover': { backgroundColor: '#29B2FE', color: '#fff' } }} > Ready </Button>
        <Button variant="contained" sx={{ backgroundColor: 'yellow', color: 'black',
        '&:hover': { backgroundColor: '#', color: '#fff' } }} > End </Button>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Day number</TableCell>
              <TableCell>Current user</TableCell>
              <TableCell>After draw</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Day 1</TableCell>
              <TableCell>40000</TableCell>
              <TableCell>12000</TableCell>
              <TableCell>
                <Button varient="contained" sx={{ backgroundColor: '#ff0032', color: '#fff',
                      '&:hover': { backgroundColor: '#29B2FE', color: '#fff' } }} > Start </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Day 2</TableCell>
              <TableCell>12000</TableCell>
              <TableCell>3600</TableCell>
              <TableCell>
                <Button varient="contained" sx={{ backgroundColor: '#ff0032', color: '#fff',
                      '&:hover': { backgroundColor: '#29B2FE', color: '#fff' } }} > Draw </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
