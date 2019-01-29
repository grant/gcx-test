import { discovery_v1, google } from 'googleapis';
const discovery = google.discovery({ version: 'v1' }) as discovery_v1.Discovery;

/**
 * Lists all discovery doc info.
 */
exports.list = async (req: any, res: any) => {
  const apis = await discovery.apis.list();
  const items = apis.data.items || [];
  // res.status(200).send(message + 'apis: ' + items.length);
  res.status(200).json(items, null, 2);
};

/**
 * Gets a specific discovery doc.
 */
exports.api = async (req: any, res: any) => {
  const { api, version } = req.query;
  if (!api || !version) {
    res.status(400).json({
      error: 'Bad params. "api" & "version" query params required'
    });
  }
  const rest = await discovery.apis.getRest({
    api,
    version,
  })
  res.status(200).json(rest);
}
