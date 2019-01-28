const mymessage = require('./otherfile');

// Test npm
const PI = require("pi");

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.grant1 = (req, res) => {
  let message = req.query.message || req.body.message || 'ok grant1!';
  res.status(200).send(message + mymessage);
};

exports.grant2 = (req, res) => {
  let message = req.query.message || req.body.message || 'nice grant2!';
  res.status(200).send(message + mymessage);
};

exports.grant3 = (req, res) => {
  let message = req.query.message || req.body.message || 'nice grant3!';
  res.status(200).send(message + mymessage);
};

exports.grant4 = (req, res) => {
  let message = req.query.message || req.body.message || 'nice grant4!';
  message += PI(23);
  res.status(200).send(message + mymessage);
};

exports.pi = (req, res) => {
  let message = PI(23);
  res.status(200).send(message + mymessage);
};
