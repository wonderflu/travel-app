const filterObj = (obj, allowedFields) => {
  const newOnj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newOnj[el] = obj[el];
  });

  return newOnj;
};

module.exports = filterObj;
