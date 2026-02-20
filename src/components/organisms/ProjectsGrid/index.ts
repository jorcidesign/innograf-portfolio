import { Component } from '../../../core/Component';
import { ProjectCard } from '../../atoms/ProjectCard';
import { projects } from '../../../data/projects';
import './style.css';

export class ProjectsGrid extends Component {
    render(): string {
        // Mapeamos TODOS los proyectos
        const cardsHTML = projects.map(project => {
            return new ProjectCard({ project }).render();
        }).join('');

        return `
            <section class="o-projects-grid">
                <div class="container">
                    
                    <div class="o-projects-grid__header">
                        <span class="o-projects-grid__subtitle">NUESTRO PORTAFOLIO</span>
                        <h1 class="o-projects-grid__title">TODOS LOS PROYECTOS</h1>
                        <div class="o-projects-grid__divider"></div>
                    </div>

                    <div class="o-projects-grid__list">
                        ${cardsHTML}
                    </div>

                </div>
            </section>
        `;
    }
}