/* eslint-disable */
import React from 'react'
// material
import { styled, useTheme } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  Card,
} from '@material-ui/core'
//
import {
  MotionInView,
  varFadeInUp,
  varFadeInDown,
  varFadeInLeft,
  varFadeInRight,
} from '../../components/animate'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
  backgroundColor: theme.palette.grey[900],
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  // marginBottom: theme.spacing(10),
  // [theme.breakpoints.up('md')]: {
  //   height: '100%',
  //   marginBottom: 0,
  //   textAlign: 'left',
  //   display: 'inline-flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  // },
}))

// ----------------------------------------------------------------------

export default function HowItWorks() {
  const theme = useTheme()
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <ContentStyle>
          <MotionInView variants={varFadeInUp}>
            <Stack direction="row" justifyContent="center">
              <img src="/images/logoWhite.png" alt="logo white" width="100" />
            </Stack>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Typography
              variant="h3"
              align="center"
              sx={{ mb: 1, color: 'common.white', textTransform: 'uppercase' }}
            >
              WHY CHOOSE US
            </Typography>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Typography
              align="center"
              sx={{ mb: 5 }}
              color="primary"
              variant="subtitle1"
            >
              Dummy text is also used to demonstrate the appearance <br />
              of different typefaces and layouts
            </Typography>
          </MotionInView>

          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInLeft}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <img
                      src="/images/about_section_title.png"
                      alt="placeholder"
                      width="50%"
                      style={{margin: 'auto'}}
                    />
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      section title
                    </Typography>
                    <Typography variant="body2" color="black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, scelerisque
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInUp}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: '#29B2FE',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <img
                      src="/images/about_section_title.png"
                      alt="placeholder"
                      width="50%"
                      style={{ margin: 'auto' }}
                    />
                    <Typography
                      variant="h4"
                      color="common.white"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      section title
                    </Typography>
                    <Typography variant="body2" color="common.white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, scelerisque
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
            <Grid item xs={12} md={4}>
              <MotionInView variants={varFadeInRight}>
                <Card
                  sx={{
                    padding: 2,
                    backgroundColor: 'common.white',
                    borderRadius: 0,
                  }}
                >
                  <Stack spacing={2}>
                    <img
                      src="/images/about_section_title.png"
                      alt="placeholder"
                      width="50%"
                      style={{margin: 'auto'}}
                    />
                    <Typography
                      variant="h4"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    >
                      section title
                    </Typography>
                    <Typography variant="body2" color="black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                      congue ligula. Etiam ipsum nisl, scelerisque
                    </Typography>
                  </Stack>
                </Card>
              </MotionInView>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
