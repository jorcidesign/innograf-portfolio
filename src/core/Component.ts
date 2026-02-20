export abstract class Component {
    protected props: any;
    public element: HTMLElement | null = null;

    // NUEVO: Array para guardar los sub-componentes y poder destruirlos en cascada
    protected children: Component[] = [];

    constructor(props: any = {}) {
        this.props = props;
    }

    abstract render(): string;

    mount(container: HTMLElement): void {
        container.insertAdjacentHTML('beforeend', this.render());
        this.element = container.lastElementChild as HTMLElement;
        this.onMount();
    }

    onMount(): void { }

    // --- HALLAZGO 1.1: CICLO DE VIDA DE DESTRUCCIÓN ---
    onDestroy(): void {
        // Por defecto, le decimos a todos los hijos que también se destruyan
        this.children.forEach(child => child.onDestroy());
        this.children = []; // Limpiamos el array
    }

    // --- HALLAZGO 3.1: PRINCIPIO DRY (HELPER) ---
    // Este método nos ahorrará muchas líneas de código en el futuro
    protected mountChild(selector: string, childComponent: Component): void {
        const mountPoint = this.element?.querySelector(selector) as HTMLElement;
        if (mountPoint) {
            childComponent.mount(mountPoint);
            this.children.push(childComponent); // Guardamos la referencia
        }
    }
}