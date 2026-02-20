import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import { Button } from '../../atoms/Button';
import './style.css';

export class ServicesSlider extends Component {
    private data = content.home.services;
    private currentSlideIndex = 0;

    // Variables para Swipe Mobile
    private touchStartX = 0;
    private touchEndX = 0;

    // Variables para Mouse/Scroll
    private lastClientX = 0;
    private lastClientY = 0;
    private isMouseInside = false;

    // Referencias DOM
    private follower: HTMLImageElement | null = null;
    private slidesWrapper: HTMLElement | null = null;
    private dots: NodeListOf<Element> | null = null;
    private trackContainer: HTMLElement | null = null;

    // --- VARIABLES DE RENDIMIENTO (CACHÉ) ---
    private trackOffset: { left: number, top: number } | null = null;
    private resizeObserver: ResizeObserver | null = null;
    private ticking = false; // Para evitar saturar el RequestAnimationFrame

    constructor() {
        super();
    }

    render(): string {
        // ... (Tu código de renderizado original intacto) ...
        const slidesHTML = this.data.slides.map((slide, index) => {
            const isActive = index === 0 ? 'is-active' : '';
            let contentHTML = '';

            if (slide.type === 'intro') {
                contentHTML = `
                    <div class="o-services__text-wrapper o-services__text-wrapper--intro">
                        <h2 class="o-services__title o-services__title--intro">${slide.title}</h2>
                        <div class="o-services__divider"></div>
                        <p class="o-services__desc">${slide.description}</p>
                        <div class="o-services__btn-mount"></div>
                    </div>
                `;
            } else {
                contentHTML = `
                    <div class="o-services__mobile-img-wrapper">
                         <img src="${slide.image}" alt="${slide.title}" class="o-services__mobile-img">
                    </div>

                    <div class="o-services__text-wrapper">
                        <span class="o-services__category">${slide.category}</span>
                        <h2 class="o-services__title">${slide.title}</h2>
                        <p class="o-services__desc">${slide.description}</p>
                    </div>
                `;
            }

            return `
                <div class="o-services__slide ${isActive}" data-index="${index}">
                    ${contentHTML}
                </div>
            `;
        }).join('');

        const dotsHTML = this.data.slides.map((_, index) => `
            <button class="o-services__dot ${index === 0 ? 'is-active' : ''}" data-index="${index}" aria-label="Ir a slide ${index + 1}"></button>
        `).join('');

        return `
            <section class="o-services">
                <img class="o-services__follower">

                <div class="container o-services__container">
                    <h3 class="o-services__section-title">NUESTROS SERVICIOS</h3>

                    <div class="o-services__slider-ui">
                        <button class="o-services__arrow o-services__arrow--prev">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        
                        <div class="o-services__track-container">
                            <div class="o-services__track">
                                ${slidesHTML}
                            </div>
                        </div>

                        <button class="o-services__arrow o-services__arrow--next">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>

                    <div class="o-services__dots">
                        ${dotsHTML}
                    </div>
                </div>
            </section>
        `;
    }

