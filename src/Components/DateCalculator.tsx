import React, { useState } from 'react';
import { Box, Stack, Divider, Button, Typography, Snackbar, Alert } from '@mui/material';

// function calculateDateGap(date1: Date, date2: Date): number {
//     const diffInMs = Math.abs(date2.getTime() - date1.getTime());
//     const diffInDays = Math.ceil(diffInMs / (1000 * 3600 * 24));
//     return diffInDays;
// }
function calcYearGap(date1: Date, date2: Date) {
    const diffInMin = Math.abs(date2.getTime() - date1.getTime());
    const years = Math.floor(diffInMin / (1000 * 60 * 60 * 24 * 365.25));
    return years;
}
function calcMonthGap(date1: Date, date2: Date) {
    const diffInMin = Math.abs(date2.getTime() - date1.getTime());
    const months = Math.floor((diffInMin / (1000 * 60 * 60 * 24 * 30.44) % 12));
    return months;
}
function calcDaysGap(date1: Date, date2: Date) {
    const diffInMin = Math.abs(date2.getTime() - date1.getTime());
    const days = Math.floor((diffInMin / (1000 * 60 * 60 * 24)) % 30.44);
    return days;
}
function calcHoursGap(date1: Date, date2: Date) {
    const diffInMin = Math.abs(date2.getTime() - date1.getTime());
    const hours = Math.floor((diffInMin / (1000 * 60 * 60)) % 24);
    return hours;
}
function calcMinsGap(date1: Date, date2: Date) {
    const diffInMin = Math.abs(date2.getTime() - date1.getTime());
    const minutes = Math.floor((diffInMin / (1000 * 60)) % 60);
    return minutes;
}

export default function DateCalculator() {
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    const [min, setMin] = useState<number>(0);
    const [openSnack, setOpenSnack] = useState(false);

    const handleStartDate = (event: any) => {
        setStartDate(new Date(event.target.value))
    }

    const handleEndDate = (event: any) => {
        setEndDate(new Date(event.target.value))
    }

    const handleDateGap = () => {
        const yearGap = calcYearGap(startDate, endDate)
        const monthGap = calcMonthGap(startDate, endDate)
        const dayGap = calcDaysGap(startDate, endDate)
        const hourGap = calcHoursGap(startDate, endDate)
        const minGap = calcMinsGap(startDate, endDate)
        setYear(yearGap);
        setMonth(monthGap);
        setDay(dayGap);
        setHour(hourGap);
        setMin(minGap);
        if ((yearGap || monthGap || dayGap || hourGap || minGap) === 0) {
            setOpenSnack(true)
        };
    }

    // Snackbar close func
    const handleSnackClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnack(false);
    };

    return (
        <>
            {/* WebView */}
            <Box height='70%' width='40%' sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }} justifyContent='center' alignItems='center' borderRadius={3} bgcolor='#f1f2f4' paddingY={1}>
                <Stack height='95%' width='95%' direction='column' display='flex' justifyContent='center' alignItems='center'>
                    <Box height='12%' width='100%' display='flex' justifyContent='center' alignItems='center' >
                        <Typography component='h1' fontSize='2rem' fontWeight={600} fontFamily='Poppins'>Time Estimator</Typography>
                    </Box>
                    <Stack height='25%' width='100%' direction='row' display='flex' justifyContent='center' alignItems='center'>
                        <Stack height='100%' width='50%' direction='row' spacing={0.7} display='flex' justifyContent='center' alignItems='center' >
                            <Typography component='h2' fontSize='1rem' fontWeight={600} fontFamily='Poppins'>Start date:</Typography>
                            <input type='date' value={startDate.toISOString().slice(0, 10)} onChange={handleStartDate} />
                        </Stack>
                        <Divider orientation='vertical' sx={{ height: '3rem' }} />
                        <Stack height='100%' width='50%' direction='row' spacing={0.7} display='flex' justifyContent='center' alignItems='center' >
                            <Typography component='h2' fontSize='1rem' fontWeight={600} fontFamily='Poppins'>End date:</Typography>
                            <input type='date' value={endDate.toISOString().slice(0, 10)} onChange={handleEndDate} />
                        </Stack>
                    </Stack>
                    <Box height='12%' width='100%' display='flex' justifyContent='center' alignItems='center' >
                        <Button variant='contained' onClick={handleDateGap} sx={{ textTransform: 'initial' }} >Calculate Time</Button>
                    </Box>
                    <Stack height='51%' width='100%' direction='column' spacing={0.5} display='flex' justifyContent='flex-start' alignItems='center' paddingTop={2}>
                        <Typography component='h3' fontSize='1.2rem' fontWeight={500} fontFamily='Poppins'>{(hour > 0 || day > 0) && `The Estimated Time`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{year > 0 && `${year} years`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{month > 0 && `${month} months`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{day > 0 && `${day} days`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{hour > 0 && `${hour} hours`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{min > 0 && `${min} mins`}</Typography>
                    </Stack>
                </Stack>
            </Box>
            {/* MobView */}
            <Box height='70%' width='85%' sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }} justifyContent='center' alignItems='center' borderRadius={3} bgcolor='#f1f2f4' paddingY={1}>
                <Stack height='95%' width='95%' direction='column' display='flex' justifyContent='center' alignItems='center'>
                    <Box height='15%' width='100%' display='flex' justifyContent='center' alignItems='center' >
                        <Typography component='h1' fontSize='2rem' fontWeight={600} fontFamily='Poppins'>Time Estimator</Typography>
                    </Box>
                    <Stack height='25%' width='100%' direction='row' spacing={0.7} display='flex' justifyContent='center' alignItems='center'>
                        <Stack height='100%' width='50%' direction='column' spacing={0.7} display='flex' justifyContent='center' alignItems='center' >
                            <Typography component='h2' fontSize='1rem' fontWeight={600} fontFamily='Poppins'>Start date:</Typography>
                            <input type='date' value={startDate.toISOString().slice(0, 10)} onChange={handleStartDate} />
                        </Stack>
                        <Divider orientation='vertical' sx={{ height: '5rem' }} />
                        <Stack height='100%' width='50%' direction='column' spacing={0.7} display='flex' justifyContent='center' alignItems='center' >
                            <Typography component='h2' fontSize='1rem' fontWeight={600} fontFamily='Poppins'>End date:</Typography>
                            <input type='date' value={endDate.toISOString().slice(0, 10)} onChange={handleEndDate} />
                        </Stack>
                    </Stack>
                    <Box height='15%' width='100%' display='flex' justifyContent='center' alignItems='center' >
                        <Button variant='contained' onClick={handleDateGap} sx={{ textTransform: 'initial' }} >Calculate Time</Button>
                    </Box>
                    <Stack height='45%' width='100%' direction='column' spacing={0.5} display='flex' justifyContent='flex-start' alignItems='center' paddingTop={2}>
                        <Typography component='h3' fontSize='1.2rem' fontWeight={500} fontFamily='Poppins'>{(hour > 0 || day > 0) && `The Estimated Time`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{year > 0 && `${year} years`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{month > 0 && `${month} months`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{day > 0 && `${day} days`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{hour > 0 && `${hour} hours`}</Typography>
                        <Typography component='h4' fontSize='1rem' fontWeight={500} fontFamily='Poppins'>{min > 0 && `${min} mins`}</Typography>
                    </Stack>
                </Stack>
            </Box>
            {/* SnackBar */}
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleSnackClose}>
                <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }}>
                    The dates can't be the same...
                </Alert>
            </Snackbar>
        </>
    )
}
