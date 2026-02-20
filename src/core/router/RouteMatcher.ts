import type { Route, MatchResult } from './types';

export class RouteMatcher {

    /**
     * Busca una coincidencia entre el hash actual y las rutas registradas.
     */
    public static find(routes: Route[], currentHash: string): MatchResult | null {
        // 1. Normalización (quitar slash inicial si existe)
        // Si hash es "project/123", path es "project/123"
        const hash = currentHash.startsWith('/') ? currentHash.slice(1) : currentHash;

        for (const route of routes) {
            // A. Si es ruta estática exacta (Ej: "proyectos" === "proyectos")
            // Quitamos slash inicial de la ruta registrada también para comparar
            const normalizedPath = route.path.startsWith('/') ? route.path.slice(1) : route.path;

            if (normalizedPath === hash) {
                return { component: route.component, params: {} };
            }

            // B. Si es ruta dinámica (Ej: "project/:id")
            if (route.path.includes(':')) {
                const match = this.matchDynamicRoute(normalizedPath, hash);
                if (match) {
                    return { component: route.component, params: match };
                }
            }
        }

        return null;
    }

    /**
     * Lógica interna para comparar "project/:id" contra "project/mi-id"
     */
    private static matchDynamicRoute(routePath: string, currentHash: string): Record<string, string> | null {
        // 1. Convertimos la ruta definida en segmentos: ["project", ":id"]
        const routeSegments = routePath.split('/');
        // 2. Convertimos la URL actual en segmentos: ["project", "mi-id"]
        const hashSegments = currentHash.split('/');

        // Si no tienen la misma longitud, no es la misma ruta
        if (routeSegments.length !== hashSegments.length) {
            return null;
        }

        const params: Record<string, string> = {};

        // 3. Comparamos segmento por segmento
        for (let i = 0; i < routeSegments.length; i++) {
            const routeSeg = routeSegments[i];
            const hashSeg = hashSegments[i];

            // Si el segmento empieza con ':', es una variable (param)
            if (routeSeg.startsWith(':')) {
                const paramName = routeSeg.slice(1); // quitamos los ':' -> "id"
                params[paramName] = hashSeg;       // guardamos -> params["id"] = "mi-id"
            }
            // Si no es variable, debe ser idéntico (Ej: "project" === "project")
            else if (routeSeg !== hashSeg) {
                return null; // No coinciden
            }
        }

        return params;
    }
}