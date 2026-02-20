import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import { HamburgerBtn } from '../../atoms/HamburgerBtn';
import { Logo } from '../../atoms/Logo';
import './style.css';

export class Header extends Component {
    private hamburger: HamburgerBtn | null = null;
    private logo: Logo | null = null;
    private overlay: HTMLElement | null = null;
    private currentTheme: 'light' | 'dark';

    constructor(props: { theme?: 'light' | 'dark' } = {}) {
        super(props);
        this.currentTheme = props.theme || 'light';
    }

    render(): string {
        // Generamos los items de lista
        const navLinks = content.navigation.map(item => `
            <li class="o-header__item">
                <a href="${item.href}" class="o-header__link" data-text="${item.title}">
                    ${item.title}
                    <span class="o-header__arrow">›</span>
                </a>
            </li>
        `).join('');

        return `
            <header class="o-header">
                <div class="container o-header__bar">
                    <div id="logo-mount"></div>

                    <div id="hamburger-mount"></div>
                </div>

                <nav class="o-header__overlay">
                    <ul class="o-header__list">
                        ${navLinks}
                    </ul>
                </nav>
            </header>
        `;
    }

    onMount(): void {
        this.overlay = this.element?.querySelector('.o-header__overlay') as HTMLElement;
        const logoMount = this.element?.querySelector('#logo-mount') as HTMLElement;
        const hamburgerMount = this.element?.querySelector('#hamburger-mount') as HTMLElement;

        // 1. Montar Logo
        this.logo = new Logo();
        if (logoMount) this.logo.mount(logoMount);

        // 2. Montar Hamburger
        this.hamburger = new HamburgerBtn({
            onClick: () => this.toggleMenu() // El Header controla la acción
        });
        if (hamburgerMount) this.hamburger.mount(hamburgerMount);

        // 3. Aplicar tema inicial
        this.applyTheme(this.currentTheme);

        // 4. Cerrar menú al hacer click en un link
        const links = this.element?.querySelectorAll('.o-header__link');
        links?.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    public applyTheme(theme: 'light' | 'dark'): void {
        this.currentTheme = theme;
        this.logo?.setTheme(theme);
        this.hamburger?.setTheme(theme);
    }

    private toggleMenu(): void {
        const isOpen = this.overlay?.classList.toggle('is-open'); // Usamos 'is-open' que es más estándar
        document.body.classList.toggle('no-scroll', isOpen);

        // Lógica de colores UX: Si está abierto (fondo negro), botón blanco.
        if (isOpen) {
            this.hamburger?.setTheme('light');
        } else {
            this.hamburger?.setTheme(this.currentTheme);
        }

        // Sincronizar estado visual del botón (X o Hamburguesa)
        this.hamburger?.toggle(isOpen);
    }

    private closeMenu(): void {
        this.overlay?.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
        this.hamburger?.toggle(false);
        this.hamburger?.setTheme(this.currentTheme);
    }
}