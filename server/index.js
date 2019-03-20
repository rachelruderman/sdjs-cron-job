import express from 'express'
import {dailyCronJob} from "../components/cron/daily";
import {weeklyCronJob} from "../components/cron/weekly";

const app = express();

app.listen(process.env.PORT || 5000);

dailyCronJob.start();
weeklyCronJob.start();