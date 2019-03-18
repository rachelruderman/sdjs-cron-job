require('dotenv').config();
import axios from 'axios';

export const getMeetups = ({when}) => {
    switch (when) {
        case ('tomorrow'):
            const tomorrow      = (Date.now() + 86400000);
            const iso8601Date   = new Date(tomorrow).toISOString().slice(0, -1);
            return axios.get(`https://api.meetup.com/sandiegojs/events?no_later_than=${iso8601Date}`);
        default:
            return axios.get(`https://api.meetup.com/sandiegojs/events`);
    }
};
