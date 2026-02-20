import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import './style.css';

export class Hero extends Component {
    private heroData = content.home.hero;

    constructor() {
        super();
    }

    render(): string {
        const cardsHTML = this.heroData.cards.map((card, index) => {

            // 1. Clases dinámicas
            const modifierClass = card.type === 'visual'
                ? 'o-hero__card--visual'
                : 'o-hero__card--action';

            // 2. Contenido interno de la tarjeta (se repite, así que lo guardamos en una variable)
            const innerContent = `
                <div class="o-hero__card-content">
                    <h2 class="o-hero__title">${card.title}</h2>
                    ${card.text ? `<p class="o-hero__text">${card.text}</p>` : ''}
                    
                    ${card.type === 'action' ? `
                        <div class="o-hero__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </div>
                    ` : ''}
                </div>
            `;

            // 3. Renderizado Condicional: Si tiene 'link', es un <a>, sino es un <article>
            if (card.type === 'action' && card.link) {
                return `
                    <a href="${card.link}" class="o-hero__card ${modifierClass}" data-index="${index}" style="text-decoration: none; color: inherit;">
                        ${innerContent}
                    </a>
                `;
            } else {
                return `
                    <article class="o-hero__card ${modifierClass}" data-index="${index}">
                        ${innerContent}
                    </article>
                `;
            }

        }).join('');

        return `
            <section class="o-hero">
                <div class="container o-hero__container">
                    <div class="o-hero__grid">
                        ${cardsHTML}
                    </div>
                </div>
            </section>
        `;
    }

    onMount(): void {
        console.log('Hero Component Mounted 🚀');

        // Animación suave Vanilla JS (Hover Effect)
        // Como ahora son <a> tags, el hover CSS debería bastar, 
        // pero aquí tienes el espacio para GSAP en el futuro.
        const cards = this.element?.querySelectorAll('.o-hero__card--action');
        cards?.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.o-hero__icon');
                if (icon) {
                    // Animación súper simple moviendo el icono
                    (icon as HTMLElement).style.transform = 'translateY(-5px) scale(1.1)';
                    (icon as HTMLElement).style.transition = 'transform 0.3s ease';
                }
            });

            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.o-hero__icon');
                if (icon) {
                    (icon as HTMLElement).style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }
}