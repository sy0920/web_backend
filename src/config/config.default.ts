import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1723173373217_6723',
  koa: {
    port: 7001,
  },
  middleware: [
    'reportMiddleware',
    'infoMiddleware',
    'i18nMiddleware',
    'bodyParser',
    'session',
  ],
  cors: {
    origin: 'http://localhost:5173', // 允许的来源
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  },
} as MidwayConfig;
