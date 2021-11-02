/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

import { CarouselBasic3 } from 'components/carousel'
import UserList from './UserList'
import TicketTable from './TicketTable'
import useDraw from 'hooks/useDraw'
import { MotionInView, varFadeInUp } from '../../components/animate'
import DaysAccordion from './DaysAccordions'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[900],
}))

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.grey[900],
  paddingBottom: theme.spacing(10),
}))

const MOCK_USER_ID = '617fe24c85260c3048d53f08'

export default function RoomStatus() {
  const currentUser = JSON.parse(localStorage.getItem('user'))
  const { getRandomTables, getRandomTablesByUserId, tables, users } = useDraw()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (currentUser) {
      getRandomTablesByUserId(currentUser._id)
    } else {
      getRandomTables()
    }
    setIsLoading(false)
  }, [])

  return (
    <RootStyle>
      <ContentStyle>
        <CarouselBasic3 />
        <Box sx={{ px: 10, mt: 10 }}>
          <Grid container spacing={12}>
            <Grid item xs={12} md={4}>
              <UserList />
            </Grid>
            <Grid item xs={12} md={6} mt={5}>
              <Grid container spacing={12}>
                {tables.length > 0 ? (
                  tables.map((table, key) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} key={key}>
                      <MotionInView variants={varFadeInUp}>
                        <TicketTable table={table} />
                      </MotionInView>
                    </Grid>
                  ))
                ) : (
                  <MotionInView variants={varFadeInUp}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Box fullWidth>
                        <Typography
                          variant="h4"
                          textAlign="center"
                          sx={{ ml: 10, mt: 20 }}
                        >
                          No data
                        </Typography>
                      </Box>
                    </Grid>
                  </MotionInView>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <DaysAccordion />
            </Grid>
          </Grid>
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}
