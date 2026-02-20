import { Component } from '../../core/Component';
import { MainLayout } from '../../templates/MainLayout';
import { TopHeader } from '../../components/organisms/TopHeader'; // <--- NUEVO
import { FloatingNav } from '../../components/organisms/FloatingNav'; // <--- NUEVO
import { ProjectsGrid } from '../../components/organisms/ProjectsGrid';
import { CallToAction } from '../../components/organisms/CallToAction';
import { Footer } from '../../components/organisms/Footer';
import './style.css';

export class ProjectsPage extends Component {
    render(): string {
        return new MainLayout().render();
    }

    onMount(): void {
        const headerSlot = this.element?.querySelector('#layout-header') as HTMLElement;
        const contentSlot = this.element?.querySelector('#layout-content') as HTMLElement;
        const footerSlot = this.element?.querySelector('#layout-footer') as HTMLElement;

        if (headerSlot && contentSlot && footerSlot) {
            // 1. NUEVA NAVEGACIÓN
            new TopHeader({ theme: 'dark', showBackBtn: true, fallbackUrl: '/' }).mount(headerSlot);
            new FloatingNav({ theme: 'dark' }).mount(headerSlot);

            // 2. CONTENIDO PRINCIPAL
            contentSlot.innerHTML = '';
            new ProjectsGrid().mount(contentSlot);
            new CallToAction().mount(contentSlot);

            // 3. FOOTER
            new Footer().mount(footerSlot);
        }
    }
}