import { Component } from '../../../core/Component';
import { Logo } from '../../atoms/Logo';
import { BackButton } from '../../atoms/BackButton';
import './style.css';

interface TopHeaderProps {
    theme?: 'light' | 'dark';
    showBackBtn?: boolean; // Controla si aparece el botón de retroceso
    fallbackUrl?: string;  // A dónde regresar si no hay historial
}

export class TopHeader extends Component {
    private logo: Logo | null = null;
    private backBtn: BackButton | null = null;

    constructor(props: TopHeaderProps = {}) {
        // Valores por defecto
        super({ theme: 'light', showBackBtn: false, ...props });
    }

    render(): string {
        const { showBackBtn } = this.props as TopHeaderProps;

        return `
            <header class="o-top-header">
                <div class="container o-top-header__container">
                    
                    <div id="top-logo-mount" class="o-top-header__logo"></div>

                    <div class="o-top-header__actions">
                        ${showBackBtn ? `<div id="top-back-mount"></div>` : ''}
                    </div>

                </div>
            </header>
        `;
    }

    onMount(): void {
        const { theme, showBackBtn, fallbackUrl } = this.props as TopHeaderProps;

        // 1. Instanciar y Montar Logo (Usando el helper DRY)
        this.logo = new Logo();
        this.mountChild('#top-logo-mount', this.logo);
        this.logo.setTheme(theme!);

        // 2. Montar BackButton (Solo si la página lo solicita)
        if (showBackBtn) {
            this.backBtn = new BackButton({
                theme: theme,
                fallbackUrl: fallbackUrl
            });
            this.mountChild('#top-back-mount', this.backBtn);
        }
    }
}