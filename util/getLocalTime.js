import moment from 'moment-timezone';
import {timezone} from "./timezone";

export const getLocalTime = (time) => moment.tz(time, timezone).format('h:mm A');