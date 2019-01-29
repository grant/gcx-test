const mymessage = require('./otherfile');

// Test npm
const PI = require("pi");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.grant1 = (req: any, res: any) => {
  let message = req.query.message || req.body.message || 'ok grant1!';
  res.status(200).send(message + mymessage);
};

exports.grant2 = (req: any, res: any) => {
  let message = req.query.message || req.body.message || 'nice grant2!';
  res.status(200).send(message + mymessage);
};

exports.grant3 = (req: any, res: any) => {
  let message = req.query.message || req.body.message || 'nice grant3!';
  res.status(200).send(message + mymessage);
};

exports.grant4 = (req: any, res: any) => {
  let message = req.query.message || req.body.message || 'nice grant4!';
  message += PI(23);
  res.status(200).send(message + mymessage);
};

exports.pi = (req: any, res: any) => {
  let message = PI(23);
  res.status(200).send(message + mymessage);
};
