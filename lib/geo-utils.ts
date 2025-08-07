/**
 * Utilidades para conversión y manipulación de coordenadas geográficas
 */

// Definir ubicaciones predefinidas en diferentes partes del distrito de Jesús, Cajamarca
const predefinedLocations = [
  { lat: -7.2458, lng: -78.3861 }, // Centro de Jesús
  { lat: -7.252, lng: -78.392 }, // Zona sur
  { lat: -7.24, lng: -78.38 }, // Zona norte
  { lat: -7.248, lng: -78.375 }, // Zona este
  { lat: -7.243, lng: -78.395 }, // Zona oeste
  { lat: -7.238, lng: -78.383 }, // Zona noreste
  { lat: -7.251, lng: -78.378 }, // Zona sureste
  { lat: -7.239, lng: -78.393 }, // Zona noroeste
  { lat: -7.254, lng: -78.389 }, // Zona suroeste
  { lat: -7.247, lng: -78.384 }, // Zona central alternativa
]

/**
 * Obtiene una ubicación geográfica predefinida basada en un índice
 * @param index Índice de la ubicación
 * @returns Ubicación geográfica {lat, lng}
 */
export function getRandomLocation(index: number): { lat: number; lng: number } {
  // Asegurar que el índice esté dentro del rango de ubicaciones predefinidas
  const safeIndex = index % predefinedLocations.length

  // Obtener la ubicación base
  const baseLocation = predefinedLocations[safeIndex]

  // Añadir una pequeña variación aleatoria para que no todos los predios estén exactamente en el mismo lugar
  return {
    lat: baseLocation.lat + (Math.random() * 0.005 - 0.0025),
    lng: baseLocation.lng + (Math.random() * 0.005 - 0.0025),
  }
}

/**
 * Simula la conversión de coordenadas UTM a coordenadas geográficas (lat/lng)
 * En una implementación real, se usaría una biblioteca como proj4js para la conversión precisa
 *
 * @param utmCoords Coordenadas UTM
 * @param baseLocation Ubicación base para generar el polígono
 * @returns Coordenadas geográficas [lat, lng][]
 */
export function generatePolygonFromUTM(
  utmCoords: { x: string; y: string }[],
  baseLocation?: { lat: number; lng: number },
): [number, number][] {
  // Si no se proporciona una ubicación base, usar una aleatoria
  const baseLat = baseLocation?.lat || predefinedLocations[Math.floor(Math.random() * predefinedLocations.length)].lat
  const baseLng = baseLocation?.lng || predefinedLocations[Math.floor(Math.random() * predefinedLocations.length)].lng

  // Crear un polígono basado en las coordenadas UTM proporcionadas
  // Simulamos la conversión manteniendo la forma del polígono
  const geoCoords: [number, number][] = []

  // Encontrar los valores mínimos y máximos de las coordenadas UTM
  const xValues = utmCoords.map((coord) => Number.parseFloat(coord.x))
  const yValues = utmCoords.map((coord) => Number.parseFloat(coord.y))

  const minX = Math.min(...xValues)
  const maxX = Math.max(...xValues)
  const minY = Math.min(...yValues)
  const maxY = Math.max(...yValues)

  // Calcular el ancho y alto del polígono en coordenadas UTM
  const utmWidth = maxX - minX
  const utmHeight = maxY - minY

  // Factor de escala para convertir de UTM a grados (simulado)
  // En una implementación real, esto dependería de la zona UTM y la latitud
  const scaleFactor = 0.00001

  // Tamaño máximo del polígono en grados (para evitar polígonos demasiado grandes)
  const maxSizeInDegrees = 0.003 // Aproximadamente 300 metros

  // Calcular el factor de escala ajustado para mantener el polígono en un tamaño razonable
  const adjustedScaleFactor = Math.min(scaleFactor, maxSizeInDegrees / Math.max(utmWidth, utmHeight))

  // Convertir cada coordenada UTM a geográfica
  for (const coord of utmCoords) {
    const x = Number.parseFloat(coord.x)
    const y = Number.parseFloat(coord.y)

    // Calcular la posición relativa dentro del polígono (0-1)
    const relX = (x - minX) / utmWidth
    const relY = (y - minY) / utmHeight

    // Convertir a coordenadas geográficas (simulado)
    // En una implementación real, se usaría proj4js u otra biblioteca
    const lat = baseLat + (relY - 0.5) * utmHeight * adjustedScaleFactor
    const lng = baseLng + (relX - 0.5) * utmWidth * adjustedScaleFactor

    geoCoords.push([lat, lng])
  }

  return geoCoords
}

/**
 * Calcula el área de un polígono en metros cuadrados
 * @param coords Coordenadas del polígono
 * @returns Área en metros cuadrados
 */
export function calculateArea(coords: { x: string; y: string }[]): number {
  // Implementación del algoritmo del área de un polígono
  let area = 0

  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length
    area += Number.parseFloat(coords[i].x) * Number.parseFloat(coords[j].y)
    area -= Number.parseFloat(coords[j].x) * Number.parseFloat(coords[i].y)
  }

  return Math.abs(area / 2)
}

/**
 * Calcula el perímetro de un polígono en metros
 * @param coords Coordenadas del polígono
 * @returns Perímetro en metros
 */
export function calculatePerimeter(coords: { x: string; y: string }[]): number {
  let perimeter = 0

  for (let i = 0; i < coords.length; i++) {
    const j = (i + 1) % coords.length
    const dx = Number.parseFloat(coords[j].x) - Number.parseFloat(coords[i].x)
    const dy = Number.parseFloat(coords[j].y) - Number.parseFloat(coords[i].y)
    perimeter += Math.sqrt(dx * dx + dy * dy)
  }

  return perimeter
}
