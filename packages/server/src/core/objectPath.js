module.exports = (path, obj) =>
  path.split(".").reduce((prev, curr) => prev[curr], obj);
