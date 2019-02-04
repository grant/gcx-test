import {Request, Response} from 'express';
import { docs_v1, google } from 'googleapis';
const Docs = google.docs({ version: 'v1' }) as docs_v1.Docs;

/**
 * Docs Quickstart
 * @see https://developers.google.com/docs/api/quickstart/nodejs
 */

/**
 * Prints the title of a sample doc:
 * @see https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
 */
exports.printTitle = async (req: Request, res: Response) => {
  const doc = await Docs.documents.get({
    documentId: '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE',
  });
  console.log(doc.data.title);
  res.status(200).json({});
};

