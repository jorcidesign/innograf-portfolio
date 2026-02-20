import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import './style.css';

export class ProjectGallery extends Component {
    private projects = content.projectsPage.items;

    render(): string {
        const itemsHTML = this.projects.map(project => `
            <article class="o-gallery__item">
                <div class="o-gallery__image-wrapper">
                    <img src="${project.image}" alt="${project.title}" class="o-gallery__image" loading="lazy">
                    
                    <div class="o-gallery__overlay">
                        <span class="o-gallery__category">${project.category}</span>
                        <h3 class="o-gallery__title">${project.title}</h3>
                        <div class="o-gallery__line"></div>
                        <p class="o-gallery__desc">${project.description}</p>
                    </div>
                    
                    <a href="#project/${project.id}" class="o-gallery__link" aria-label="Ver ${project.title}"></a>
                </div>
            </article>
        `).join('');

        return `
            <section class="o-gallery">
                <div class="container">
                    <div class="o-gallery__header">
                        <h1 class="o-gallery__main-title">${content.projectsPage.title}</h1>
                        <p class="o-gallery__subtitle">${content.projectsPage.subtitle}</p>
                    </div>
                    <div class="o-gallery__grid">
                        ${itemsHTML}
                    </div>
                </div>
            </section>
        `;
    }
}