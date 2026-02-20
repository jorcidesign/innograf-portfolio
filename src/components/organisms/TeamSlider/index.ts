import { Component } from '../../../core/Component';
import { TeamCard } from '../../atoms/TeamCard';
import { aboutData } from '../../../data/about';
import './style.css';

export class TeamSlider extends Component {
    private track: HTMLElement | null = null;

    render(): string {
        // Renderizamos cada tarjeta del equipo
        const cardsHTML = aboutData.team.map(member => {
            // Envolvemos el átomo en un div wrapper para controlar el ancho en el slider
            return `
                <div class="o-team-slider__item">
                    ${new TeamCard({ member }).render()}
                </div>
            `;
        }).join('');

        return `
            <section class="o-team-slider">
                <div class="container">
                    
                    <div class="o-team-slider__header">
                        <h2 class="o-team-slider__title">NUESTRO EQUIPO</h2>
                        
                        <div class="o-team-slider__controls">
                            <button class="o-team-slider__arrow o-team-slider__arrow--prev" aria-label="Anterior">
                                ←
                            </button>
                            <button class="o-team-slider__arrow o-team-slider__arrow--next" aria-label="Siguiente">
                                →
                            </button>
                        </div>
                    </div>

                    <div class="o-team-slider__track">
                        ${cardsHTML}
                    </div>

                </div>
            </section>
        `;
    }

    onMount(): void {
        this.track = this.element?.querySelector('.o-team-slider__track') as HTMLElement;
        const prevBtn = this.element?.querySelector('.o-team-slider__arrow--prev');
        const nextBtn = this.element?.querySelector('.o-team-slider__arrow--next');

        if (this.track && prevBtn && nextBtn) {
            // Lógica de Scroll Suave al hacer click
            prevBtn.addEventListener('click', () => {
                this.scrollTrack(-1);
            });

            nextBtn.addEventListener('click', () => {
                this.scrollTrack(1);
            });
        }
    }

    private scrollTrack(direction: number): void {
        if (!this.track) return;

        // Calculamos el ancho de una tarjeta para saber cuánto mover
        const itemWidth = this.track.querySelector('.o-team-slider__item')?.clientWidth || 300;
        const gap = 30; // El gap definido en CSS
        const scrollAmount = itemWidth + gap;

        this.track.scrollBy({
            left: scrollAmount * direction,
            behavior: 'smooth'
        });
    }
}