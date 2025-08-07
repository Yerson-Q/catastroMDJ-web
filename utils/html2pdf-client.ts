// utils/html2pdf-client.ts

export const getHtml2Pdf = async () => {
  const module = await import("html2pdf.js")
  return module.default
}

