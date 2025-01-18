import "./Styles.css";

export const metadata = {
  title: "Liam Schenk – Portfolio",
  description: "Portfolio von Liam Schenk, Mediamatiker in Ausbildung.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
