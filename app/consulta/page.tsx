"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Download, Layers, Search, ZoomIn, ZoomOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapComponent } from "@/components/map-component"
import { PropertyDetails } from "@/components/property-details"
import { searchCatastralService } from "@/lib/catastral-service"

export default function ConsultaPage() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [coordX, setCoordX] = useState("")
  const [coordY, setCoordY] = useState("")
  const [codigoCatastral, setCodigoCatastral] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [noResults, setNoResults] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeSearchTab, setActiveSearchTab] = useState("propietario")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reiniciar estados
    setSelectedProperty(null)
    setSearchResults([])
    setNoResults(false)
    setError(null)
    setIsSearching(true)

    try {
      // Preparar los parámetros de búsqueda según el tipo
      let searchParams: any = {}

      if (activeSearchTab === "propietario") {
        if (!searchQuery.trim()) {
          throw new Error("Por favor ingrese un nombre de propietario para buscar")
        }
        searchParams = { type: "owner", query: searchQuery.trim() }
      } else if (activeSearchTab === "coordenadas") {
        if (!coordX.trim() || !coordY.trim()) {
          throw new Error("Por favor ingrese ambas coordenadas (X e Y)")
        }

        // Validar que sean números
        const x = Number(coordX)
        const y = Number(coordY)

        if (isNaN(x) || isNaN(y)) {
          throw new Error("Las coordenadas deben ser valores numéricos")
        }

        searchParams = { type: "coordinates", x, y }
      } else if (activeSearchTab === "codigo") {
        if (!codigoCatastral.trim()) {
          throw new Error("Por favor ingrese un código catastral para buscar")
        }
        searchParams = { type: "code", code: codigoCatastral.trim() }
      }

      // Realizar la búsqueda en el servicio catastral
      const results = await searchCatastralService(searchParams)

      // Actualizar estados con los resultados
      setSearchResults(results)
      setNoResults(results.length === 0)

      // Si solo hay un resultado, seleccionarlo automáticamente
      if (results.length === 1) {
        setSelectedProperty(results[0])
      }
    } catch (err: any) {
      console.error("Error en la búsqueda:", err)
      setError(err.message || "Ocurrió un error al realizar la búsqueda")
      setNoResults(true)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSelectProperty = (property: any) => {
    setSelectedProperty(property)
    // Cambiar a la pestaña de detalles automáticamente
    const detallesTab = document.getElementById("detalles-tab")
    if (detallesTab) {
      detallesTab.click()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-700 text-white py-3 px-6 flex items-center">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-green-100">
          <ChevronLeft className="h-5 w-5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="flex items-center gap-10 ml-8">
        <img src="/logo_jesuss.png" alt="Escudo de la Municipalidad Distrital de Jesús" className="h-12 w-auto" />
        </div>
        
        <h1 className="text-xl font-bold mx-auto">Consulta Catastral Jesús</h1>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 p-4 bg-gray-50 overflow-y-auto">
          <Card>
            <CardHeader>
              <CardTitle>Búsqueda de Predios</CardTitle>
              <CardDescription>Busque por propietario, código catastral o coordenadas UTM</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="searchType">Tipo de búsqueda</Label>
                  <Tabs
                    defaultValue="propietario"
                    className="w-full"
                    onValueChange={(value) => setActiveSearchTab(value)}
                  >
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="propietario">Propietario</TabsTrigger>
                      <TabsTrigger value="codigo">Código</TabsTrigger>
                      <TabsTrigger value="coordenadas">Coordenadas</TabsTrigger>
                    </TabsList>
                    <TabsContent value="propietario" className="space-y-2 pt-2">
                      <Label htmlFor="propietario">Nombre del propietario</Label>
                      <Input
                        id="propietario"
                        placeholder="Ej: Juan Carmona Mendoza"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </TabsContent>
                    <TabsContent value="codigo" className="space-y-2 pt-2">
                      <Label htmlFor="codigo">Código catastral</Label>
                      <Input
                        id="codigo"
                        placeholder="Ej: 12345-123-123"
                        value={codigoCatastral}
                        onChange={(e) => setCodigoCatastral(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Ingrese el código catastral completo del predio</p>
                    </TabsContent>
                    <TabsContent value="coordenadas" className="space-y-4 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="coordX">Este (X) - UTM</Label>
                          <Input
                            id="coordX"
                            placeholder="Ej: 765432.45"
                            value={coordX}
                            onChange={(e) => setCoordX(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="coordY">Norte (Y) - UTM</Label>
                          <Input
                            id="coordY"
                            placeholder="Ej: 9234567.89"
                            value={coordY}
                            onChange={(e) => setCoordY(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">Sistema de coordenadas: WGS 1984 UTM Zone 17S</div>
                    </TabsContent>
                  </Tabs>
                </div>
                <Button type="submit" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </form>

              <div className="mt-6">
                <Tabs defaultValue="busqueda">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="busqueda">Resultados</TabsTrigger>
                    <TabsTrigger id="detalles-tab" value="detalles">
                      Detalles
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="busqueda" className="space-y-4">
                    {isSearching ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700 mx-auto mb-4"></div>
                        <p>Buscando en el catastro...</p>
                      </div>
                    ) : error ? (
                      <div className="text-center py-6 text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 mx-auto mb-2 opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p>{error}</p>
                      </div>
                    ) : noResults ? (
                      <div className="text-center py-8 text-gray-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 mx-auto mb-2 opacity-30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p>No se encontraron predios con los criterios especificados.</p>
                        <p className="text-sm mt-2">Intente con otros términos de búsqueda.</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500 mb-2">Se encontraron {searchResults.length} resultados:</p>
                        {searchResults.map((property) => (
                          <div
                            key={property.id}
                            className="p-3 border rounded-md cursor-pointer hover:bg-green-50"
                            onClick={() => handleSelectProperty(property)}
                          >
                            <p className="font-medium">{property.direccion}</p>
                            <p className="text-sm text-gray-500">Código: {property.codigo}</p>
                            <p className="text-sm text-gray-500">Propietario: {property.propietario}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-30" />
                        <p>Realice una búsqueda para ver resultados</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="detalles">
                    {selectedProperty ? (
                      <PropertyDetails property={selectedProperty} />
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <p>Seleccione un predio para ver sus detalles</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-2/3 relative">
          <MapComponent selectedProperty={selectedProperty} />

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="bg-white shadow-md">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-white shadow-md">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-white shadow-md">
              <Layers className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-white shadow-md">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-green-800 text-white py-3 px-6 text-center text-sm">
        <p>© 2025 Municipalidad Distrital de Jesús. Sistema de Información Geográfica Catastral.</p>
      </footer>
    </div>
  )
}
