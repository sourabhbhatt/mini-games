import Topbar from "../Components/Topbar";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Web Duels",
  description: "TicTacToe, Rock Paper Scissors etc..",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <Topbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
