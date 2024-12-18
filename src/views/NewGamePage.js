import React, { useState, useRef } from 'react';
import { Typography, Stack, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuSelection from '../components/MenuSelection';
import Button from '@mui/material/Button';
import { Grow } from '@mui/material';
import Alert from '@mui/material/Alert';

const NewGamePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [selectedSport, setSelectedSport] = useState("");
    const [selectedWinner, setSelectedWinner] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [severity, setSeverity] = useState("");

    const participantsRef = useRef(null);
    const sportRef = useRef(null);
    const winnerRef = useRef(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const handleParticipantsChange = (event) => {
        setSelectedParticipants(event);
    };

    const handleSportChange = (event) => {
        setSelectedSport(event);
    };

    const handleWinnerChange = (event) => {
        setSelectedWinner(event);
    };

    const handleClearSelections = () => {
        participantsRef.current?.handleClearSelection();
        sportRef.current?.handleClearSelection();
        winnerRef.current?.handleClearSelection();
    };

    const handleSave = async () => {
        const object = {
            date: selectedDate.format('YYYY-MM-DD'),
            participants: selectedParticipants,
            sport: selectedSport,
            winner: selectedWinner
        };
    
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(object),
            });
    
            if (response.ok) {
                setSelectedDate(null);
                setSelectedParticipants([]);
                setSelectedSport('');
                setSelectedWinner('');
                handleClearSelections();
                setSeverity("success");
                setAlertText("Game saved successfully!");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            } else {
                setSeverity("error");
                setAlertText("Error while saving game");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            setSeverity("error");
            setAlertText("Error while saving game");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
        }
    };

    return (
        <Box align="center">
            <Stack direction="column" alignItems="center">
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <img src="/images/FlashscoreLogo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
                    <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '35px' }} color="white">
                        POIKAINSCORE
                    </Typography>
                </Stack>
                <Typography sx={{ fontFamily: '"Audiowide", sans-serif', fontSize: '30px', paddingTop: '60px' }} color="white">
                    New Game
                </Typography>
                <Stack sx={{ marginTop: 4, direction: 'column', maxWidth: '500px', width: '70%' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Select Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            format="DD.MM.YYYY"
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& .MuiInputBase-root': {
                                    color: 'white',
                                },
                                '& .MuiSvgIcon-root': {
                                    color: 'white',
                                },
                                '& input::placeholder': {
                                    color: 'white',
                                },
                                background: '#080c0c',
                                borderRadius: '3px',
                            }}
                        />
                    </LocalizationProvider>
                    <MenuSelection
                        ref={participantsRef}
                        selections={['Eero', 'Oskari', 'Janne', 'Lauri']}
                        multi={true}
                        label="Select Participants"
                        onSelectionChange={handleParticipantsChange}
                    />
                    <MenuSelection
                        ref={sportRef}
                        selections={['Snooker', 'Petanque', 'Darts']}
                        multi={false}
                        label="Select Sport"
                        onSelectionChange={handleSportChange}
                    />
                    <MenuSelection
                        ref={winnerRef}
                        selections={selectedParticipants}
                        multi={false}
                        label="Select Winner"
                        onSelectionChange={handleWinnerChange}
                    />
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={!(selectedDate && selectedParticipants.length && selectedSport && selectedWinner)}
                        sx={{ 
                            background: '#c84c4c', 
                            padding: '20px', 
                            marginTop: '20px',
                            fontSize: '15px',
                            fontFamily: '"Audiowide", sans-serif',
                            '&.Mui-disabled': {
                                borderColor: '#080c0c',
                                color: '#080c0c',
                            },
                         }}
                    >
                        Save Game
                    </Button>
                        <Grow in={showAlert} timeout={500} sx={{ marginTop: '20px' }}>
                            <Alert variant="filled" severity={severity}>
                                    {alertText}
                            </Alert>
                        </Grow>
                </Stack>
            </Stack>
        </Box>
    );
};

export default NewGamePage;
