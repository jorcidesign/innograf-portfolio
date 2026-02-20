import { Component } from '../Component';

// Definición de una ruta registrada
export interface Route {
    path: string; // Ej: '/proyectos' o '/project/:id'
    component: new (props?: any) => Component;
}

// Resultado de una búsqueda de ruta
export interface MatchResult {
    component: new (props?: any) => Component;
    params: Record<string, string>; // Ej: { id: "packaging-lujo" }
}