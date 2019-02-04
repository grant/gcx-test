import {Request, Response} from 'express';
import { google, sheets_v4 } from 'googleapis';
const Sheets = google.sheets({ version: 'v4' }) as sheets_v4.Sheets;

/**
 * Sheets Quickstart
 * @see https://developers.google.com/sheets/api/quickstart/nodejs
 */

/**
 * Creates a Sheets API service object and prints the names and majors of
 * students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
exports.logNamesAndMajors = async (req: Request, res: Response) => {
  const spreadsheetId = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
  const range = 'Class Data!A2:E';
  const values = (await Sheets.spreadsheets.values.get({ spreadsheetId, range })).data.values;
  if (!values) {
    console.log('No data found.');
  } else {
    console.log('Name, Major:');
    for (let row = 0; row < values.length; row++) {
      // Print columns A and E, which correspond to indices 0 and 4.
      console.log(' - %s, %s', values[row][0], values[row][4]);
    }
  }
  res.status(200).json({});
};
