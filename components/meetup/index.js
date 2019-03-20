import axios from 'axios';
import {iso8601DateFormatter} from "../../util/iso8601DateFormatter";

export const getMeetups = ({when}) => {
    const dayInMs   = 86400000;
    const tomorrow  = (Date.now() + dayInMs);
    const week      = (Date.now() + (dayInMs * 6));

    switch (when) {
        case ('tomorrow'):
            return axios.get(`https://api.meetup.com/sandiegojs/events?no_later_than=${iso8601DateFormatter(tomorrow)}`);
        case ('week'):
            return axios.get(`https://api.meetup.com/sandiegojs/events?no_later_than=${iso8601DateFormatter(week)}`);
        default:
            return new Error('Unrecognized parameter passed to getMeetups');
    }
};