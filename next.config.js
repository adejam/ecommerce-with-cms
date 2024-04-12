/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "gravatar.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "liveblocks.io",
        pathname: "**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["fabric"],
  },
  webpack: (config) => {
    config.externals.push({
      sharp: "commonjs fabric",
      canvas: "commonjs canvas",
    })
    return config
  },
}

export default config
