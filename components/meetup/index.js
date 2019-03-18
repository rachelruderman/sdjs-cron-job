require('dotenv').config();
import axios from 'axios';

export const getMeetups = ({when}) => {
    const params = {
        status: 'upcoming',
        method: 'get',
        url:    'https://api.meetup.com/sandiegojs/events',
        timeout: 8000,
        page:   1
    };

    switch (when) {
        case ('tomorrow'):  return axios({...params, no_later_than: (Date.now() + 86400000)});
        default:            return axios(params);
    }
};
