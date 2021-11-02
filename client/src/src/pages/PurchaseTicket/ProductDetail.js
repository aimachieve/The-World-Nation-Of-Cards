/* eslint-disable */
import React, {useState} from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { styled } from '@material-ui/core/styles'
import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Button,
} from '@material-ui/core'
//
import {
  MotionInView,
  varFadeInLeft,
  varFadeInRight,
} from '../../components/animate'
import Incrementer from 'customComponents/Incrementer'

import useCart from "hooks/useCart";

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(14, 0),
}))

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
}))

// ----------------------------------------------------------------------

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart()

  const addtocart = () => {
    addToCart(quantity);
  }

  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <ContentStyle>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInRight}>
                <Stack spacing={3}>
                  <Box>
                    <Typography
                      variant="h3"
                      align="left"
                      sx={{
                        color: 'common.black',
                        textTransform: 'uppercase',
                      }}
                    >
                      Product title name
                    </Typography>
                    <Typography
                      align="left"
                      color="primary"
                      fontSize={36}
                      fontWeight={500}
                    >
                      $200
                    </Typography>
                  </Box>
                  <Typography align="left" variant="body2" color="common.black">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam eros arcu, malesuada auctor velit feugiat, dapibus
                    congue ligula. Etiam ipsum nisl, scelerisque ac nunc mollis,
                    ullamcorper rhoncus est. Vestibulum dapibus tortor turpis,
                    et
                  </Typography>
                  <Typography align="left" variant="body2" color="common.black">
                    Pretium odio eleifend et. Nam sit amet leo mi. Quisque
                    molestie nisi orci. Vestibulum lobortis mauris vitae
                    fringilla elementum. Mauris consectetur dapibus faucibus.
                  </Typography>
                  <Stack spacing={1}>
                    <Typography
                      align="left"
                      variant="body2"
                      color="common.black"
                    >
                      Retium odio eleifend et. Nam sit amet
                    </Typography>
                    <Typography
                      align="left"
                      variant="body2"
                      color="common.black"
                    >
                      Retium odio eleifend et. Nam sit amet
                    </Typography>
                    <Typography
                      align="left"
                      variant="body2"
                      color="common.black"
                    >
                      Retium odio eleifend et. Nam sit amet
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={4}
                  >
                    <Incrementer name="quantity" available={100} quantity={quantity} setQuantity={setQuantity} />
                    <Button
                      variant="contained"
                      size="large"
                      color="success"
                      sx={{ color: 'white', textTransform: 'uppercase' }}
                      onClick={addtocart}
                      // component={RouterLink}
                      // to="/purchaseTicket"
                    >
                      Add to cart
                    </Button>
                  </Stack>
                </Stack>
              </MotionInView>
            </Grid>

            <Grid item xs={12} md={6}>
              <MotionInView variants={varFadeInLeft}>
                <img
                  src="/images/placeholder-about-us-homepage.jpg"
                  alt="whoWeArePlaceholder"
                />
              </MotionInView>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  )
}
