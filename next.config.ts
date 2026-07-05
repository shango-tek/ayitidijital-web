import type { NextConfig } from "next";

const nextConfig: any = {
  /* config options here */
  // @ts-ignore
  devIndicators: {
    appIsrStatus: false,
  },
  // @ts-ignore
  allowedDevOrigins: ["192.168.178.68", "localhost:3000"],
};

export default nextConfig;
