require('dotenv').config();
import shortUrl from 'node-url-shortener';

export const shortLink = async ({link}) => {
    return await new Promise( (resolve, reject) => {
        shortUrl.short(link, (error, url) => {
            if (error) reject   (error);
            if (url)   resolve  (url);
        });
    })
};