import express from "express";
import UserModel from "../models/user.js";
import { verifyToken } from "../utils/helpers.js";
import upload from "../middleware/uploadAvatar.js";
import { unlink, access } from 'fs/promises';
import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/:email", verifyToken, (req, res) => {
  UserModel.getUser(
    req,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(204);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      res.status(dbErr.status || 500);
      res.send({ error: dbErr.message });
    }
  );
});

router.get("/userData", verifyToken, (req, res) => {
  UserModel.getUser(
    req,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(204);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      res.status(dbErr.status || 500);
      res.send({ error: dbErr.message });
    }
  );
});
router.post("/signin", (req, res) => {
  const userCreds = req.body;
  console.log("The userCreds are: ", userCreds);

  UserModel.signIn(
    userCreds,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(400);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      if (dbErr.name === "ValidationError") {
        res.status(dbErr.status || 400);
      } else {
        res.status(dbErr.status || 500);
      }
      res.send({ error: dbErr.message });
    }
  );
});

router.post("/", (req, res) => {
  const user = req.body;
  console.log(user);
  UserModel.addUser(
    user,
    (dbRes) => {
      if (dbRes) {
        res.send(dbRes);
      } else {
        res.status(400);
        res.send(dbRes);
      }
    },
    (dbErr) => {
      console.log(dbErr.name);
      if (dbErr.name === "ValidationError") {
        res.status(400);
      } else {
        res.status(500);
      }
      res.send({ error: dbErr.message });
    }
  );
});

router.post('/upload/avatar', upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.body.userId;
  
    console.log(req.body);
    if (!userId) {
      await unlink(req.file.path);
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      await unlink(req.file.path);
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete old avatar if exists
    if (user.avatar) {
      const oldAvatarPath = path.join(__dirname, '..', 'uploads', 'avatars', path.basename(user.avatar));
      try {
        await access(oldAvatarPath);
        await unlink(oldAvatarPath);
      } catch (error) {
        console.log('Old avatar not found');
      }
    }

    // Update user with new avatar path
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    await UserModel.findByIdAndUpdate(userId, { avatar: avatarUrl });
    res.json({
      message: 'Avatar uploaded successfully',
      avatarUrl: avatarUrl
    });

  } catch (error) {
    if (req.file) {
      try {
        await unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    console.error('Upload error:', error);
    res.status(500).json({
      error: 'Failed to upload avatar',
      details: error.message
    });
  }
});
export default router;
