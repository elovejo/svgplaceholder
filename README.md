# 🖼️ SVG Placeholder Generator

Servicio ligero desplegado en Vercel para generar imágenes SVG dinámicas como placeholders. Ideal para diseñadores, desarrolladores front-end y pruebas visuales sin depender de imágenes reales.

> 👉 Úsalo directamente desde la URL de producción sin instalar nada.

---

## 🌐 ¿Qué hace?

Genera imágenes SVG personalizadas que puedes insertar en cualquier entorno web, simplemente accediendo a una URL como esta:

```
https://svgplaceholder.vercel.app/300x200/ff0000/ffffff/Hello%20World
```

---

## 🚀 Ejemplos de uso

| URL | Resultado |
|-----|----------|
| `/300x200` | Imagen gris con texto `300x200` |
| `/400x300/e74c3c` | Fondo rojo con texto negro |
| `/500x200/3498db/ffffff` | Fondo azul con texto blanco |
| `/600x400/2c3e50/ecf0f1/Hello%20World` | Texto personalizado en blanco |

> 🔗 **Base URL (en producción):**
>
> ```
> https://svgplaceholder.vercel.app/
> ```

---

## 🔧 Formato de la URL

```
https://svgplaceholder.vercel.app/:dimensions/:bgColor?/:textColor?/:customText?
```

- `dimensions` → obligatorio (ej. `300x200`)
- `bgColor` → opcional, color de fondo en HEX sin `#` (ej. `ff0000`)
- `textColor` → opcional, color del texto en HEX sin `#` (ej. `ffffff`)
- `customText` → opcional, texto personalizado (codificado en URL)

---

## 🧪 Ejemplos prácticos para usar en HTML

```html
<img src="https://svgplaceholder.vercel.app/400x300" alt="placeholder" />
<img src="https://svgplaceholder.vercel.app/600x400/2c3e50/ecf0f1/Hello%20World" alt="custom" />
```

---

## 🛡️ Validaciones automáticas

- Dimensiones máximas: `5000x5000`.
- Colores inválidos se reemplazan por defecto (`ccc` para fondo, `000` para texto).
- Tamaño de fuente proporcional al tamaño del SVG y texto.

---

## ⚙️ ¿Quieres instalarlo localmente?

Aunque no es necesario, puedes correrlo localmente si lo deseas:

```bash
git clone https://github.com/elovejo/svgplaceholder.git
cd svgplaceholder
npm install
npm start
```

---


## 📄 Licencia

MIT © 2025 — elovejo
