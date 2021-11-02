/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  Stack,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

import useDraw from 'hooks/useDraw'

export default function MainEventTab() {
  const { getSearchData, users, expectedUsersAmount, clearUsers } = useDraw()
  const [searchKey, setSearchKey] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    clearUsers()
    getSearchData(searchKey, { pageSize, pageNumber })
  }, [])

  const onSearch = (sKey) => {
    clearUsers()
    initializePageData()
    getSearchData(sKey, { pageSize, pageNumber })
  }

  const fetchNextData = () => {
    if (users.length !== expectedUsersAmount) {
      console.log(users.length, expectedUsersAmount)
      setPageSize(pageSize + 10)
      setPageNumber(pageNumber + 1)
      getSearchData(searchKey, { pageSize, pageNumber })
    }
  }

  const initializePageData = () => {
    setPageSize(10)
    setPageNumber(1)
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row">
        <TextField
          placeholder="Search..."
          variant="outlined"
          sx={{ width: '75%', color: 'black' }}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button
          sx={{ width: '25%', bgcolor: 'black', color: 'white' }}
          onClick={() => onSearch(searchKey)}
        >
          Search
        </Button>
      </Stack>
      <InfiniteScroll
        dataLength={pageSize}
        hasMore={users.length === expectedUsersAmount ? false : true}
        next={fetchNextData}
        height={800}
        loader={
          users.length === expectedUsersAmount ? (
            <h4>The end</h4>
          ) : (
            <h4>Loading...</h4>
          )
        }
      >
        <TableContainer id="">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Entries</TableCell>
                <TableCell>Tables</TableCell>
                <TableCell>Ticket Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users &&
                users.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.ticketAmount}</TableCell>
                    <TableCell>Views Table</TableCell>
                    <TableCell>
                      TBD OR {item.winAmount}L OR {item.loseAmount}W
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </InfiniteScroll>
    </Stack>
  )
}
