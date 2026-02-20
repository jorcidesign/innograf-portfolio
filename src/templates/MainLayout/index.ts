import { Component } from '../../core/Component';
import './style.css';

export class MainLayout extends Component {
    render(): string {
        return `
            <div class="t-main-layout">
                <header id="layout-header" class="t-main-layout__header"></header>
                <main id="layout-content" class="t-main-layout__content"></main>
                <footer id="layout-footer" class="t-main-layout__footer"></footer>
            </div>
        `;
    }
}