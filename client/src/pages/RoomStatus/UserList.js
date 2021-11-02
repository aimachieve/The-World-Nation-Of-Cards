/* eslint-disable */
import React, { useState } from 'react'
import { Stack, Box, Tabs, Tab, Card } from '@material-ui/core'
import { capitalCase } from 'change-case'

import Satellite1Tab from './Satellite1Tab'
import Satellite2Tab from './Satellite2Tab'
import MainEventTab from './MainEventTab'

export default function UserList() {
  const [currentTab, setCurrentTab] = useState('satellite_1')

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue)
  }

  const TABS = [
    {
      value: 'main_event',
      component: <MainEventTab />,
    },
    {
      value: 'satellite_1',
      component: <Satellite1Tab />,
    },
    {
      value: 'satellite_2',
      component: <Satellite2Tab />,
    },
  ]
  return (
    <Stack spacing={3}>
      <Box>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="fullWidth"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
        >
          {TABS.map((item) => (
            <Tab
              disableRipple
              key={item.value}
              value={item.value}
              icon={item.icon}
              label={capitalCase(item.value)}
              variant="contained"
            />
          ))}
        </Tabs>
      </Box>
      {TABS.map((item, key) => {
        const isMatched = item.value === currentTab
        return (
          isMatched && (
            <Card sx={{ padding: 3 }} key={key}>
              {item.component}
            </Card>
          )
        )
      })}
    </Stack>
  )
}
