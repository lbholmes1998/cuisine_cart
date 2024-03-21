/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'spoonacular.com',
            port: '',
            pathname: '/recipeImages/**',
          },
        ],
      },
      trailingSlash: true,
      distDir: 'dist'
}

module.exports = nextConfig 
