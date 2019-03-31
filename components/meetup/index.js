import axios from 'axios';
import {toIso8601} from "../../util/toIso8601";

const getStartOfDay     = (date) => (Math.floor(date / dayInMs) * dayInMs);
const getEndOfDay       = (date) => (getStartOfDay(date) + dayInMs - 1);
const dayInMs           = 86400000;

export const getMeetups = ({when}) => {
    const today         = Date.now();
    const tomorrow      = Date.now() + dayInMs;
    const thisWeek      = Date.now() + (dayInMs * 7);
    const baseUrl       = 'https://api.meetup.com/sandiegojs/events';

    switch (when) {
        case ('tomorrow'):
            return axios.get(`${baseUrl}?no_earlier_than=${toIso8601(getStartOfDay(tomorrow))}&no_later_than=${toIso8601(getEndOfDay(tomorrow))}`);
        case ('week'):
            return axios.get(`${baseUrl}?no_earlier_than=${toIso8601(getStartOfDay(today))}&no_later_than=${toIso8601(getEndOfDay(thisWeek))}`);
        default:
            return new Error('Unrecognized parameter passed to getMeetups');
    }
};