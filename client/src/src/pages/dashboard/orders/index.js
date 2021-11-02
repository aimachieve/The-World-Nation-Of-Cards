/* eslint-disable */
// material
import React from 'react';
import { styled } from '@material-ui/core/styles'
// components
import Page from '../../../components/Page'

import { Container, Typography, Grid, Stack, Tabs, Tab, Box, List, ListItem, ListItemText, ListItemButton } from '@material-ui/core'

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import useAuth from "hooks/useAuth";

const RootStyle = styled(Page)({
  paddingTop: 176,
  paddingBottom: 88,
  height: '100%',
})

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}))

const columns = [
  {
    id: 'name',
    label: 'Purchase Data',
    minWidth: 170
  },
  {
    id: 'code',
    label: 'Event Time',
    minWidth: 100
  },
  {
    id: 'population',
    label: 'Quantity',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Result',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
];

export default function Orders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { logout } = useAuth();

  return (
    <RootStyle>
      <ContentStyle>
        <Container sx={{minHeight: '600px'}}>
          <Typography variant="h3" component="h1" paragraph sx={{textAlign: 'center', mt: 3}}>
            My Account
          </Typography>

          <Grid container>
            <Grid item md={3}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                  <ListItemButton component="a" href="/dashboard">
                    Dashboard
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/order">
                    Orders
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/addresses">
                    Addresses
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton component="a" href="/dashboard/account">
                    Account Details
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton onClick={logout}>
                    Logout
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={9}>
              <Grid container sx={{padding: '0 20px'}}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={10}>
                  <Typography variant="h5" paragraph sx={{textAlign: 'center'}}>
                    No order has been made yet.
                  </Typography>
                </Stack>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{boxShadow: 'none !important', color: 'white !important', border: '0 !important'}}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}
