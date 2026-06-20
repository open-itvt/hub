/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			allowedForwardedHosts: ['localhost:3000', 'glorious-lamp-g7wjvq7jrr9hv56v-3000.app.github.dev'],
			allowedOrigins: ['localhost:3000', 'glorious-lamp-g7wjvq7jrr9hv56v-3000.app.github.dev']
		},
	},
	env: {
		NEXT_PUBLIC_FORCE_REDIRECT_SET: process.env.FORCE_REDIRECT_SET || '',
	},
};

export default nextConfig;
