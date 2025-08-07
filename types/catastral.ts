/**
 * Tipos para el servicio catastral
 */

// Parámetros de búsqueda
export interface CatastralSearchParams {
  type: "address" | "owner" | "coordinates" | "code"
  query?: string
  x?: number
  y?: number
  code?: string
}

// Datos de un predio
export interface PropertyData {
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

// Respuesta de la API de búsqueda
export interface SearchResponse {
  success: boolean
  count: number
  results: PropertyData[]
  error?: string
}

// Respuesta de la API de detalles
export interface PropertyResponse {
  success: boolean
  property: PropertyData | null
  error?: string
}
