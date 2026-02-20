import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only JPEG, PNG, WebP images allowed'));
  },
});

router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({
        success: false,
        message: 'Cloudinary not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to .env',
      });
    }
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: 'kisanhub', resource_type: 'image' },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(req.file.buffer);
    });
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
