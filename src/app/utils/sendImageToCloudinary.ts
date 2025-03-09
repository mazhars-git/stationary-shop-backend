import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

// export const sendImageToCloudinary = async (
//   imageName: string,
//   path: string
// ) => {
// cloudinary.config({
//   cloud_name: config.cloud_name,
//   api_key: config.cloud_key,
//   api_secret: config.cloud_secret,
// })

//   try {
//     const uploadResult = await cloudinary.uploader.upload(path, {
//       public_id: imageName,
//     })

      // fs.unlink(path, (err) => {
      //   if (err) {
      //     throw err
      //   } else {
      //     console.log("File deleted")
      //   }
      // })
//     return uploadResult
//   } catch (error) {
//     console.log(error)
//   }
// }

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.cloud_key,
  api_secret: config.cloud_secret,
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      (error, result) => {
        fs.unlink(path, (err) => {
          if (err) {
            throw err
          } else {
            console.log("File deleted")
          }
        })
        if(error){
          reject(error)
        }
        else{
          resolve(result)
        }
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now();
    cb(null, fileName + fileExt);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
