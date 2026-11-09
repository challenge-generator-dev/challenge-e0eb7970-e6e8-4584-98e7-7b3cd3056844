# Desarrollo de API REST para catálogo de productos

La empresa de venta de productos tecnológicos 'TechMarket' necesita una API REST para exponer su catálogo de productos. La API debe validar la entrada de datos y manejar los errores de manera centralizada. Los productos tienen atributos como nombre, precio, stock y categoría. La API debe prohibir precios negativos y nombres duplicados. En caso de validación fallida, debe responder con un mensaje de error específico. El catálogo se actualiza periódicamente y la API debe estar disponible con una latencia máxima de 100ms.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Construccion de APIs REST con Express |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y entregará cada archivo con su ruta.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y entregará cada archivo con su ruta. Guárdalos en la carpeta donde quieras trabajar, respetando las rutas.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no entrega todos los archivos al terminar el análisis, escríbele: "entrégame todos los archivos con su ruta".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición y configuración inicial

**Objetivo:** Configurar el entorno y definir la estructura básica de la API.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Configurar el proyecto con las dependencias necesarias.
- Definir la estructura básica de la API con un endpoint para listar productos.

**Entregable:** Proyecto configurado con un endpoint básico para listar productos.

<details>
<summary>Pistas de conocimiento</summary>

- Considera la estructura de un proyecto Node.js.
- Piensa en cómo organizar las rutas y controladores.

</details>

### Fase 2: Implementación de validaciones y manejo de errores

**Objetivo:** Agregar validaciones a los endpoints y manejar los errores de manera centralizada.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar validaciones para los atributos de los productos (nombre, precio, stock, categoría).
- Manejar los errores de validación y responder con mensajes de error específicos.

**Entregable:** API con validaciones implementadas y manejo centralizado de errores.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de middleware para las validaciones.
- Piensa en cómo estructurar los mensajes de error para que sean útiles y descriptivos.

</details>

### Fase 3: Exposición del catálogo de productos

**Objetivo:** Exponer el catálogo de productos a través de la API.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar el endpoint para exponer el catálogo de productos.
- Asegurar que la API cumpla con la latencia máxima de 100ms.

**Entregable:** API que expone el catálogo de productos con las validaciones y manejo de errores implementados.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el uso de un mock de datos para simular el catálogo de productos.
- Piensa en cómo optimizar la respuesta de la API para cumplir con la latencia máxima.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una API REST y por qué se usa en este contexto?
- **paraQueSirve**: ¿Para qué sirve validar la entrada de datos en una API REST?
- **comoSeUsa**: ¿Cómo se implementan las validaciones en los endpoints de una API REST?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar una API REST y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica exponer un catálogo de productos a través de una API REST?

## Criterios de Evaluacion

- Configuración inicial del proyecto con las dependencias necesarias.
- Implementación de validaciones para los atributos de los productos.
- Manejo centralizado de errores con mensajes de error específicos.
- Exposición del catálogo de productos a través de la API.
- Cumplimiento de la latencia máxima de 100ms en la respuesta de la API.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT) si no tenes un agente en el IDE. Declara lo mismo que AGENTS.md; los archivos que te devuelva el chat los guardas en esta carpeta respetando las rutas.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
