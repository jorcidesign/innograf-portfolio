import { Component } from '../../core/Component';
import { MainLayout } from '../../templates/MainLayout';
// 1. ADIÓS AL NAVBAR ANTIGUO, HOLA A LOS NUEVOS:
import { TopHeader } from '../../components/organisms/TopHeader';
import { FloatingNav } from '../../components/organisms/FloatingNav';

// Resto de organismos...
import { Hero } from '../../components/organisms/Hero';
import { ProjectsGallery } from '../../components/organisms/ProjectsGallery';
import { CallToAction } from '../../components/organisms/CallToAction';
import { ServicesSlider } from '../../components/organisms/ServicesSlider';
import { ClientsMarquee } from '../../components/organisms/ClientsMarquee';
import { Footer } from '../../components/organisms/Footer';
import './style.css';

export class HomePage extends Component {

    render(): string {
        // Usamos el esqueleto
        return new MainLayout().render();
    }

    onMount(): void {
        const headerSlot = this.element?.querySelector('#layout-header') as HTMLElement;
        const contentSlot = this.element?.querySelector('#layout-content') as HTMLElement;
        const footerSlot = this.element?.querySelector('#layout-footer') as HTMLElement;

        if (headerSlot && contentSlot && footerSlot) {

            // --- 2. ENSAMBLAJE DEL NUEVO HEADER DIVIDIDO ---

            // A. El Logo fijo (Letras blancas porque el Hero tiene fondo rojo/oscuro)
            // No mostramos el botón de volver porque estamos en la página de inicio
            new TopHeader({ theme: 'light', showBackBtn: false }).mount(headerSlot);

            // B. La Hamburguesa Flotante (Comienza blanca, se rellena al bajar)
            new FloatingNav({ theme: 'light' }).mount(headerSlot);


            // --- 3. ENSAMBLAJE DEL CONTENIDO ---
            new Hero().mount(contentSlot);
            new ProjectsGallery().mount(contentSlot);
            new ClientsMarquee().mount(contentSlot);
            new ServicesSlider().mount(contentSlot);
            new CallToAction().mount(contentSlot);

            // --- 4. ENSAMBLAJE DEL FOOTER ---
            new Footer().mount(footerSlot);
        }
    }
}