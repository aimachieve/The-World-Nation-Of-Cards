/* eslint-disable */
import React, { useState } from 'react'
import { styled } from '@material-ui/core/styles'
import { Grid, Container, Typography, Button, TextField } from '@material-ui/core';
import { DatePicker, StaticDatePicker, MobileDatePicker, DesktopDatePicker, DesktopTimePicker } from '@material-ui/lab';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import { MotionInView, varFadeInUp } from '../../../components/animate';
// hooks
import useDraw from '../../../hooks/useDraw';

// ---------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}))

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center'
}))

const MainStyle = styled('div')(({ theme }) => ({
  // backgroundColor: '#000',
  color: '#fff',
  padding: theme.spacing(3),
  margin: theme.spacing(3, 0),
}))


export default function SateliteEvent() {
  const { isCreatedEvent, current_event, create_sEvent  } = useDraw();

  const [formData, setFormData] = useState({
    date: new Date(),
    price: '',
    entries: '',
    winners: '',
  });

  const { date, price, entries, winners } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ price, entries, winners })
    await create_sEvent({ 
      id: current_event._id,
      date, 
      price, 
      entries, 
      winners });
    
  };

  return (
    <RootStyle>
      <ContentStyle>
      {/* Create a ticket */}
        <Container maxWidth="lg">
          <MainStyle>
            <MotionInView variants={varFadeInUp}>
              <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Arciform,AdobeInvisFont,MyriadPro-Regular', fontSize: '20px' }}>
                CREATE A SATELITE EVENT
              </Typography>
            </MotionInView>

            <Grid container>
              <Grid item xs={12} md={12}>
                <MotionInView variants={varFadeInUp}>
                  <form className="form" onSubmit={onSubmit}>
                    <TextField
                      fullWidth
                      autoComplete="entries"
                      label="Entries"
                      type="number"
                      sx={{mt: 3}}
                      name="entries"
                      value={entries}
                      onChange={onChange}
                    />
                    <TextField
                      fullWidth
                      autoComplete="winners"
                      label="Winners"
                      type="number"
                      sx={{mt: 3}}
                      name="winners"
                      value={winners}
                      onChange={onChange}
                    />
                    <TextField
                      fullWidth
                      autoComplete="price"
                      label="Ticket Price"
                      type="number"
                      sx={{mt: 3}}
                      name="price"
                      value={price}
                      onChange={onChange}
                    />
                    <DesktopDatePicker
                      fullWidth
                      label="For desktop"
                      name="date"
                      value={date}
                      minDate={new Date()}
                      components={{
                        OpenPickerIcon: ExpandMoreRoundedIcon
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          sx={{
                            mt: 3,
                            '& fieldset': { border: '0 !important' },
                            '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' }
                          }}
                        />
                      )}
                    />
                    <Button onClick={onSubmit} varient="contained" sx={{ backgroundColor: '#2FC656', color: '#fff', mt: 3, width: '30px',textAlign: 'left',
                    '&:hover': { backgroundColor: '#29B2FE', color: '#fff' } }} > SUBMIT </Button>
                  </form>
                </MotionInView>
              </Grid>
            </Grid>
          </MainStyle>
        </Container>
      </ContentStyle>
    </RootStyle>
  )
}
