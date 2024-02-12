function parseId(req, res, next) {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) {
    res.status(400);
    res.json({ msg: 'ID must be a valid integer' });
    return;
  }

  req.params.id = id;
  next();
}

module.exports = parseId;
