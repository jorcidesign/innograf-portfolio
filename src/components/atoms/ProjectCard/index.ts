import { Component } from '../../../core/Component';
// CORRECCIÓN: Usamos 'import type' para la interfaz
import type { Project } from '../../../data/projects';
import './style.css';

interface ProjectCardProps {
    project: Project;
    className?: string;
}

export class ProjectCard extends Component {
    constructor(props: ProjectCardProps) {
        super(props);
    }

    render(): string {
        const { project, className = '' } = this.props as ProjectCardProps;

        return `
            <article class="a-project-card ${className}" data-id="${project.id}">
                <a href="#/project/${project.id}" style="display: block; width: 100%; height: 100%; text-decoration: none; color: inherit;">
                    
                    <div class="a-project-card__image-wrapper">
                        <img 
                            src="${project.image}" 
                            alt="${project.title}" 
                            class="a-project-card__image" 
                            loading="lazy"
                        >
                    </div>
                    
                    <div class="a-project-card__overlay">
                        <div class="a-project-card__content">
                            <span class="a-project-card__category">${project.category}</span>
                            <h3 class="a-project-card__title">${project.title}</h3>
                            <div class="a-project-card__divider"></div>
                            <p class="a-project-card__desc">${project.description}</p>
                        </div>
                    </div>

                </a>
            </article>
        `;
    }
}