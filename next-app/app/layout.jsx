import './globals.css';

export const metadata = {
  title: "AphasiaBridge — Thinking Machines' Tinker Neural Voice Instrument",
  description: "Next-generation offline assistive speech instrument for expressive aphasia, fine-tuned with Thinking Machines' Tinker and restored with ElevenLabs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
