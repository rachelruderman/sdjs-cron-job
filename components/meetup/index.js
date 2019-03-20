import axios from 'axios';
import {iso8601DateFormatter} from "../../util/iso8601DateFormatter";

const getStartOfDay     = (date) => iso8601DateFormatter(Math.floor(date / dayInMs) * dayInMs);
const getEndOfDay       = (date) => iso8601DateFormatter(getStartOfDay(date) + dayInMs - 1);
const dayInMs           = 86400000;

export const getMeetups = ({when}) => {
    const today         = Date.now();
    const tomorrow      = Date.now() + dayInMs;
    const thisWeek      = Date.now() + (dayInMs * 6);
    const baseUrl       = 'https://api.meetup.com/sandiegojs/events';

    switch (when) {
        case ('tomorrow'):
            return axios.get(`${baseUrl}?no_earlier_than=${getStartOfDay(tomorrow)}&no_later_than=${getEndOfDay(tomorrow)}`);
        case ('week'):
            return axios.get(`${baseUrl}?no_earlier_than=${getStartOfDay(today)}&no_later_than=${getEndOfDay(thisWeek)}`);
        default:
            return new Error('Unrecognized parameter passed to getMeetups');
    }
};