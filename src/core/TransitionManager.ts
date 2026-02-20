export class TransitionManager {
    private overlay: HTMLElement;
    private isAnimating: boolean = false;

    constructor() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'transition-overlay';

        this.overlay.innerHTML = `
            <div class="transition-panel"></div>
            <div class="transition-panel"></div>
            <div class="transition-panel"></div>
        `;
        document.body.appendChild(this.overlay);
    }

    public async cover(): Promise<void> {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // --- HALLAZGO 5.1: CONGELAR PANTALLA DESDE EL MANAGER ---
        const currentScrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${currentScrollY}px`;
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';

        this.overlay.offsetHeight; // Reflow
        this.overlay.classList.add('is-active');

        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    public reveal(): void {
        // --- HALLAZGO 5.1: DESCONGELAR PANTALLA ---
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';

        this.overlay.classList.remove('is-active');

        setTimeout(() => {
            this.isAnimating = false;
        }, 1000);
    }
}