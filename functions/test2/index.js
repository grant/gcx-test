"use strict";
exports.two = function (req, res) {
    var message = req.query.message || req.body.message || 'two!';
    res.status(200).send(message);
};
