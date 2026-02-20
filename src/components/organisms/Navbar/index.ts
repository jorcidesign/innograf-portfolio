import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import { HamburgerBtn } from '../../atoms/HamburgerBtn';
import { Logo } from '../../atoms/Logo'; // <--- 1. IMPORTAMOS EL LOGO
import './style.css';

export class Navbar extends Component {
    private hamburger: HamburgerBtn | null = null;
    private logo: Logo | null = null; // <--- 2. CAMBIAMOS EL TIPO DE PROPIEDAD
    private menuOverlay: HTMLElement | null = null;
    private currentTheme: 'light' | 'dark';

    constructor(props: { theme?: 'light' | 'dark' } = {}) {
        super(props);
        this.currentTheme = props.theme || 'light';
    }

    render(): string {
        const navLinks = content.navigation.map(item => `
            <li class="o-navbar__item">
                <a href="${item.href}" class="o-navbar__link" data-text="${item.title}">
                    ${item.title}
                    <span class="o-navbar__arrow">›</span>
                </a>
            </li>
        `).join('');

        return `
            <header class="o-navbar">
                <div class="container o-navbar__container">
                    
                    <div id="logo-mount-point"></div>

                    <div id="hamburger-mount-point"></div>
                </div>

                <nav class="o-navbar__overlay">
                    <ul class="o-navbar__list">
                        ${navLinks}
                    </ul>
                </nav>
            </header>
        `;
    }

    onMount(): void {
        this.menuOverlay = this.element?.querySelector('.o-navbar__overlay') as HTMLElement;

        const logoMountPoint = this.element?.querySelector('#logo-mount-point') as HTMLElement;
        const hamburgerMountPoint = this.element?.querySelector('#hamburger-mount-point') as HTMLElement;

        // --- INSTANCIAR LOGO ---
        this.logo = new Logo();
        if (logoMountPoint) {
            this.logo.mount(logoMountPoint);
        }

        // --- INSTANCIAR HAMBURGER ---
        this.hamburger = new HamburgerBtn({
            onClick: () => this.toggleMenu()
        });
        if (hamburgerMountPoint) {
            this.hamburger.mount(hamburgerMountPoint);
        }

        // Aplicamos el tema inicial a ambos componentes
        this.applyTheme(this.currentTheme);

        // Listeners
        const links = this.element?.querySelectorAll('.o-navbar__link');
        links?.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
    }

    // --- LÓGICA DE COLOR ACTUALIZADA ---
    public applyTheme(theme: 'light' | 'dark'): void {
        this.currentTheme = theme;

        // 1. Cambiar color del Hamburger
        this.hamburger?.setTheme(theme);

        // 2. Cambiar color del Logo (Usando el método de la clase Logo)
        // Ya no usamos style.filter manual, dejamos que el componente se encargue
        this.logo?.setTheme(theme);
    }

    private toggleMenu(): void {
        if (this.menuOverlay) {
            const isOpen = this.menuOverlay.classList.toggle('o-navbar__overlay--open');
            document.body.classList.toggle('no-scroll');

            if (isOpen) {
                // AL ABRIR EL MENÚ (Fondo oscuro):
                // Forzamos ambos elementos a tema 'light' (blancos) para que se vean
                this.hamburger?.setTheme('light');
                this.logo?.setTheme('light'); // El logo se pone blanco
            } else {
                // AL CERRAR:
                // Vuelven al tema que dicta la sección actual (scroll)
                this.hamburger?.setTheme(this.currentTheme);
                this.logo?.setTheme(this.currentTheme);
            }

            this.hamburger?.toggle(isOpen);
        }
    }

    private closeMenu(): void {
        if (this.menuOverlay) {
            this.menuOverlay.classList.remove('o-navbar__overlay--open');
            document.body.classList.remove('no-scroll');
            this.hamburger?.toggle(false);

            // Restaurar colores originales según la sección
            this.hamburger?.setTheme(this.currentTheme);
            this.logo?.setTheme(this.currentTheme);
        }
    }
}