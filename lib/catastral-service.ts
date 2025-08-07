// Servicio catastral que genera datos dinámicos basados en los parámetros de búsqueda
// Simula una conexión a un servicio real

import type { CatastralSearchParams, PropertyData } from "@/types/catastral"

import { generatePolygonFromUTM, getRandomLocation } from "@/lib/geo-utils"

/**
 * Función que realiza la búsqueda en el servicio catastral
 * Esta implementación genera datos dinámicos basados en los parámetros de búsqueda
 */
export async function searchCatastralService(params: CatastralSearchParams): Promise<PropertyData[]> {
  // Simular tiempo de respuesta de la API
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generar resultados basados en los parámetros de búsqueda
  const results: PropertyData[] = []

  // Determinar cuántos resultados generar (entre 1 y 3)
  const numResults = Math.floor(Math.random() * 3) + 1

  // Generar datos basados en el tipo de búsqueda
  if (params.type === "owner") {
    const query = params.query || ""

    for (let i = 0; i < numResults; i++) {
      results.push(
        generateProperty({
          id: `O${i + 1}`,
          owner: query,
          searchType: "owner",
          locationIndex: i, // Usar un índice diferente para cada resultado
        }),
      )
    }
  } else if (params.type === "coordinates") {
    const x = params.x || 0
    const y = params.y || 0

    // Generar un solo resultado para coordenadas
    results.push(
      generateProperty({
        id: "C1",
        x: x,
        y: y,
        searchType: "coordinates",
      }),
    )
  } else if (params.type === "code") {
    const code = params.code || ""

    // Generar un solo resultado para código catastral
    // Usar un índice de ubicación basado en el código para que sea consistente
    const locationIndex = code.length % 10

    results.push(
      generateProperty({
        id: "CD1",
        code: code,
        searchType: "code",
        locationIndex: locationIndex,
      }),
    )
  }

  return results
}

/**
 * Función para obtener los detalles completos de un predio
 */
export async function getPropertyDetails(propertyId: string): Promise<PropertyData | null> {
  // Simular tiempo de respuesta de la API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generar detalles para el predio solicitado
  return generateProperty({ id: propertyId, searchType: "id" })
}

/**
 * Función auxiliar para generar datos de un predio
 */
