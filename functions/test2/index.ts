exports.two = (req: any, res: any) => {
  let message = req.query.message || req.body.message || 'two!';
  res.status(200).send(message);
};