import {Request, Response} from 'express';
import { google, sheets_v4 } from 'googleapis';
const googlesheets = google.sheets({ version: 'v4' }) as sheets_v4.Sheets;

/**
 * Remove duplicates
 * @see https://developers.google.com/apps-script/articles/removing_duplicates
 */
exports.removeDuplicates = async (req: Request, res: Response) => {
  const spreadsheetId = '';
  const sheet = await googlesheets.spreadsheets.values.get({
    spreadsheetId,
  });
  const data = sheet.data.values;
  const newData = [];
  for (const row in data) {
    let duplicate = false;
    for (const j in newData) {
      if (row === newData[j]) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      newData.push(row);
    }
  }
  // Clear contents
  await googlesheets.spreadsheets.values.clear({
    spreadsheetId,
    range: 'A:XX',
  });
  await googlesheets.spreadsheets.values.batchUpdate({
    requestBody: {
      data: [{
        // newData
      }]
    }
  });
  
  res.status(200).json({});
};
