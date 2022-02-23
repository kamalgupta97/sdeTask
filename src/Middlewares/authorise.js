module.exports = (table) => async (req, res, next) => {
  const data = await table.findById(req.params.id).lean().exec();

  const { user } = data;

  if (req.user._id.toString() !== user.toString()) {
    return res.status(401).json({ meassage: "You are not Authourised" });
  }
  next();
};
