import {CronJob} from 'cron';
import {getMeetups} from "../meetup/index";
import {createShortUrl} from "../url/index";
import {sendTweet} from "../twitter/index";
import {getLocalTime} from "../../util/getLocalTime";
import {sendEmail} from "../email/index";
import {timezone} from "../../util/timezone";

const daily9am = '0 9 * * *';

export const dailyCronJob = new CronJob(daily9am, async () => {
        const errors        = [];
        const onError       = (error) => errors.push(`error: ${JSON.stringify(error)}`);

        try {
            const meetups   = await getMeetups({when: 'tomorrow'});

            meetups.data.forEach( async (meetup) => {
                try {
                    const {time, name, link} = meetup;
                    const shortUrl           = await createShortUrl({link});
                    const localTime          = getLocalTime(time);
                    const status             = `Join us for ${name} tomorrow @ ${localTime}: ${shortUrl}`;

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
            const message = (errors.length < 1) ? 'Daily Cron Job Success!' : errors.join('\n');
            sendEmail({message}).catch( (error) => console.log({error}))
        }
    },
    null, true, timezone
);