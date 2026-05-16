import "./globals.css";
import { ThemeProvider } from "./ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Kaitlin Wood",
  description: "Software Engineer portfolio showcasing projects and experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
