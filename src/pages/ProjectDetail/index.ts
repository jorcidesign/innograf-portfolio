import { Component } from '../../core/Component';
import { MainLayout } from '../../templates/MainLayout';
import { TopHeader } from '../../components/organisms/TopHeader'; // <--- NUEVO
import { FloatingNav } from '../../components/organisms/FloatingNav'; // <--- NUEVO
import { Footer } from '../../components/organisms/Footer';
import { Button } from '../../components/atoms/Button';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import './style.css';

interface ProjectDetailProps {
    id?: string; // Viene del Router
}

export class ProjectDetailPage extends Component {

    constructor(props: ProjectDetailProps) {
        super(props);
    }

    render(): string {
        return new MainLayout().render();
    }

    onMount(): void {
        const headerSlot = this.element?.querySelector('#layout-header') as HTMLElement;
        const contentSlot = this.element?.querySelector('#layout-content') as HTMLElement;
        const footerSlot = this.element?.querySelector('#layout-footer') as HTMLElement;

        const projectId = (this.props as ProjectDetailProps).id;
        const project = projects.find(p => p.id === projectId);

        if (!project) {
            if (contentSlot) contentSlot.innerHTML = `<div class="container" style="padding:100px;"><h1>Proyecto no encontrado 😢</h1><a href="#/proyectos">Volver</a></div>`;
            return;
        }

        const currentIndex = projects.findIndex(p => p.id === projectId);
        const nextIndex = (currentIndex + 1) % projects.length;
        const nextProject = projects[nextIndex];

        if (headerSlot && contentSlot && footerSlot) {

            // A. NUEVA NAVEGACIÓN
            // Usamos 'light' (blanco) porque la imagen de fondo está oscurecida
            // Fallback va a la grilla de proyectos
            new TopHeader({ theme: 'light', showBackBtn: true, fallbackUrl: '#/proyectos' }).mount(headerSlot);
            new FloatingNav({ theme: 'light' }).mount(headerSlot);

            // B. CONTENIDO DEL PROYECTO
            contentSlot.innerHTML = this.generateProjectHTML(project, nextProject);

            // C. MONTAR BOTÓN "SIGUIENTE"
            const nextBtnContainer = contentSlot.querySelector('#next-project-btn');
            if (nextBtnContainer) {
                new Button({
                    text: "SIGUIENTE PROYECTO",
                    href: `#/project/${nextProject.id}`,
                    variant: "outline",
                    color: "light"
                }).mount(nextBtnContainer as HTMLElement);
            }

            // D. FOOTER
            new Footer().mount(footerSlot);

            // E. ANIMACIONES
            this.animateEntrance();
        }
    }

    // Método helper para no ensuciar el onMount con tanto HTML
    private generateProjectHTML(project: Project, nextProject: Project): string {

        // Generamos la lista de servicios
        const servicesList = project.services?.map(s => `<li>${s}</li>`).join('') || '';

        // Generamos la galería (Grid de imágenes)
        const galleryHTML = project.gallery?.map(imgUrl => `
            <div class="p-project-detail__gallery-item">
                <img src="${imgUrl}" alt="${project.title} gallery" loading="lazy">
            </div>
        `).join('') || '';

        return `
            <article class="p-project-detail">
                
                <header class="p-project-detail__hero" style="background-image: url('${project.heroImage || project.image}')">
                    <div class="p-project-detail__hero-overlay"></div>
                    <div class="container p-project-detail__hero-content">
                        <span class="p-project-detail__category">${project.category}</span>
                        <h1 class="p-project-detail__title">${project.title}</h1>
                    </div>
                </header>

                <section class="p-project-detail__info-bar">
                    <div class="container p-project-detail__info-grid">
                        <div class="p-project-detail__info-item">
                            <span class="label">CLIENTE</span>
                            <span class="value">${project.client || 'Confidencial'}</span>
                        </div>
                        <div class="p-project-detail__info-item">
                            <span class="label">AÑO</span>
                            <span class="value">${project.year || '2024'}</span>
                        </div>
                        <div class="p-project-detail__info-item">
                            <span class="label">SERVICIOS</span>
                            <ul class="value-list">${servicesList}</ul>
                        </div>
                    </div>
                </section>

                <section class="p-project-detail__story">
                    <div class="container p-project-detail__story-grid">
                        <div class="p-project-detail__story-col">
                            <h3>EL DESAFÍO</h3>
                            <p>${project.challenge || project.description}</p>
                        </div>
                        <div class="p-project-detail__story-col">
                            <h3>LA SOLUCIÓN</h3>
                            <p>${project.solution || 'Solución a medida mediante diseño estratégico.'}</p>
                        </div>
                    </div>
                </section>

                <section class="p-project-detail__gallery">
                    <div class="container p-project-detail__gallery-grid">
                        ${galleryHTML}
                    </div>
                </section>

                <section class="p-project-detail__next">
                    <div class="container">
                        <span class="subtitle">SIGUIENTE CASO</span>
                        <h2 class="next-title">${nextProject.title}</h2>
                        <div id="next-project-btn" style="margin-top: 2rem;"></div>
                    </div>
                </section>

            </article>
        `;
    }

    private animateEntrance(): void {
        // Pequeño fade-in para la imagen principal
        const hero = this.element?.querySelector('.p-project-detail__hero') as HTMLElement;
        if (hero) {
            hero.style.opacity = '0';
            requestAnimationFrame(() => {
                hero.style.transition = 'opacity 1s ease';
                hero.style.opacity = '1';
            });
        }
    }
}