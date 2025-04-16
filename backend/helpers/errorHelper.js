module.exports.sendInternalServerError = ({
  res,
  error,
  functionName = "errorHelper",
}) => {
  console.log(`Error in ${functionName}`);
  res.status(500).json({ message: error });
};
