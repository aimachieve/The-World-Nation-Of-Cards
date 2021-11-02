/* eslint-disable */
import React from 'react'
import { styled } from '@material-ui/core/styles'
import { Box, Grid, Container, Typography, Button, TextField } from '@material-ui/core';

import { MotionInView, varFadeInUp } from '../../components/animate';

import Banner from 'customComponents/Banner';
import SignUpCTA from 'customComponents/SignUpCTA';

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  background: 'url(/images/site-background.jpg)',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center'
}))

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center'
}))

const MainStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#000',
  color: '#fff',
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
}))


export default function ContactUs() {
  return (
    <RootStyle>
      <ContentStyle>
      {/* Banner */}
      <Banner />

      {/* Drop a message */}
        <Container maxWidth="lg">
          <MainStyle>
            <MotionInView variants={varFadeInUp}>
              <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular', fontSize: '20px' }}>
                DROP US A MESSAGE
              </Typography>
            </MotionInView>

            <Grid container>
              <Grid item xs={12} md={6}>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    fullWidth
                    autoComplete="first_name"
                    label="First Name"
                    sx={{mt: 3}}
                  />
                  <TextField
                    fullWidth
                    autoComplete="last_name"
                    label="Last Name"
                    sx={{mt: 3}}
                  />
                  <TextField
                    fullWidth
                    autoComplete="email"
                    type="email"
                    label="Email"
                    sx={{mt: 3}}
                  />
                  <TextField
                    fullWidth
                    autoComplete="subject"
                    label="Subject"
                    sx={{mt: 3}}
                  />
                  <TextField
                    fullWidth
                    multiline
                    autoComplete="message"
                    minRows='5'
                    label="Message"
                    sx={{mt: 3}}
                  />
                  <Button varient="contained" sx={{ backgroundColor: '#2FC656', color: '#fff', mt: 3, width: '30px',textAlign: 'left',
                   '&:hover': { backgroundColor: '#29B2FE', color: '#fff' } }}> SUBMIT </Button>
                </MotionInView>
              </Grid>
              <Grid item xs={12} md={6}>
                <img src='/images/contact_phone.png' alt="contact_phone" style={{margin: 'auto', width: 50}} />
                <Typography sx={{ mt: 2, mb: 3, fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular', fontSize: '5' }}>
                  1.800.555.5555
                </Typography>
                <img src='/images/contact_email.png' alt="contact_email" style={{margin: 'auto', width: 50}} />
                <Typography sx={{ mt: 2, mb: 3, fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular', fontSize: '5' }}>
                  johndoe@companyname.com
                </Typography>
                <img src='/images/placeholder-portfolio-items.jpg' alt="placeholder-portfolio-items" style={{margin: 'auto', width: 400, marginBottom: '10px'}} />
              </Grid>
            </Grid>
          </MainStyle>
        </Container>

      {/* Sign Up Now */}
      <SignUpCTA />

      </ContentStyle>
    </RootStyle>
  )
}
