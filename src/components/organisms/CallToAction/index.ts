import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import { Button } from '../../atoms/Button';
import './style.css';

export class CallToAction extends Component {
    private data = content.home.cta;

    render(): string {
        return `
            <section class="o-cta">
                <div class="container o-cta__container">
                    <h2 class="o-cta__title">${this.data.title}</h2>
                    
                    <div id="cta-btn-mount"></div>
                </div>
            </section>
        `;
    }

    onMount(): void {
        const btnMount = this.element?.querySelector('#cta-btn-mount') as HTMLElement;

        if (btnMount) {
            // Instanciamos el Átomo Botón
            // Configuración: SOLID (Relleno) + LIGHT (Blanco)
            const btn = new Button({
                text: this.data.buttonText,
                href: this.data.buttonLink,
                variant: 'solid',
                color: 'light'
            });

            btn.mount(btnMount);
        }
    }
}