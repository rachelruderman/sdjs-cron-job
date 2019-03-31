import shortUrl from 'node-url-shortener';

export const createShortUrl = ({link}) => {
    return new Promise( (resolve, reject) => {
        shortUrl.short(link, (error, url) => {
            if (error) reject   (error);
            if (url)   resolve  (url);
        });
    })
};