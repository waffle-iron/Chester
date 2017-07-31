module.exports = (req, res, next) => {
    const ipregex = require('ip-regex');
    let originIp = req.ip.match(ipregex.v4());

    if (originIp !== null) {
        req.feathers.ip = originIp[0];
    } else {
    // Local ?
    // TODO: Maybe remove this else block, because it might be redundant
    // Or maybe not, I dont know.. Ip might never be null ?! FUCK..
    // Very confused
        req.feathers.ip = '0.0.0.0';
    }

    req.feathers.headers = req.headers;

    next();
};
