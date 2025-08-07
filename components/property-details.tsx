"use client"

import { useRef } from "react"
import { getHtml2Pdf } from "@/utils/html2pdf-client"

import { Download, FileText, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface PropertyDetailsProps {
  property: {
    id: string
    codigo: string
    direccion: string
    propietario: string
    area: string
    perimetro: string
    zonificacion: string
    referenciaCatastral: string
    fechaRegistro?: string
    valorCatastral?: string
    usoSuelo?: string
    materialConstruccion?: string
    antiguedadConstruccion?: string
    estadoConservacion?: string
    servicios?: string[]
    coordenadas: { x: string; y: string }[]
    geoCoords?: [number, number][]
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const fichaRef = useRef<HTMLDivElement>(null)

  const handleDescargarPDF = async () => {
    if (!fichaRef.current) return

    const html2pdf = await getHtml2Pdf()

    const opt = {
      margin: 0.5,
      filename: `ficha-catastral-${property.codigo}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    }

    // Esperamos un pequeño momento para asegurarnos de que todo esté renderizado
    setTimeout(() => {
      html2pdf().set(opt).from(fichaRef.current!).save()
    }, 100)
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent ref={fichaRef} className="px-0 space-y-4">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-700" />
            {property.direccion}
          </CardTitle>
        </CardHeader>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Código Catastral</p>
            <p className="font-medium">{property.codigo}</p>
          </div>
          <div>
            <p className="text-gray-500">Propietario</p>
            <p className="font-medium flex items-center gap-1">
              <User className="h-3 w-3" />
              {property.propietario}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Área</p>
            <p className="font-medium">{property.area}</p>
          </div>
          <div>
            <p className="text-gray-500">Perímetro</p>
            <p className="font-medium">{property.perimetro}</p>
          </div>
          <div>
            <p className="text-gray-500">Zonificación</p>
            <p className="font-medium">{property.zonificacion}</p>
          </div>
          <div>
            <p className="text-gray-500">Ref. Catastral</p>
            <p className="font-medium">{property.referenciaCatastral}</p>
          </div>
        </div>

        {property.fechaRegistro && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Fecha de Registro</p>
                <p className="font-medium">{property.fechaRegistro}</p>
              </div>
              <div>
                <p className="text-gray-500">Valor Catastral</p>
                <p className="font-medium">{property.valorCatastral}</p>
              </div>
              <div>
                <p className="text-gray-500">Uso de Suelo</p>
                <p className="font-medium">{property.usoSuelo}</p>
              </div>
              <div>
                <p className="text-gray-500">Material</p>
                <p className="font-medium">{property.materialConstruccion}</p>
              </div>
              <div>
                <p className="text-gray-500">Antigüedad</p>
                <p className="font-medium">{property.antiguedadConstruccion}</p>
              </div>
              <div>
                <p className="text-gray-500">Estado</p>
                <p className="font-medium">{property.estadoConservacion}</p>
              </div>
            </div>

            {property.servicios && (
              <div className="text-sm">
                <p className="text-gray-500 mb-1">Servicios</p>
                <div className="flex flex-wrap gap-1">
                  {property.servicios.map((servicio, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {servicio}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <Separator />

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-700"
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
            Coordenadas UTM (WGS 1984 UTM Zone 17S)
          </h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Vértice</TableHead>
                <TableHead>Este (X)</TableHead>
                <TableHead>Norte (Y)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {property.coordenadas.map((coord, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{coord.x}</TableCell>
                  <TableCell>{coord.y}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="px-0 flex justify-between">
        <Button variant="outline" size="sm" className="gap-1" onClick={handleDescargarPDF}>
          <FileText className="h-4 w-4" />
          Ficha Catastral
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Descargar Plano
        </Button>
      </CardFooter>
    </Card>
  )
}
