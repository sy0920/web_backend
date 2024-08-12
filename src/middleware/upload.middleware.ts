// upload.middleware.ts
import { Middleware } from '@midwayjs/core';
import * as multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 确保这个目录存在
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

@Middleware()
export class UploadMiddleware {
    resolve() {
        return upload.single('image'); // 'image' 是表单字段名
    }
}