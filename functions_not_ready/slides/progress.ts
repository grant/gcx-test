import {Request, Response} from 'express';
import { google, slides_v1 } from 'googleapis';
const googleslides = google.slides({ version: 'v1' }) as slides_v1.Slides;

/**
 * Gets a Slide presentation.
 */
exports.get = async (req: Request, res: Response) => {
  // const s = await googleslides.presentations.get({
  //   presentationId: '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc',
  // });
  res.status(200).json({});
};

// From:
// https://developers.google.com/gsuite/add-ons/editors/slides/quickstart/progress-bar

/**
 * Adds progress bars to a presentation
 */
// const BAR_ID = 'PROGRESS_BAR_ID';
// exports.deleteBars = async (req: Request, res: Response) => {
//   const presentation = await googleslides.presentations.get({
//     presentationId: '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc',
//   });
//   const slides = presentation.data.slides;
//   slides.map((slide) => {
//     slide.pageElements.map((el) => {
//       if (el.shape && el.shape.shapeProperties.link === BAR_ID) [
//         googleslides.presentations.batchUpdate({
//           requestBody: {
//             requests: [{
//               deleteObject: {
//                 objectId: el.objectId,
//               }
//             }]
//           }
//         })
//       ]
//     });
//   });
//   res.status(200).json({});
// };

