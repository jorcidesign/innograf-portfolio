import { Component } from '../../../core/Component';
import './style.css';

interface BackButtonProps {
    theme?: 'light' | 'dark';
    text?: string;
    fallbackUrl?: string; // A dónde ir si no hay historial
}

export class BackButton extends Component {
    constructor(props: BackButtonProps = {}) {
        super(props);
    }

    render(): string {
        const { theme = 'dark', text = 'VOLVER' } = this.props as BackButtonProps;

        // Asignamos la clase del color basándonos en el tema
        const themeClass = theme === 'light' ? 'a-back-btn--light' : 'a-back-btn--dark';

        return `
            <button class="a-back-btn ${themeClass}" aria-label="Volver a la página anterior">
                <svg class="a-back-btn__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <span class="a-back-btn__text">${text}</span>
            </button>
        `;
    }

    onMount(): void {
        const btn = this.element as HTMLButtonElement;
        const fallbackUrl = (this.props as BackButtonProps).fallbackUrl || '#/';

        btn?.addEventListener('click', (e) => {
            e.preventDefault();

            // Lógica de retroceso segura
            // window.history.length > 2 es una forma empírica de saber si hay navegación previa en la misma pestaña
            if (window.history.length > 2) {
                window.history.back();
            } else {
                // Si el usuario copió y pegó el link del proyecto directo, lo mandamos al fallback (Home o Proyectos)
                window.location.hash = fallbackUrl;
            }
        });
    }
}