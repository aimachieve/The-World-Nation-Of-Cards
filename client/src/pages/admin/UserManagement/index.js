/* eslint-disable */
import React, { useEffect, useState } from 'react'
// material
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  useTheme,
} from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroll-component'

// hooks
import useSettings from '../../../hooks/useSettings'
import useDraw from '../../../hooks/useDraw'
// components
import Page from '../../../components/Page'

// ----------------------------------------------------------------------

export default function UserManagement() {
  const theme = useTheme()
  const { themeStretch } = useSettings()
  const { getAllUsers, users, clearUsers, expectedUsersAmount } = useDraw()
  const [pageSize, setPageSize] = useState(20)
  const [pageNumber, setPageNumber] = useState(1)
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    getAllUsers({ pageSize, pageNumber })
    console.log(users)
  }, [])

  const onSearch = (sKey) => {
    clearUsers()
    initializePageData()
    // searchSatelliteUsersBySatelliteEventId(satelliteEventId, {
    //   pageSize,
    //   pageNumber,
    //   keyword: sKey,
    // })
  }

  const fetchNextData = () => {
    if (users.length !== expectedUsersAmount) {
      console.log(users.length, expectedUsersAmount)
      setPageSize(pageSize + 10)
      setPageNumber(pageNumber + 1)
      if (searchKey) {
        // searchSatelliteUsersBySatelliteEventId(satelliteEventId, {
        //   pageSize,
        //   pageNumber,
        //   keyword: searchKey,
        // })
      } else {
        getAllUsers({ pageSize, pageNumber })
      }
    }
  }

  const initializePageData = () => {
    setPageSize(10)
    setPageNumber(1)
  }
  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          User Management
        </Typography>
        <TableContainer sx={{ position: 'relative' }}>
          <InfiniteScroll
            dataLength={pageSize}
            hasMore={users.length === expectedUsersAmount ? false : true}
            next={fetchNextData}
            height={700}
            loader={
              users.length <= expectedUsersAmount ? (
                <></>
              ) : (
                <Typography variant="subtitle1" align="center" mt={1}>
                  Loading...
                </Typography>
              )
            }
          >
            <Table>
              <TableHead
                sx={{
                  position: 'sticky',
                  top: 0,
                  bgcolor: theme.palette.grey[900],
                  zIndex: 500,
                }}
              >
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((item, key) => (
                  <TableRow key={key}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {item.isVerified ? 'Verified' : 'Not verified'}
                    </TableCell>
                    <TableCell>
                      <Button variant="contained">Reset passowrd</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </InfiniteScroll>
        </TableContainer>
      </Container>
    </Page>
  )
}
