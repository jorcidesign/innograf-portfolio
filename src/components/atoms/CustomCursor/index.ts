import { Component } from '../../../core/Component';
import './style.css';

export class CustomCursor extends Component {
    private mouseX = 0;
    private mouseY = 0;
    private cursorX = 0;
    private cursorY = 0;
    private rafId: number = 0;

    constructor() {
        super();
        this.animate = this.animate.bind(this);
    }

    render(): string {
        return `
            <div class="a-custom-cursor" id="custom-cursor"></div>
        `;
    }
    private handleMouseMove = (e: MouseEvent) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    };

    private handleMouseOver = (e: MouseEvent) => {
        const target = e.target as Element;
        if (target.closest('a') || target.closest('button') || target.closest('.a-hamburger') || target.closest('.a-logo')) {
            this.element?.classList.add('is-hidden');
        }
    };

    private handleMouseOut = (e: MouseEvent) => {
        const target = e.target as Element;
        if (target.closest('a') || target.closest('button') || target.closest('.a-hamburger') || target.closest('.a-logo')) {
            this.element?.classList.remove('is-hidden');
        }
    };

    private handleMouseLeave = () => { if (this.element) this.element.style.opacity = '0'; };
    private handleMouseEnter = () => { if (this.element) this.element.style.opacity = '1'; };

    onMount(): void {
        const cursor = this.element as HTMLElement;
        if (!cursor) return;

        // ASIGNAMOS LOS EVENTOS USANDO LAS FUNCIONES GUARDADAS
        window.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('mouseover', this.handleMouseOver);
        document.addEventListener('mouseout', this.handleMouseOut);
        document.addEventListener('mouseleave', this.handleMouseLeave);
        document.addEventListener('mouseenter', this.handleMouseEnter);

        this.animate();
    }

    private animate(): void {
        const speed = 0.15;
        this.cursorX += (this.mouseX - this.cursorX) * speed;
        this.cursorY += (this.mouseY - this.cursorY) * speed;

        if (this.element) {
            this.element.style.transform = `translate3d(${this.cursorX}px, ${this.cursorY}px, 0)`;
        }

        this.rafId = requestAnimationFrame(this.animate);
    }

    onDestroy(): void {
        // 1. Detenemos el loop infinito de animación (Adiós advertencia de TS)
        cancelAnimationFrame(this.rafId);

        // 2. Removemos todos los eventos del documento y la ventana
        window.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseover', this.handleMouseOver);
        document.removeEventListener('mouseout', this.handleMouseOut);
        document.removeEventListener('mouseleave', this.handleMouseLeave);
        document.removeEventListener('mouseenter', this.handleMouseEnter);

        super.onDestroy();
    }
}