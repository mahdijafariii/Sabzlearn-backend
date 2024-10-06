const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const coverDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "courses", "covers"));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + String(Math.random() * 9999);
        const ext = path.extname(file.originalname);
        cb(null, fileName + ext);
    },
});

const articleCoverDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "public", "articles", "covers"));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + String(Math.random() * 9999);
        const ext = path.extname(file.originalname);
        cb(null, fileName + ext);
    },
});

module.exports = {articleCoverDisk , coverDisk}