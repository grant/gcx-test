import { google, logging_v2 } from 'googleapis';
const logging = google.logging({ version: 'v2' }) as logging_v2.Logging;

/**
 * console.log
 */
exports.log = async (req: any, res: any) => {
  await logging.entries.write({
    requestBody: {
      entries: [{
        textPayload: 'test',
        jsonPayload: {},
      }]
    }
  })
  res.status(200).json({});
};
