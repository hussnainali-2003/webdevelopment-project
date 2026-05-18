const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-z0-9.\-_]/gi, '_');
    cb(null, `${Date.now()}-${safe}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (/^image\/(jpeg|png|webp|gif|svg\+xml)$/.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

module.exports = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});