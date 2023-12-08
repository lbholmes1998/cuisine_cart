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
        unoptimized: true
      },
      trailingSlash: true,
      distDir: 'dist',
      output: "export",
}

module.exports = nextConfig 
