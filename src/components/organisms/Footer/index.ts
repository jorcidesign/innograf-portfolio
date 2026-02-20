import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import './style.css';

export class Footer extends Component {
    private data = content.footer;

    constructor() {
        super();
    }

    render(): string {
        // Renderizamos la lista de links (Columna 1)
        const sectionLinks = this.data.sections.links.map(link =>
            `<li><a href="${link.href}" class="o-footer__link">${link.title}</a></li>`
        ).join('');

        // Renderizamos info de contacto (Columna 2)
        const contactInfo = this.data.contact.info.map(line =>
            `<li><span class="o-footer__text">${line}</span></li>`
        ).join('');

        // Renderizamos dirección (Columna 3)
        const addressLines = this.data.address.lines.map(line =>
            `<div>${line}</div>`
        ).join('');

        // Renderizamos links legales (Bottom)
        const legalLinks = this.data.legal.links.map(link =>
            `<a href="${link.href}" class="o-footer__legal-link">${link.title}</a>`
        ).join('');

        return `
            <footer class="o-footer">
                <div class="container">
                    <div class="o-footer__grid">
                        
                        <div class="o-footer__column o-footer__column--logo">
                            <img src="${this.data.logo}" alt="Innograf Logo" class="o-footer__logo">
                        </div>

                        <div class="o-footer__column">
                            <h4 class="o-footer__title">${this.data.sections.title}</h4>
                            <ul class="o-footer__list">
                                ${sectionLinks}
                            </ul>
                        </div>

                        <div class="o-footer__column">
                            <h4 class="o-footer__title">${this.data.contact.title}</h4>
                            <ul class="o-footer__list">
                                ${contactInfo}
                            </ul>
                        </div>

                        <div class="o-footer__column">
                            <h4 class="o-footer__title">${this.data.address.title}</h4>
                            <address class="o-footer__address">
                                ${addressLines}
                            </address>
                        </div>
                    </div>

                    <div class="o-footer__bottom">
                        <span class="o-footer__copyright">${this.data.legal.copyright}</span>
                        <div class="o-footer__legal-nav">
                            ${legalLinks}
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}