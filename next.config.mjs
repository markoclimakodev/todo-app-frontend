/** @type {import('next').NextConfig} */
import {config} from 'dotenv'
config()
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/login',
            permanent: true,
          },
        ];
      },
};

export default nextConfig;
