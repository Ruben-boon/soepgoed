import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.scss";
import NavMenu from "./components/nav-menu";
import Footer from "./components/footer";
import { fetchSettings, formatSettingsData } from "@/api/sanityApi";
import localFont from "@next/font/local";
import { useParams } from "next/navigation";


// const manrope = Manrope({
//   subsets: ["latin"],
//   weight: "400",
//   variable: "--font-manrope",
// });
const lambda = localFont({
  src: "../../../fonts/Lambda-Regular.ttf",
  weight: "400",
  variable: "--font-lambda",
});

const manrope = Manrope({ subsets: ["latin"] });

// Enable ISR with 60 second revalidation for layout data
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Soepgoed Leiden",
  description: "Bij soepgoed leiden koken we samen met groentes van de markt",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchSettings();
  const settingsData = formatSettingsData(data);

  return (
    <html lang="nl" className={`${manrope} ${lambda.variable}`}>
      <body className={manrope.className}>
        <NavMenu
          settings={settingsData.navSettings}
          menuAr={settingsData.menu}
        />
        {children}
        <Footer
          settings={settingsData.footerSettings}
          contactInfo={settingsData.contactInfo}
          logo={settingsData.navSettings}
          menuAr={settingsData.menu}
        />
      </body>
    </html>
  );
}
