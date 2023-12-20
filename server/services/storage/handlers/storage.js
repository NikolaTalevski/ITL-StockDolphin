const fs = require("fs");
const strings = require("../../../pkg/strings");

const MAX_FILESIZE = 2097152;
const ALLOWED_FILETYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/pjpeg"
];

const upload = async(req, res) => {
    if(MAX_FILESIZE < req.files.document.size) {
        return res.status(400).send("File exceeds max file size");
    }
    if(!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
        return res.status(400).send("File type is not allowed");
    }
    
    const useDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../../../uploads/${useDir}`;

    if(!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }

    const fileName = `${strings.makeID(6)}_${req.files.document.name}`;
    const filePath = `${userDirPath}/${fileName}`;

    req.files.document.mv(filePath, err => {
        if(err) {
            return res.status(500).send("Internal server error");
        }
        return res.status(201).send({file_name: fileName});
    });
};

const download = async(req, res) => {
    const useDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../../../uploads/${useDir}`;
    const filePath = `${userDirPath}/${req.params.filename}`;

    if(!fs.existsSync(filePath)) {
        return res.status(404).send("File not found");
    }

    res.download(filePath);
};

const listFiles = async(req, res) => {
    const useDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../../../uploads/${useDir}`;

    if(!fs.existsSync(userDirPath)) {
        return res.status(400).send("You don't have any uploads yet");
    }

    const files = fs.readdirSync(userDirPath);
    return res.status(200).send(files);
};

const removeFile = async(req, res) => {
    const useDir = `user_${req.auth.id}`;
    const userDirPath = `${__dirname}/../../../uploads/${useDir}`;
    const fileName = req.params.filename;

    if(!fs.existsSync(`${userDirPath}/${fileName}`)) {
        return res.status(404).send("File already deleted");
    }
    const filesInDir = fs.readdirSync(userDirPath);

    try{
        fs.unlinkSync(`${userDirPath}/${fileName}`);
    } catch(err) {
        console.error("Error deleting this", err);
    }

    if(filesInDir.length === 1) {
        fs.rmdirSync(userDirPath);
    }

    res.status(200).send({ msg: "Deleted a file", deletedFile: fileName});
};

module.exports = {
    upload,
    download,
    listFiles,
    removeFile
}