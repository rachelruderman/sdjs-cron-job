import {CronJob} from 'cron';
import {getMeetups} from "../meetup/index";
import {createShortUrl} from "../short_url/index";
import {sendTweet} from "../twitter/index";
import {getLocalTime} from "../../util/getLocalTime";
import {sendEmail} from "../email/index";
import {timezone} from "../../util/timezone";

const daily6am = '0 6 * * *';

export const dailyCronJob = new CronJob(daily6am, async () => {
        const errors        = [];

        const onError       = ((error) => {
            const {message, stack, response} = error;
            if (response && response.data) message.concat(response.data);
            errors.push(`error: ${JSON.stringify({message, stack})}`);
            console.log({error});
        });

        try {
            const meetups   = await getMeetups({when: 'tomorrow'});

            meetups.data.forEach( async (meetup) => {
                try {
                    const {time, name, link} = meetup;
                    const shortUrl           = await createShortUrl({link});
                    const localTime          = getLocalTime(time);
                    const status             = `It's happening! ${name} tomorrow @ ${localTime}: ${shortUrl}`;

                    await sendTweet({status});
                }
                catch (error) {
                    onError(error);
                }
            });
        }
        catch (error) {
            onError(error);
        }
        finally {
            const subject = (errors.length < 1) ? 'Daily Cron Job Success!' : 'Uh oh! Daily cron job gone wild...';
            const body    = (errors.length < 1) ? 'Awesome sauce'            : errors.join('\n');
            sendEmail({subject, body}).catch( (error) => console.log({error}))
        }
    },
    null, true, timezone
);