# Weather App

## Descripción

Aplicación web para consultar el clima actual y el pronóstico de los próximos 7 días de cualquier ciudad.

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

## Construir

```bash
npm run build
```

## Funcionalidades

La aplicación permite buscar ciudades y muestra:
- Temperatura actual
- Velocidad del viento
- Condiciones climáticas
- Pronóstico de 7 días con temperaturas máximas y mínimas

También guarda la última ciudad buscada para facilitar consultas futuras.

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Open-Meteo API para datos meteorológicos

## Notas de desarrollo

Se optó por usar la API de Open-Meteo porque es gratuita y no requiere registro. La búsqueda de ciudades incluye sugerencias en tiempo real para mejorar la experiencia del usuario. El estado de la aplicación se maneja con los hooks estándar de React (useState y useEffect), lo cual es suficiente para el alcance del proyecto.

Los estilos están escritos en CSS puro para mantener el proyecto ligero. Se usa localStorage para persistir la última ciudad consultada.

```
