import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import { HamburgerBtn } from '../../atoms/HamburgerBtn';
import './style.css';

interface FloatingNavProps {
    theme?: 'light' | 'dark'; // El tema con el que arranca en el top 0
}

export class FloatingNav extends Component {
    private hamburger: HamburgerBtn | null = null;
    private menuOverlay: HTMLElement | null = null;
    private btnWrapper: HTMLElement | null = null;

    private initialTheme: 'light' | 'dark';
    private isMenuOpen: boolean = false;
    private ticking: boolean = false;

    private handleScroll = () => {
        if (this.isMenuOpen) return;

        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateScrollState(window.scrollY);
                this.ticking = false;
            });
            this.ticking = true;
        }
    };

    constructor(props: FloatingNavProps = {}) {
        super(props);
        this.initialTheme = props.theme || 'light';
    }

    render(): string {
        const navLinks = content.navigation.map(item => `
            <li class="o-floating-nav__item">
                <a href="${item.href}" class="o-floating-nav__link" data-text="${item.title}">
                    ${item.title}
                    <span class="o-floating-nav__arrow">›</span>
                </a>
            </li>
        `).join('');

        return `
            <div class="o-floating-nav">
                <div class="container o-floating-nav__container">
                    
                    <div class="o-floating-nav__btn-wrapper" id="floating-btn-mount"></div>
                    
                </div>

                <nav class="o-floating-nav__overlay">
                    <ul class="o-floating-nav__list">
                        ${navLinks}
                    </ul>
                </nav>
            </div>
        `;
    }

    onMount(): void {
        this.menuOverlay = this.element?.querySelector('.o-floating-nav__overlay') as HTMLElement;
        this.btnWrapper = this.element?.querySelector('.o-floating-nav__btn-wrapper') as HTMLElement;

        // 1. Instanciar y Montar la Hamburguesa (Usando el helper DRY)
        this.hamburger = new HamburgerBtn({
            onClick: () => this.toggleMenu()
        });

        this.mountChild('#floating-btn-mount', this.hamburger);
        this.hamburger.setTheme(this.initialTheme);

        // 2. Eventos
        this.initEventListeners();

        // 3. Forzar chequeo inicial
        this.updateScrollState(window.scrollY);
    }

    private initEventListeners(): void {
        const links = this.element?.querySelectorAll('.o-floating-nav__link');
        links?.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // USAMOS NUESTRA FUNCIÓN GUARDADA
        window.addEventListener('scroll', this.handleScroll);
    }

    onDestroy(): void {
        // 1. Matamos el evento de scroll global
        window.removeEventListener('scroll', this.handleScroll);

        // 2. Si el menú estaba abierto al cambiar de página, desbloqueamos el body
        document.body.classList.remove('no-scroll');

        // 3. Llamamos al onDestroy del padre para que limpie a los hijos (como el HamburgerBtn)
        super.onDestroy();
    }

    // --- MAGIA DEL CONTRASTE ---
    private updateScrollState(currentScrollY: number): void {
        if (!this.btnWrapper) return;

        // Si estamos arriba (Top 0)
        if (currentScrollY <= 50) {
            this.btnWrapper.classList.remove('is-scrolled');
            this.hamburger?.setTheme(this.initialTheme); // Vuelve a su color natural (Ej: Blanco en Home)
        }
        // Si hemos bajado (Entra a zonas de peligro de contraste)
        else {
            this.btnWrapper.classList.add('is-scrolled');
            this.hamburger?.setTheme('dark'); // Obligamos a que las rayitas sean negras sobre el nuevo fondo blanco
        }
    }

    private toggleMenu(): void {
        if (!this.menuOverlay) return;

        this.isMenuOpen = this.menuOverlay.classList.toggle('o-floating-nav__overlay--open');
        document.body.classList.toggle('no-scroll');

        if (this.isMenuOpen) {
            // Menú abierto (Fondo negro): hamburguesa debe ser blanca para verse como una "X"
            this.hamburger?.setTheme('light');
            // Quitamos temporalmente el fondo blanco del botón si estuviera scrolleado
            this.btnWrapper?.classList.remove('is-scrolled');
        } else {
            // Menú cerrado: Restaurar estado según el scroll actual
            this.updateScrollState(window.scrollY);
        }

        this.hamburger?.toggle(this.isMenuOpen);
    }

    private closeMenu(): void {
        if (!this.menuOverlay) return;
        this.isMenuOpen = false;
        this.menuOverlay.classList.remove('o-floating-nav__overlay--open');
        document.body.classList.remove('no-scroll');
        this.hamburger?.toggle(false);
        this.updateScrollState(window.scrollY);
    }
}