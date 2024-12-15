import React from 'react';
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const Achievement = ({ achievement, unlocked, stars, expanded, name }) => {
    return (
        <TableContainer>
            <Table sx={{ borderCollapse: 'collapse' }}>
                <TableBody >
                    <TableRow sx={{ border: 'none', width: '100%' }}>
                        <TableCell
                            sx={{
                                border: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                                width: '69%',
                            }}
                        >
                            <Stack>
                                <Typography fontWeight={"bold"} fontSize={'clamp(17px, 2vw, 21px)'}>
                                    {name}
                                </Typography>
                                <Typography fontSize={'clamp(13px, 2vw, 21px)'}>
                                    {achievement}
                                </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell
                            sx={{ 
                                border: 'none',
                                padding: 0,
                                maxWidth: '100px',
                                textAlign: 'center',
                            }}
                         >
                            {Array.from({ length: stars }).map((_, index) => (
                                <StarIcon
                                    key={index}
                                    sx={{
                                        fontSize: 'clamp(12px, 6vw, 29px)',
                                        color: (index < unlocked) && expanded ? 'gold' : '#3a3a3a',
                                        transition: `color 0.5s ${1 + index * 0.7}s ease-in-out, filter 0.5s ${1 + index * 0.7}s ease-in-out`,
                                        filter: (index < unlocked) && expanded
                                            ? 'drop-shadow(0 0 1.5px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 3px rgba(255, 215, 0, 0.8))'
                                            : 'none',
                                        animation: (index < unlocked) && expanded ? 'quick-spin 0.5s ease-in-out' : 'none',
                                        animationDelay: `${1 + index * 0.7}s`,
                                        transform: 'translateY(0)',
                                        '@keyframes quick-spin': {
                                            '0%': { transform: 'rotate(0deg)' },
                                            '100%': { transform: 'rotate(360deg)' },
                                        },
                                    }}
                                />
                            ))}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Achievement;
