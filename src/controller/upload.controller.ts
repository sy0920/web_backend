import { Controller, Post, Files, Inject } from '@midwayjs/core';
import { CircleService } from '../service/circle.service';

@Controller('/api/upload')
export class UploadController {
    @Inject()
    circleService: CircleService;

    @Post('/')
    async upload(@Files() files) {
        // 返回文件路径或处理逻辑
        return { path: `/uploads/${files.filename}` };
    }
}