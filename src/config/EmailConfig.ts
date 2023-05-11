import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_GMAIL_USER,
    pass: process.env.EMAIL_GMAIL_PASSWORD,
  },
  baseUrl: process.env.EMAIL_BASE_URL,
}));
