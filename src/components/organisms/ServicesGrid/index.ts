import { Component } from '../../../core/Component';
import { ServiceCard } from '../../molecules/ServiceCard';
import { content } from '../../../data/content';
import './style.css';

export class ServicesGrid extends Component {
    render(): string {
        const servicesData = content.home.services;
        const serviceItems = servicesData.slides.filter(slide => slide.type === 'service');

        // --- LÓGICA MASONRY ---
        // Para que quede perfecto en Desktop, separamos en Izquierda (Impares) y Derecha (Pares)
        // Indices: 0, 2, 4... van a la Izquierda
        // Indices: 1, 3, 5... van a la Derecha

        const leftItems = serviceItems.filter((_, i) => i % 2 === 0);
        const rightItems = serviceItems.filter((_, i) => i % 2 !== 0);

        // Renderizamos las listas HTML
        const renderList = (items: typeof serviceItems) => items.map(service =>
            new ServiceCard({ service: service as any }).render()
        ).join('');

        const leftColHTML = renderList(leftItems);
        const rightColHTML = renderList(rightItems);

        // Renderizamos TAMBIÉN una lista completa para Mobile (para mantener el orden 1,2,3)
        const mobileListHTML = renderList(serviceItems);

        return `
            <section class="o-services-grid">
                <div class="container">
                    
                    <div class="o-services-grid__header">
                        <span class="o-services-grid__subtitle">NUESTRAS ESPECIALIDADES</span>
                        <h2 class="o-services-grid__title">${servicesData.title}</h2>
                        <div class="o-services-grid__divider"></div>
                    </div>

                    <div class="o-services-grid__mobile-view">
                        ${mobileListHTML}
                    </div>

                    <div class="o-services-grid__desktop-view">
                        <div class="o-services-grid__col-left">
                            ${leftColHTML}
                        </div>
                        <div class="o-services-grid__col-right">
                            ${rightColHTML}
                        </div>
                    </div>

                </div>
            </section>
        `;
    }
}