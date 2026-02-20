import { Component } from '../../../core/Component';
import './style.css';

export class HamburgerBtn extends Component {
    private isOpen: boolean = false;

    constructor(props: { onClick: () => void }) {
        super(props);
    }

    render(): string {
        // Renderizamos dos líneas. La transformación ocurrirá vía CSS clases.
        return `
            <button class="a-hamburger" aria-label="Abrir menú" aria-expanded="false">
                <span class="a-hamburger__box">
                    <span class="a-hamburger__inner"></span>
                </span>
            </button>
        `;
    }

    onMount(): void {
        this.element?.addEventListener('click', () => {
            this.toggle();
            // Ejecutamos la función que nos pasó el padre (Navbar)
            if (this.props.onClick) this.props.onClick();
        });
    }

    // Método público para forzar el estado visual desde fuera si es necesario
    public toggle(forceState?: boolean): void {
        this.isOpen = forceState !== undefined ? forceState : !this.isOpen;

        if (this.isOpen) {
            this.element?.classList.add('a-hamburger--active');
            this.element?.setAttribute('aria-expanded', 'true');
        } else {
            this.element?.classList.remove('a-hamburger--active');
            this.element?.setAttribute('aria-expanded', 'false');
        }
    }

    public setTheme(theme: 'light' | 'dark'): void {
        if (this.element) {
            if (theme === 'dark') {
                this.element.classList.add('a-hamburger--dark');
            } else {
                this.element.classList.remove('a-hamburger--dark');
            }
        }
    }
}