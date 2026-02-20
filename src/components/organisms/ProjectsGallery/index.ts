import { Component } from '../../../core/Component';
import { ProjectCard } from '../../atoms/ProjectCard';
import { Button } from '../../atoms/Button';
import { projects } from '../../../data/projects';
import type { Project } from '../../../data/projects';
import './style.css';

export class ProjectsGallery extends Component {
    private cards: NodeListOf<HTMLElement> | null = null;
    private section: HTMLElement | null = null;
    private isMobileLayout = false;
    private galleryData: Project[] = projects.slice(0, 6);

    render(): string {
        const cardsHTML = this.galleryData.map(project => {
            return new ProjectCard({ project }).render();
        }).join('');

        return `
            <section class="o-gallery">
                <div class="container">
                    <div class="o-gallery__header">
                        <span class="o-gallery__subtitle">PORTAFOLIO</span>
                        <h2 class="o-gallery__title">UN VISTAZO A <br> NUESTRO TRABAJO</h2>
                    </div>

                    <div class="o-gallery__grid">
                        ${cardsHTML}
                    </div>

                    <div class="o-gallery__footer">
                        <div class="o-gallery__btn-mount"></div>
                    </div>
                </div>
            </section>
        `;
    }

    onMount(): void {
        this.section = this.element as HTMLElement;
        this.cards = this.element?.querySelectorAll('.a-project-card') as NodeListOf<HTMLElement>;

        // 1. Montar el Botón
        const btnMount = this.element?.querySelector('.o-gallery__btn-mount');
        if (btnMount) {
            new Button({
                text: "VER TODOS LOS PROYECTOS",
                href: "#proyectos",
                variant: "outline",
                color: "dark"
            }).mount(btnMount as HTMLElement);
        }

        // 2. Lógica de Parallax
        if (this.cards && this.section) {
            window.addEventListener('scroll', () => this.handleParallax(), { passive: true });
            window.addEventListener('resize', () => this.checkLayout());

            this.checkLayout();
            this.handleParallax();
        }
    }

    private checkLayout(): void {
        this.isMobileLayout = window.innerWidth < 1024;
    }

    private handleParallax(): void {
        if (!this.section || !this.cards) return;

        const rect = this.section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Si la sección ya pasó mucho hacia arriba o no ha entrado, no calculamos
        if (rect.bottom < 0 || rect.top > viewportHeight) return;

        // --- CORRECCIÓN MATEMÁTICA ---
        // Usamos rect.top directamente. 
        // Si rect.top es negativo (la sección está subiendo), offset será negativo.
        // translate3d(0, -50px, 0) mueve el elemento HACIA ARRIBA.
        // Esto evita que tape el botón del footer.
        const speed = 0.12; // Velocidad ajustada
        const offset = rect.top * speed;

        window.requestAnimationFrame(() => {
            this.cards?.forEach((card, index) => {
                let shouldMove = false;

                if (this.isMobileLayout) {
                    // MÓVIL (2 Columnas): Columna derecha (impares)
                    if (index % 2 !== 0) shouldMove = true;
                } else {
                    // DESKTOP (3 Columnas): Columna central (1, 4...)
                    if (index % 3 === 1) shouldMove = true;
                }

                if (shouldMove) {
                    // offset positivo = baja, offset negativo (scroll down) = sube
                    card.style.transform = `translate3d(0, ${offset}px, 0)`;
                } else {
                    card.style.transform = 'translate3d(0, 0, 0)';
                }
            });
        });
    }
}