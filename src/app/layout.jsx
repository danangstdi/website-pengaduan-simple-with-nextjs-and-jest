import './globals.css'
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: process.env.APP_NAME || "JalanKita",
  icons: {
    icon: "/favicon.ico"
  },
  applicationName: process.env.APP_NAME || "JalanKita",
  creator: "Danang Setiadi",
  keywords: [
    process.env.APP_NAME,
    "pengaduan",
    "layanan masyarakat",
    "layanan pengaduan",
    "kerusakan infrastruktur",
  ],
  description: `${process.env.APP_NAME} adalah platform pengaduan ....`,
  openGraph: {
    title: `${process.env.APP_NAME} - Platform Pengaduan Kerusakan Fasilitas`,
    description:
      `Beli tiket konser favorit secara online dengan mudah dan cepat. Temukan konser terbaru dan pesan tiket hanya di ${process.env.APP_NAME}.`,
    url: process.env.APP_URL,
    siteName: process.env.APP_SITENAME,
    images: [
      {
        url: process.env.APP_IMAGE,
        width: 1200,
        height: 630,
        alt: `${process.env.APP_NAME} Banner`,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.APP_NAME,
    description:
      `Beli tiket konser favorit secara online dengan mudah dan cepat. Temukan konser terbaru dan pesan tiket hanya di ${process.env.APP_NAME}.`,
    // site: "@tiketkonser",
    creator: "@danangstd_",
    images: [process.env.APP_IMAGE],
  },
  custom: {
    email: [
      'danangstd17@gmail.com',
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {metadata.custom.email.map((email) => (
          <meta key={email} name="informatikaundar:email" content={email} />
        ))}
      </head>
      <body className="poppins bg-slate-200">
        <NextTopLoader color="#10b981" height={5} crawl={true} showSpinner={false} showAtBottom={false}/>
        {children}
      </body>
    </html>
  )
}
