"use strict";
var mymessage = require('./otherfile');
// Test npm
var PI = require("pi");
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.grant1 = function (req, res) {
    var message = req.query.message || req.body.message || 'ok grant1!';
    res.status(200).send(message + mymessage);
};
exports.grant2 = function (req, res) {
    var message = req.query.message || req.body.message || 'nice grant2!';
    res.status(200).send(message + mymessage);
};
exports.grant3 = function (req, res) {
    var message = req.query.message || req.body.message || 'nice grant3!';
    res.status(200).send(message + mymessage);
};
exports.grant4 = function (req, res) {
    var message = req.query.message || req.body.message || 'nice grant4!';
    message += PI(23);
    res.status(200).send(message + mymessage);
};
exports.pi = function (req, res) {
    var message = PI(23);
    res.status(200).send(message + mymessage);
};
