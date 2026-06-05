import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Huffman File Compressor',
  description: 'A modern, full-stack file compression tool using Huffman Encoding.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
      </head>
      <body>
        <nav className="navbar navbar-light" style={{ fontSize: '25px', fontFamily: 'sans-serif', backgroundColor: 'whitesmoke' }}>
          <img src="zip2.png" width="100" height="85" className="d-inline-block align-top" alt="" />
          <p>Huffman Encoding | File Zipper Project</p>
        </nav>
        {children}
      </body>
    </html>
  );
}
