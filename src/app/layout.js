import './globals.css';
import { ThemeProvider } from './ThemeContext';

export const metadata = {
  title: 'Kaitlin Wood',
  description: 'Software Engineer portfolio showcasing projects and experience',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
