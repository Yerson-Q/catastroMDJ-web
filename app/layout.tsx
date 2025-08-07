import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Información Geográfica Catastral - Municipalidad Distrital de Jesús",
  description:
    "Consulta geográfica catastral en Sistema de Información Geográfica (SIG) de la Municipalidad Distrital de Jesús, Cajamarca, Perú",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/escudo-jesus.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
