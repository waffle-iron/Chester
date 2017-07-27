module.exports = (req, res, next) => {
    req.feathers.headers = req.headers;
    req.feathers.ip = req.ip;
    next();
};
