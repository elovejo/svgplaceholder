// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar __dirname en módulos ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Función para calcular el tamaño de fuente proporcional
const calculateFontSize = (width, height, text = "") => {
    const minDim = Math.min(width, height);
    const maxDim = Math.max(width, height);

    let fontSize = Math.max(minDim * 0.15, 16);
    const length = text.length || `${width} x ${height}`.length;

    if (length > 10) fontSize = Math.max(fontSize * 0.9, 14);
    if (length > 18) fontSize = Math.max(fontSize * 0.8, 12);

    return Math.min(fontSize, maxDim * 0.25);
};

// Función para validar colores hexadecimales
const isValidColor = (color) => {
    return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(color);
};

// Función principal para generar el SVG
const generateSvg = (
    dimensions,
    bgColor = "ccc",
    textColor = "000",
    customText = null
) => {
    const [width, height = width] = dimensions.split("x").map(Number);

    if (isNaN(width) || isNaN(height) || width === 0 || height === 0) {
        throw new Error("Dimensiones inválidas");
    }

    if (width > 5000 || height > 5000) {
        throw new Error("Dimensiones demasiado grandes");
    }

    if (bgColor && !isValidColor(bgColor)) bgColor = "ccc";
    if (textColor && !isValidColor(textColor)) textColor = "000";

    const text = customText
        ? decodeURIComponent(customText)
        : `${width} x ${height}`;
    const fontSize = calculateFontSize(width, height, text);

    return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#${bgColor}" />
  <text
    x="50%"
    y="50%"
    font-family="Arial, sans-serif"
    font-size="${fontSize}"
    fill="#${textColor}"
    text-anchor="middle"
    dy=".3em">
    ${text}
  </text>
</svg>`;
};

// Middleware para manejar rutas dinámicas
const handleSvgGeneration = (req, res) => {
    try {
        const { dimensions, bgColor, textColor, customText } = req.params;
        const svg = generateSvg(dimensions, bgColor, textColor, customText);

        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=3600");
        res.send(svg);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Rutas específicas de la más específica a la más general
app.get("/:dimensions/:bgColor/:textColor/:customText", handleSvgGeneration);
app.get("/:dimensions/:bgColor/:textColor", handleSvgGeneration);
app.get("/:dimensions/:bgColor", handleSvgGeneration);
app.get("/:dimensions", handleSvgGeneration);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});