function generateProperty(options: {
  id: string
  street?: string
  number?: number
  owner?: string
  x?: number
  y?: number
  code?: string
  searchType: "address" | "owner" | "coordinates" | "code" | "id"
  locationIndex?: number
}): PropertyData {
  // Generar un código catastral único o usar el proporcionado
  const codigo =
    options.code ||
    `${Math.floor(Math.random() * 99999) + 10000}-${Math.floor(Math.random() * 999) + 100}-${Math.floor(Math.random() * 999) + 100}`

  // Generar dirección
  let direccion = ""
  if (options.street && options.number) {
    direccion = `${options.street} ${options.number}`
  } else if (options.searchType === "owner") {
    const streets = [
      "Jr. Miguel Grau",
      "Jr. Bolívar",
      "Jr. San Martín",
      "Av. Cajamarca",
      "Calle Real",
      "Jr. Lima",
      "Av. Perú",
    ]
    const street = streets[Math.floor(Math.random() * streets.length)]
    const number = Math.floor(Math.random() * 500) + 100
    direccion = `${street} ${number}`
  } else if (options.searchType === "coordinates") {
    direccion = "Predio sin dirección registrada"
  } else if (options.searchType === "code") {
    direccion = `Predio con código ${options.code}`
  } else {
    direccion = `Calle ${Math.floor(Math.random() * 50) + 1} N° ${Math.floor(Math.random() * 500) + 100}`
  }

  // Generar propietario
  let propietario = ""
  if (options.owner) {
    propietario = options.owner
  } else {
    const nombres = ["Juan", "María", "Pedro", "Ana", "Luis", "Carmen", "José", "Rosa", "Carlos", "Lucía"]
    const apellidos = [
      "Carmona",
      "García",
      "Rodríguez",
      "López",
      "Martínez",
      "González",
      "Sánchez",
      "Romero",
      "Torres",
      "Díaz",
    ]
    propietario = `${nombres[Math.floor(Math.random() * nombres.length)]} ${apellidos[Math.floor(Math.random() * apellidos.length)]}`
  }

  // Generar área y perímetro
  const width = Math.floor(Math.random() * 50) + 10
  const height = Math.floor(Math.random() * 50) + 10
  const area = `${(width * height).toFixed(2)} m²`
  const perimetro = `${(2 * (width + height)).toFixed(2)} m`

  // Generar zonificación
  const zonificaciones = [
    "Residencial R4",
    "Residencial R3",
    "Comercial C2",
    "Mixto RM",
    "Agrícola AG",
    "Industrial I1",
    "Educación E1",
  ]
  const zonificacion = zonificaciones[Math.floor(Math.random() * zonificaciones.length)]

  // Generar referencia catastral
  const referenciaCatastral = `RC-${Math.floor(Math.random() * 99999) + 10000}`

  // Generar fecha de registro
  const year = Math.floor(Math.random() * 10) + 2010
  const month = Math.floor(Math.random() * 12) + 1
  const day = Math.floor(Math.random() * 28) + 1
  const fechaRegistro = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`

  // Generar valor catastral
  const valorCatastral = `S/ ${(Math.random() * 500000 + 50000).toFixed(2)}`

  // Generar uso de suelo
  const usosSuelo = [
    "Vivienda unifamiliar",
    "Vivienda multifamiliar",
    "Comercio",
    "Mixto",
    "Agrícola",
    "Industrial",
    "Educativo",
  ]
  const usoSuelo = usosSuelo[Math.floor(Math.random() * usosSuelo.length)]

  // Generar material de construcción
  const materiales = ["Concreto", "Adobe", "Ladrillo", "Mixto", "Madera", "Prefabricado", "Material noble"]
  const materialConstruccion = materiales[Math.floor(Math.random() * materiales.length)]

  // Generar antigüedad de construcción
  const antiguedadConstruccion = `${Math.floor(Math.random() * 50) + 1} años`

  // Generar estado de conservación
  const estados = ["Excelente", "Bueno", "Regular", "Malo", "En construcción", "Ruinoso"]
  const estadoConservacion = estados[Math.floor(Math.random() * estados.length)]

  // Generar servicios
  const todosServicios = [
    "Agua",
    "Desagüe",
    "Electricidad",
    "Internet",
    "Gas",
    "Cable",
    "Telefonía",
    "Alumbrado público",
  ]
  const numServicios = Math.floor(Math.random() * 5) + 2
  const servicios = []
  for (let i = 0; i < numServicios; i++) {
    const servicio = todosServicios[i]
    if (servicio) servicios.push(servicio)
  }

  // Obtener una ubicación base diferente según el índice o coordenadas proporcionadas
  let baseX, baseY
  let geoLocation

  if (options.searchType === "coordinates" && options.x && options.y) {
    // Si se proporcionan coordenadas, usarlas directamente
    baseX = options.x
    baseY = options.y
    // Generar una ubicación geográfica basada en estas coordenadas
    geoLocation = {
      lat: -7.2458 + (Math.random() * 0.01 - 0.005),
      lng: -78.3861 + (Math.random() * 0.01 - 0.005),
    }
  } else {
    // Obtener una ubicación aleatoria pero consistente basada en el índice
    const locationIndex = options.locationIndex !== undefined ? options.locationIndex : Math.floor(Math.random() * 10)
    geoLocation = getRandomLocation(locationIndex)

    // Generar coordenadas UTM basadas en la ubicación geográfica (simulado)
    baseX = 765000 + Math.floor(Math.random() * 1000) + locationIndex * 1000
    baseY = 9234000 + Math.floor(Math.random() * 1000) + locationIndex * 500
  }

  // Generar un polígono rectangular con las dimensiones calculadas
  const coordenadas = [
    { x: baseX.toFixed(2), y: baseY.toFixed(2) },
    { x: (baseX + width).toFixed(2), y: baseY.toFixed(2) },
    { x: (baseX + width).toFixed(2), y: (baseY + height).toFixed(2) },
    { x: baseX.toFixed(2), y: (baseY + height).toFixed(2) },
  ]

  // Generar coordenadas geográficas a partir de la ubicación base
  const geoCoords = generatePolygonFromUTM(coordenadas, geoLocation)

  return {
    id: options.id,
    codigo,
    direccion,
    propietario,
    area,
    perimetro,
    zonificacion,
    referenciaCatastral,
    fechaRegistro,
    valorCatastral,
    usoSuelo,
    materialConstruccion,
    antiguedadConstruccion,
    estadoConservacion,
    servicios,
    coordenadas,
    geoCoords,
  }
}
