import React, { useState, useEffect } from 'react';

function fomartDate(date) {
    if(!date) return '';

    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    return `${hours}: ${minutes} : ${seconds}`;
}

function useClock(props) {
    const [timeString, setTimeString] = useState('');

    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            // HH:mm:ss
            const newTimeString = fomartDate(now);

            setTimeString(newTimeString);
        }, 1000);

        return () => {
            console.log('Clock cleanup');
            clearInterval(clockInterval);
        };
    }, []);

    return {timeString};
}

export default useClock;