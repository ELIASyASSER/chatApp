import fs from "fs";
import axios from "axios";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import path from "path";
import { authParams, config, getTokenParams } from "../utils/oAuth.config.js";
import crypto from "crypto"; // For hashing the image URL

// Function to generate a filename based on a hash of the image URL

const getCachedImagePath = (url) => {
  const hash = crypto.createHash("sha256").update(url).digest("hex");
  return path.join("imgUploads", `${hash}_profile.jpg`);
};


const authUrl = (_, res) => {
  res.json({
    url: `${config.authUrl}?${authParams}`,
  });
};

const authToken = async (req, res, next) => {
  const { code } = req.query;
  if (!code) return next();

  try {
    const tokenParam = getTokenParams(code);
    const {
      data: { id_token },
    } = await axios.post(`${config.tokenUrl}?${tokenParam}`);

    if (!id_token) return res.status(400).json({ message: 'Auth error' });

    const { email, name, picture } = jwt.decode(id_token);

    // Check if user already exists
    let user = await User.findOne({ email });
    
    // Define the path for the cached image
    const imagePath = getCachedImagePath(picture);

    // Check if the image already exists
    if (!fs.existsSync(imagePath)) {
      // Download and save the image only if it doesn't exist
      const imageResponse = await axios.get(picture, { responseType: 'stream' });
      fs.mkdirSync('imgUploads', { recursive: true });


      const writer = fs.createWriteStream(imagePath);
      imageResponse.data.pipe(writer);

      
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });
    }

    // Update or create the user
    if (!user) {
      user = await User.create({
        name,
        email,
        picture: imagePath, // Store the local path to the cached image
      });
    } else if (user.picture !== imagePath) {
      user.picture = imagePath; // Update only if different
      await user.save();
    }

    // Sign a new token
    const token = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });


    res.cookie('token', token, {
      maxAge: 900_000,
      httpOnly: true,
    });

    res.json({ user });
  } catch (err) {
    console.log('Error: ', err);
    next(err);
  }
};

const authLoggedIn = (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ loggedIn: false });

    const { user } = jwt.verify(token, config.tokenSecret);

    const newToken = jwt.sign({ user }, config.tokenSecret, {
      expiresIn: config.tokenExpiration,
    });

    res.cookie('token', newToken, {
      maxAge: 900000,
      httpOnly: true,
    });

    res.json({ loggedIn: true, user });
  } catch (err) {
    res.json({ loggedIn: false });
  }
};

const authLoggedOut = (_, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};

export {
  authUrl,
  authToken,
  authLoggedIn,
  authLoggedOut,
};
