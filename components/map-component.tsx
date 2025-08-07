"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

const mapStyles = `
  .leaflet-container {
    background-color: #f8fafc;
    border-radius: 0.5rem;
  }
  .predio-label {
    text-align: center;
    white-space: nowrap;
  }
  .vertex-label {
    background: none;
    border: none;
    box-shadow: none;
    font-size: 10px;
    font-weight: bold;
    color: #0284c7;
    text-shadow: 1px 1px 1px white;
  }
`

interface MapComponentProps {
  selectedProperty: any | null
}

export function MapComponent({ selectedProperty }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const propertyLayerRef = useRef<any>(null)

  useEffect(() => {
    const initMap = async () => {
      const L = await import("leaflet")
      if (!leafletMapRef.current && mapRef.current) {
        const initialCoords: [number, number] = [-7.2458, -78.3861]
        const map = L.map(mapRef.current).setView(initialCoords, 14)
        leafletMapRef.current = map

        const baseMaps = {
          OpenStreetMap: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }),
          Satélite: L.tileLayer(
                       "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
          {
            attribution: "Map data © Google",
            maxZoom: 20,
          }
          ),
        }

        baseMaps.OpenStreetMap.addTo(map)

        L.control.scale({ imperial: false }).addTo(map)
        propertyLayerRef.current = L.layerGroup().addTo(map)

        const overlayMaps: Record<string, any> = {}
        const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map)

        map.on("baselayerchange", function (e: any) {
          if (e.name === "Satélite") {
            map.setMaxZoom(22)
          } else {
            map.setMaxZoom(19)
          }
        })

        const cargarCapaGeoJSON = (
          url: string,
          nombreCapa: string,
          estilo: any,
          visiblePorDefecto: boolean = false
        ) => {
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              const capa = L.geoJSON(data, {
                style: estilo,
                onEachFeature: (feature: any, layer: any) => {
                  const props = feature.properties || {}
                  const popup = `
                    <strong>${props.nombre || nombreCapa}</strong><br/>
                    ${props.codigo ? "Código: " + props.codigo + "<br/>" : ""}
                    ${props.area ? "Área: " + props.area + "<br/>" : ""}
                  `
                  layer.bindPopup(popup)
                },
              })

              if (visiblePorDefecto) capa.addTo(map)
              overlayMaps[nombreCapa] = capa
              layerControl.addOverlay(capa, nombreCapa)
            })
            .catch((err) => console.error(`Error cargando ${nombreCapa}:`, err))
        }

        cargarCapaGeoJSON("/data/vivi.geojson", "Viviendas", {
          color: "#22c55e",
          fillOpacity: 0.4,
          weight: 2,
        }, true)       

        cargarCapaGeoJSON("/data/MANZANAS.geojson", "Manzanas", {
          color: "#f97316",
          fillOpacity: 0.3,
          weight: 1,
        }, false)
      }
    }

    initMap()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const updateMap = async () => {
      const L = await import("leaflet")
      if (!leafletMapRef.current || !propertyLayerRef.current) return

      propertyLayerRef.current.clearLayers()

      if (selectedProperty) {
        const geoCoords = selectedProperty.geoCoords || [
          [-7.2458, -78.3861],
          [-7.2453, -78.3861],
          [-7.2453, -78.3856],
          [-7.2458, -78.3856],
        ]

        const polygon = L.polygon(geoCoords, {
          color: "#0284c7",
          fillColor: "#38bdf8",
          fillOpacity: 0.5,
          weight: 3,
          dashArray: "",
        }).addTo(propertyLayerRef.current)

        geoCoords.forEach((coord: [number, number], index: number) => {
          const marker = L.circleMarker(coord, {
            radius: 5,
            fillColor: "#0284c7",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(propertyLayerRef.current)

          if (selectedProperty.coordenadas && selectedProperty.coordenadas[index]) {
            const utm = selectedProperty.coordenadas[index]
            marker.bindTooltip(`Vértice ${index + 1}<br>X: ${utm.x}<br>Y: ${utm.y}`, {
              permanent: false,
              direction: "top",
            })
          }

          L.marker(coord, {
            icon: L.divIcon({
              className: "vertex-label",
              html: `${index + 1}`,
              iconSize: [20, 20],
              iconAnchor: [10, 10],
            }),
          }).addTo(propertyLayerRef.current)
        })

        const center = polygon.getBounds().getCenter()
        L.marker(center, {
          icon: L.divIcon({
            className: "predio-label",
            html: `<div style="background-color: rgba(255,255,255,0.8); padding: 3px 6px; border-radius: 3px; font-size: 12px; font-weight: bold;">${selectedProperty.codigo}</div>`,
            iconSize: [100, 20],
            iconAnchor: [50, 10],
          }),
        }).addTo(propertyLayerRef.current)

        polygon.bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">${selectedProperty.direccion}</h3>
            <p><strong>Código:</strong> ${selectedProperty.codigo}</p>
            <p><strong>Área:</strong> ${selectedProperty.area}</p>
            <p><strong>Zonificación:</strong> ${selectedProperty.zonificacion}</p>
            <p><strong>Propietario:</strong> ${selectedProperty.propietario}</p>
            
          </div>
        `)

        leafletMapRef.current.fitBounds(polygon.getBounds(), {
          padding: [50, 50],
          maxZoom: 22,
        })

        polygon.openPopup()
      } else {
        const center = leafletMapRef.current.getCenter()
        L.marker(center, {
          icon: L.divIcon({
            className: "map-message",
            html: `<div style="background-color: rgba(255,255,255,0.9); padding: 10px 15px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; width: 250px;">
              <p style="margin: 0; font-weight: bold;">Visor Catastral</p>
              <p style="margin: 5px 0 0; font-size: 13px;">Busque un predio para visualizarlo en el mapa</p>
            </div>`,
            iconSize: [250, 80],
            iconAnchor: [125, 40],
          }),
        }).addTo(propertyLayerRef.current)
      }
    }

    updateMap()
  }, [selectedProperty])

  return (
    <>
      <style>{mapStyles}</style>
      <div ref={mapRef} className="w-full h-full min-h-[500px]" />
    </>
  )
}
