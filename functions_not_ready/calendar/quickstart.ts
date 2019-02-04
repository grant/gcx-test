import {Request, Response} from 'express';
import { calendar_v3, google } from 'googleapis';
const Calendar = google.calendar({ version: 'v3' }) as calendar_v3.Calendar;

/**
 * Calendar Quickstart
 * @see https://developers.google.com/calendar/quickstart/nodejs
 */

 /**
 * Lists 10 upcoming events in the user's calendar.
 */
// exports.listUpcomingEvents = async (req: Request, res: Response) => {
//   const calendarId = 'primary';
//   const optionalArgs = {
//     timeMin: (new Date()).toISOString(),
//     showDeleted: false,
//     singleEvents: true,
//     maxResults: 10,
//     orderBy: 'startTime'
//   };
//   const response = await Calendar.events.list({
//     calendarId,
//     ...optionalArgs,
//   });
//   const events = response.data.items;
//   if (events.length > 0) {
//     for (let i = 0; i < events.length; i++) {
//       const event = events[i];
//       let when = event.start.dateTime;
//       if (!when) {
//         when = event.start.date;
//       }
//       console.log('%s (%s)', event.summary, when);
//     }
//   } else {
//     console.log('No upcoming events found.');
//   }
//   res.status(200).json({});
// };
