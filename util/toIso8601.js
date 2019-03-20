export const toIso8601 = (dateInMs) => {
    return (dateInMs) ?
        new Date(dateInMs).toISOString().slice(0, -1) :
        new Error('Invalid date passed to iso8601DateFormatter');
};