import './globals.css';

export const metadata = {
  title: 'Kaitlin Wood - Portfolio',
  description: 'Software Engineer portfolio showcasing projects and experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}