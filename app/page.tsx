import Link from "next/link"
import { MapIcon as MapSearch } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
  <header className="bg-green-700 text-white py-4 px-4 md:px-8">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/logo_jesuss.png" alt="Escudo de la Municipalidad Distrital de Jesús" className="h-12 w-auto" />
      </div>
      <nav className="hidden md:flex gap-6">
        <Link href="/" className="hover:underline font-medium">
          Inicio
        </Link>
        <Link href="/consulta" className="hover:underline font-medium">
          Consulta Catastral
        </Link>
      </nav>
    </div>
  </header>

      <main className="flex-1">
        <section className="bg-gradient-to-b from-green-50 to-white py-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              Sistema de Información Geográfica Catastral
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Consulte información geográfica y catastral de predios en el Distrito de Jesús de manera rápida y
              sencilla.
            </p>
            <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
              <Link href="/consulta">
                <MapSearch className="mr-2 h-5 w-5" />
                Iniciar Consulta Catastral
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">Características del Sistema</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">Consulta Geográfica</h3>
                <p className="text-gray-700">
                  Visualice la ubicación exacta de predios en el mapa interactivo con sistema de coordenadas WGS 1984
                  UTM Zone 17S.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">Búsqueda de Predios</h3>
                <p className="text-gray-700">
                  Busque predios por dirección, código catastral o nombre del propietario de manera rápida y eficiente.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"    
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">Información Detallada</h3>
                <p className="text-gray-700">
                  Acceda a información detallada de cada predio, incluyendo área, perímetro, zonificación y datos
                  registrales.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-6 bg-green-50">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl font-bold mb-4 text-green-800">Modernización de la Gestión Municipal</h2>
                  <p className="text-gray-700 mb-4">
                    Este sistema forma parte de los esfuerzos de modernización de la Municipalidad Distrital de Jesús,
                    permitiendo a los ciudadanos acceder a información catastral de manera transparente y eficiente.
                  </p>
                  <p className="text-gray-700 mb-4">
                    La plataforma utiliza tecnología GIS avanzada para proporcionar datos precisos y actualizados sobre
                    los predios del distrito.
                  </p>
                  <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50">
                    Conocer más
                  </Button>
                </div>
                <div className="md:w-1/2 bg-green-100 flex items-center justify-center p-8">
                  <img
                    src="/municipalidad.jpg?height=300&width=400"
                    alt="Mapa catastral del Distrito de Jesús"
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Municipalidad Distrital de Jesús</h3>
              <p className="text-green-100 mb-2">Jr. Miguel Grau N°706</p>
              <p className="text-green-100 mb-2">Cajamarca - Cajamarca - Jesús</p>
              <p className="text-green-100">mdj@munijesus.gob.pe</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-green-100 hover:underline">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="consulta" className="text-green-100 hover:underline">
                    Consulta Catastral
                  </Link>
                </li>
                
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Horario de Atención</h3>
              <p className="text-green-100 mb-2">Lunes a Viernes</p>
              <p className="text-green-100 mb-4">8:00 am - 5:00 pm</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-white hover:text-green-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-green-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-green-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center text-green-200">
            <p>© 2025 Municipalidad Distrital de Jesús. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
