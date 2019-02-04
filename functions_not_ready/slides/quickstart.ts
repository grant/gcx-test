import {Request, Response} from 'express';
import { google, slides_v1 } from 'googleapis';
const Slides = google.slides({ version: 'v1' }) as slides_v1.Slides;

/**
 * Slides Quickstart
 * @see https://developers.google.com/slides/quickstart/nodejs
 */

/**
 * Prints the number of slides and elements in a sample presentation:
 * @see https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
// exports.listSlides = async (req: Request, res: Response) => {
//   const presentationId = '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc';
//   const presentation = await Slides.presentations.get({presentationId});
//   const slides = presentation.data.slides;
//   console.log('The presentation contains %s slides:', slides.length);
//   for (let i = 0; i < slides.length; i++) {
//     console.log(
//       '- Slide # %s contains %s elements.',
//       i + 1,
//       slides[i].pageElements.length);
//   }
//   res.status(200).json({});
// };
