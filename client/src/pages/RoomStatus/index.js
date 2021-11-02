/* eslint-disable */
import React, { useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

import { CarouselBasic3 } from 'components/carousel'
import UserList from './UserList'
import TicketTable from './TicketTable'
import useDraw from 'hooks/useDraw'
import { MotionInView, varFadeInUp } from '../../components/animate'

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
  const { getRandomTables, getRandomTablesByUserId, tables, users } = useDraw()

  useEffect(() => {
    // getRandomTables()
    getRandomTablesByUserId(MOCK_USER_ID)
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
            <Grid item xs={12} md={8}>
              <Grid container spacing={12}>
                {/* {tables.length > 0
                  ? tables.map((table, key) => (
                      <Grid item xs={12} sm={12} md={6} lg={4} key={key}>
                        <MotionInView variants={varFadeInUp}>
                          <TicketTable table={table} />
                        </MotionInView>
                      </Grid>
                    ))
                  : ''} */}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </ContentStyle>
    </RootStyle>
  )
}
