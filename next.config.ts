import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 画像最適化
  images: {
    formats: ['image/webp'],
  },

  // コンパイラー最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 実験的機能: 最適化されたパッケージのインポート
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Standalone output for better deployment
  output: 'standalone',
};

export default nextConfig;
