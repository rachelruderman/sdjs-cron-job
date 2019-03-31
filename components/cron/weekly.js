import {CronJob} from 'cron';
import {getMeetups} from "../meetup/index";
import {createShortUrl} from "../short_url/index";
import {sendTweet, maxTwitterChars} from "../twitter/index";
import {sendEmail} from "../email/index";
import {timezone} from "../../util/timezone";

const sunday6am = '0 6 * * 0';

export const weeklyCronJob = new CronJob(sunday6am, async () => {
        const errors = [];

        try {
            const meetups                   = await getMeetups({when: 'week'});
            const meetupNames               = meetups.data.map(meetup => meetup.name).join(' | ');

            if (meetupNames.length === 0) return; //if no upcoming meetups, return

            const link                      = 'https://www.meetup.com/sandiegojs/events';
            const shortUrl                  = await createShortUrl({link});

            const status                    = `☀️ This week at SDJS: ${meetupNames} ${shortUrl}`;
            const shouldTruncate            = (status.length > maxTwitterChars);
            let truncatedStatus             = null;

            if (shouldTruncate) {
                const charsToDelete         = (status.length - maxTwitterChars) + 3; // add 3 for ellipsis
                const truncatedMeetupNames  = meetupNames.slice(0, (meetupNames.length - charsToDelete));
                const withEllipsis          = `${truncatedMeetupNames}...`.replace('|...', '...').replace(' ...', '...');
                truncatedStatus             = `☀️ This week at SDJS: ${withEllipsis} ${shortUrl}`;
            }

            await sendTweet({status: (truncatedStatus || status)});
        }
        catch (error) {
            const {message, stack, response} = error;
            if (response && response.data) message.concat(response.data);
            errors.push(`error: ${JSON.stringify({message, stack})}`);
            console.log({error});
        }
        finally {
            const subject = (errors.length < 1) ? 'Weekly Cron Job Success!' : 'Uh oh! Weekly cron job gone wild...';
            const body    = (errors.length < 1) ? 'Awesome sauce'            : errors.join('\n');
            sendEmail({subject, body}).catch( (error) => console.log({error}))
        }
    },
    null, true, timezone
);