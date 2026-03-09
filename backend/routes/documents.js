const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../db');

const router = express.Router();

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeOriginalName = file.originalname.replace(/\s+/g, '_');
    cb(null, `${timestamp}-${safeOriginalName}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { title, uploaded_by } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    if (!title || !uploaded_by) {
      return res.status(400).json({ message: 'title and uploaded_by are required' });
    }

    const query = `
      INSERT INTO documents (title, filename, uploaded_by)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const values = [title, req.file.filename, Number(uploaded_by)];

    const result = await pool.query(query, values);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Failed to upload document' });
  }
});

router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT d.id, d.title, d.filename, d.status, d.uploaded_by, d.created_at, u.name AS uploaded_by_name
      FROM documents d
      LEFT JOIN users u ON d.uploaded_by = u.id
      ORDER BY d.created_at DESC
    `;
    const result = await pool.query(query);
    return res.json(result.rows);
  } catch (error) {
    console.error('Fetch documents error:', error);
    return res.status(500).json({ message: 'Failed to fetch documents' });
  }
});

router.put('/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      UPDATE documents
      SET status = 'approved'
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Approve document error:', error);
    return res.status(500).json({ message: 'Failed to approve document' });
  }
});

router.put('/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      UPDATE documents
      SET status = 'rejected'
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Reject document error:', error);
    return res.status(500).json({ message: 'Failed to reject document' });
  }
});

module.exports = router;