    onMount(): void {
        this.follower = this.element?.querySelector('.o-services__follower') as HTMLImageElement;
        this.slidesWrapper = this.element?.querySelector('.o-services__track') as HTMLElement;
        this.dots = this.element?.querySelectorAll('.o-services__dot') as NodeListOf<Element>;

        this.trackContainer = this.element?.classList.contains('o-services')
            ? this.element as HTMLElement
            : this.element?.querySelector('.o-services') as HTMLElement;

        // 1. Montar Botón (Intro)
        const btnMount = this.element?.querySelector('.o-services__btn-mount');
        const firstSlide = this.data.slides[0];
        if (btnMount && firstSlide.type === 'intro' && firstSlide.buttonText) {
            // USANDO NUESTRO HELPER DRY
            const btn = new Button({
                text: firstSlide.buttonText,
                href: firstSlide.buttonLink,
                variant: 'solid',
                color: 'light'
            });
            this.mountChild('.o-services__btn-mount', btn);
        }

        // 2. Listeners Clicks Slider
        this.element?.querySelector('.o-services__arrow--prev')?.addEventListener('click', () => this.changeSlide(-1));
        this.element?.querySelector('.o-services__arrow--next')?.addEventListener('click', () => this.changeSlide(1));

        this.dots?.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt((e.target as HTMLElement).dataset.index || '0');
                this.goToSlide(index);
            });
        });

        // 3. SWIPE MOBILE
        const track = this.element?.querySelector('.o-services__track-container') as HTMLElement;
        if (track) {
            track.addEventListener('touchstart', (e) => {
                this.touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            track.addEventListener('touchend', (e) => {
                this.touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            }, { passive: true });
        }

        // 4. LÓGICA DE RENDIMIENTO (MOUSE/SCROLL SIN LEAKS)
        if (this.trackContainer && this.follower) {

            // A. Cacheamos la posición del contenedor al inicio
            this.updateTrackOffset();

            // B. Observamos si el usuario redimensiona o voltea el celular
            this.resizeObserver = new ResizeObserver(() => {
                window.requestAnimationFrame(() => this.updateTrackOffset());
            });
            this.resizeObserver.observe(this.trackContainer);

            // C. Asignamos los eventos usando nuestras variables guardadas
            this.trackContainer.addEventListener('mousemove', this.handleMouseMove);
            this.trackContainer.addEventListener('mouseenter', this.handleMouseEnter);
            this.trackContainer.addEventListener('mouseleave', this.handleMouseLeave);

            // El scroll va al window
            window.addEventListener('scroll', this.handleScroll, { passive: true });
        }

        this.updateFollowerImage();
    }

    // =========================================
    // EVENTOS GUARDADOS (Para Garbage Collection)
    // =========================================

    private handleMouseMove = (e: MouseEvent) => {
        this.lastClientX = e.clientX;
        this.lastClientY = e.clientY;
        this.isMouseInside = true;
        this.requestFollowerUpdate();
    };

    private handleScroll = () => {
        if (this.isMouseInside) {
            this.requestFollowerUpdate();
        }
    };

    private handleMouseEnter = () => {
        this.isMouseInside = true;
        this.checkVisibilityAndOpacity();
    };

    private handleMouseLeave = () => {
        this.isMouseInside = false;
        if (this.follower) {
            this.follower.style.opacity = '0';
            this.follower.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }
    };

    // =========================================
    // MAGIA DE RENDIMIENTO Y MATEMÁTICAS
    // =========================================

    // Calculamos el offset estático del contenedor (Se ejecuta muy rara vez)
    private updateTrackOffset(): void {
        if (!this.trackContainer) return;
        const rect = this.trackContainer.getBoundingClientRect();
        this.trackOffset = {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    // Gestiona el hilo de renderizado (Evita calcular más de 60 veces por seg)
    private requestFollowerUpdate(): void {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.updateFollowerPosition();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    // Movimiento ultra-rápido sin leer el DOM (NO Layout Thrashing)
    private updateFollowerPosition(): void {
        if (!this.follower || !this.trackOffset) return;

        // Sumamos el scroll actual a la posición del mouse, 
        // y le restamos la posición global estática del contenedor.
        const x = (this.lastClientX + window.scrollX) - this.trackOffset.left;
        const y = (this.lastClientY + window.scrollY) - this.trackOffset.top;

        this.follower.style.left = `${x}px`;
        this.follower.style.top = `${y}px`;

        this.checkVisibilityAndOpacity();
    }

    private checkVisibilityAndOpacity(): void {
        const currentData = this.data.slides[this.currentSlideIndex];
        if (this.isMouseInside && currentData.type !== 'intro' && this.follower) {
            this.follower.style.opacity = '1';
            this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }

    // =========================================
    // LÓGICA DEL SLIDER 
    // =========================================

    private handleSwipe(): void {
        const threshold = 50;
        if (this.touchEndX < this.touchStartX - threshold) this.changeSlide(1);
        if (this.touchEndX > this.touchStartX + threshold) this.changeSlide(-1);
    }

    private changeSlide(direction: number): void {
        let newIndex = this.currentSlideIndex + direction;
        if (newIndex < 0) newIndex = this.data.slides.length - 1;
        if (newIndex >= this.data.slides.length) newIndex = 0;
        this.goToSlide(newIndex);
    }

    private goToSlide(index: number): void {
        this.currentSlideIndex = index;
        if (this.slidesWrapper) {
            this.slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
        }
        this.dots?.forEach(dot => dot.classList.remove('is-active'));
        this.dots?.[index]?.classList.add('is-active');
        this.updateFollowerImage();
    }

    private updateFollowerImage(): void {
        if (!this.follower) return;
        const currentData = this.data.slides[this.currentSlideIndex];

        if (currentData.type !== 'intro') {
            this.follower.src = currentData.image;
            if (this.isMouseInside) {
                this.follower.style.opacity = '1';
                this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        } else {
            this.follower.style.opacity = '0';
        }
    }

    // =========================================
    // ELIMINADOR DE ZOMBIS (LIMPIEZA DE MEMORIA)
    // =========================================

    onDestroy(): void {
        // 1. Matar el ResizeObserver
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        // 2. Matar los eventos del documento/ventana
        window.removeEventListener('scroll', this.handleScroll);

        if (this.trackContainer) {
            this.trackContainer.removeEventListener('mousemove', this.handleMouseMove);
            this.trackContainer.removeEventListener('mouseenter', this.handleMouseEnter);
            this.trackContainer.removeEventListener('mouseleave', this.handleMouseLeave);
        }

        // 3. Limpiar los componentes hijos (El botón)
        super.onDestroy();
    }
}