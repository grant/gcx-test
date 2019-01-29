import { discovery_v1, google } from 'googleapis';
const discovery = google.discovery({ version: 'v1' }) as discovery_v1.Discovery;

exports.tstest3 = async (req: any, res: any) => {
  let message = req.query.message || req.body.message || 'ok!';
  const apis = await discovery.apis.list();
  const items = apis.data.items || [];
  // res.status(200).send(message + 'apis: ' + items.length);
  res.status(200).send(JSON.stringify(items, null, 2));
};
