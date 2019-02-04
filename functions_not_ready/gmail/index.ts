import { Request, Response } from 'express';
import { gmail_v1, google } from 'googleapis';
const gmail = google.gmail({ version: 'v1' }) as gmail_v1.Gmail;

/**
 * Gmail Quickstart
 * @see https://developers.google.com/gmail/api/quickstart/nodejs
 */

// /**
//  * Lists the labels in the user's account.
//  */
// exports.logNamesAndMajors = async (req: Request, res: Response) => {
//   const labels = await gmail.users.labels.list({
//     userId: 'me'
//   });
//   const values = labels.data.labels || [];
//   if (!values.length) {
//     console.log('No data found.');
//   } else {
//     console.log('Name, Major:');
//     for (let row = 0; row < values.length; row++) {
//       // Print columns A and E, which correspond to indices 0 and 4.
//       console.log(' - %s, %s', values[row][0], values[row][4]);
//     }
//   }
//   res.status(200).json({});
// };
