import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactFlowProvider } from "@xyflow/react";
import { Provider } from "jotai";
import { type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "YouTube Content Creator - AI-Powered Workflow Builder",
  description:
    "Create YouTube scripts and thumbnails with AI-powered workflow automation. Built with Next.js and OpenRouter.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body className="antialiased">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        enableSystem
      >
        <Provider>
          <ReactFlowProvider>
            {children}
          </ReactFlowProvider>
          <Toaster />
        </Provider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
