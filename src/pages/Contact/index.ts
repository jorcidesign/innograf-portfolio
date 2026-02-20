import { Component } from '../../core/Component';
import { MainLayout } from '../../templates/MainLayout';
import { TopHeader } from '../../components/organisms/TopHeader'; // <--- NUEVO
import { FloatingNav } from '../../components/organisms/FloatingNav'; // <--- NUEVO
import { ContactSplit } from '../../components/organisms/ContactSplit';
import './style.css';

export class ContactPage extends Component {

    render(): string {
        return new MainLayout().render();
    }

    onMount(): void {
        const headerSlot = this.element?.querySelector('#layout-header') as HTMLElement;
        const contentSlot = this.element?.querySelector('#layout-content') as HTMLElement;

        if (headerSlot && contentSlot) {
            // 1. HEADER DIVIDIDO
            // Como esta página no tiene scroll (100vh), el FloatingNav se quedará
            // 100% transparente para siempre, igual que en el top del Home.
            new TopHeader({ theme: 'dark', showBackBtn: true, fallbackUrl: '/' }).mount(headerSlot);
            new FloatingNav({ theme: 'dark' }).mount(headerSlot);

            // 2. CONTENIDO (El Split Screen)
            new ContactSplit().mount(contentSlot);

            // (El Footer está intencionalmente omitido)
        }
    }
}