import { Component } from './Component';
import { TransitionManager } from './TransitionManager';
import type { Route, MatchResult } from './router/types';
import { RouteMatcher } from './router/RouteMatcher';

export class Router {
    private routes: Route[] = [];
    private outlet: HTMLElement;
    private transition: TransitionManager;
    private isNavigating: boolean = false;
    private currentPageInstance: Component | null = null;
    constructor(outlet: HTMLElement) {
        this.outlet = outlet;
        this.transition = new TransitionManager();

        // 1. Apagamos la restauración de scroll automática del navegador (Para el botón Atrás)
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        this.handleRoute = this.handleRoute.bind(this);

        // Usamos popstate en lugar de hashchange, es más estable con scrollRestoration
        window.addEventListener('popstate', this.handleRoute);
        window.addEventListener('load', this.handleRoute);

        // 2. ACTIVAMOS EL SECUESTRADOR DE CLICS
        this.interceptLinks();
    }

    public addRoute(path: string, component: new (props?: any) => Component): void {
        this.routes.push({ path, component });
    }

    // --- MAGIA: SECUESTRAR LOS ENLACES PARA EVITAR EL SALTO BRUSCO ---
    private interceptLinks(): void {
        document.body.addEventListener('click', (e) => {
            // Buscamos si el clic fue en un <a> o dentro de uno (ej: clic en el ícono de la tarjeta)
            const link = (e.target as Element).closest('a');

            if (link) {
                const href = link.getAttribute('href');

                // Si es un enlace interno de nuestro Router (que empieza con #/)
                if (href && href.startsWith('#/')) {
                    e.preventDefault(); // ¡ALTO AHÍ NAVEGADOR! No saltes a ninguna parte.

                    if (this.isNavigating) return;

                    // Cambiamos la URL de forma "silenciosa" sin disparar el salto nativo
                    window.history.pushState(null, '', href);

                    // Ejecutamos nuestra ruta con transición manualmente
                    this.handleRoute();
                }
            }
        });
    }

    private async handleRoute(): Promise<void> {
        if (this.isNavigating) return;
        this.isNavigating = true;

        let hash = window.location.hash.slice(1) || '/';
        if (hash === '') hash = '/';

        const match: MatchResult | null = RouteMatcher.find(this.routes, hash);

        if (match) {
            const isFirstLoad = !this.outlet.hasChildNodes();

            // FASE 1: SUBIR TELÓN (El TransitionManager ahora congela la pantalla)
            if (!isFirstLoad) {
                await this.transition.cover();
            }

            // --- HALLAZGO 1.2: DESTRUIR INSTANCIA ANTERIOR ANTES DE BORRAR EL DOM ---
            if (this.currentPageInstance) {
                this.currentPageInstance.onDestroy();
            }

            // FASE 2: CAMBIO DE CONTENIDO
            this.outlet.innerHTML = '';

            // Guardamos la nueva instancia en nuestra variable
            this.currentPageInstance = new match.component(match.params);
            this.currentPageInstance.mount(this.outlet);

            window.scrollTo(0, 0);

            // FASE 3: BAJAR TELÓN (El TransitionManager ahora descongela la pantalla)
            if (!isFirstLoad) {
                await new Promise(r => setTimeout(r, 100));
                this.transition.reveal();
            }

        } else {
            console.warn(`Ruta 404: ${hash}`);
            this.outlet.innerHTML = '<h1>404 - Página no encontrada</h1>';
        }

        this.isNavigating = false;
    }
}