/* eslint-disable */
// material
import { styled } from '@material-ui/core/styles'
// components
import Page from '../../../components/Page'

import { Container, Typography, Grid, Tabs, Tab, Box, List, ListItem, ListItemText, ListItemButton, TextField, Stack } from '@material-ui/core'

import { LoadingButton } from '@material-ui/lab';
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

export default function Account() {
  const { logout } = useAuth();

  return (
    <RootStyle>
      <ContentStyle>
        <Container>
          <Typography variant="h3" component="h1" paragraph sx={{textAlign: 'center', mt: 3}}>
            My Account
          </Typography>

          <Grid container>
            <Grid item xs={12} md={3}>
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
            <Grid item xs={12} md={9}>
              <Grid container sx={{padding: '0 20px'}}>
                <Grid item xs={12} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      Mobile Number
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Enter your first name"
                      sx={{marginTop: '10px !important'}}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      First Name <span style={{color: '#364e9b'}}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Enter your first name"
                      sx={{marginTop: '10px !important'}}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      Last Name <span style={{color: '#364e9b'}}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="current-password"
                      label="Enter your subject"
                      sx={{marginTop: '10px !important'}}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      Display Name <span style={{color: '#364e9b'}}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Enter your first name"
                      sx={{marginTop: '10px !important'}}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      Email Address <span style={{color: '#364e9b'}}>*</span>
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Enter your first name"
                      sx={{marginTop: '10px !important'}}
                    />
                    <Typography variant="h4" sx={{mt: 3, fontWeight: '300'}}>
                      Password Change
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      Current Password (leave blank to leave unchanged)
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Enter your first name"
                      sx={{marginTop: '10px !important'}}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      New Password (leave blank to leave unchanged)
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Enter your first name"
                      sx={{marginTop: '10px !important'}}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} sx={{mb: 2}}>
                  <Grid container sx={{padding: '0 20px'}}>
                    <Typography variant="h5" sx={{margin: 0, fontWeight: '300'}}>
                      Confirm new Password
                    </Typography>
                    <TextField
                      fullWidth
                      autoComplete="username"
                      label="Enter your first name"
                      sx={{marginTop: '10px !important'}}
                    />

                    <LoadingButton size="large" type="submit" variant="contained" sx={{ backgroundColor: '#2fc557', boxShadow: 'none', mt: 3 }}>
                      Save Change
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}
