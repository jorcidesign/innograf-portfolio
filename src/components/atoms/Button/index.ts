import { Component } from '../../../core/Component';
import './style.css';

export type ButtonVariant = 'solid' | 'outline' | 'text';
export type ButtonColor = 'primary' | 'light' | 'dark';

interface ButtonProps {
    text: string;
    href?: string;       // Si existe, es un link <a>
    onClick?: () => void; // Si existe, es un <button>
    variant?: ButtonVariant; // Por defecto 'solid'
    color?: ButtonColor;     // Por defecto 'primary'
    className?: string;      // Para clases extra (márgenes, etc.)
}

export class Button extends Component {
    protected props: ButtonProps;

    constructor(props: ButtonProps) {
        super(props);
        this.props = {
            variant: 'solid',
            color: 'primary',
            ...props
        };
    }

    render(): string {
        const { text, href, variant, color, className } = this.props;

        // Construimos la clase BEM
        // Base: .a-btn
        // Modificadores: .a-btn--solid, .a-btn--primary
        const classes = [
            'a-btn',
            `a-btn--${variant}`,
            `a-btn--${color}`,
            className || ''
        ].join(' ');

        if (href) {
            return `<a href="${href}" class="${classes}">${text}</a>`;
        } else {
            return `<button type="button" class="${classes}">${text}</button>`;
        }
    }

    onMount(): void {
        if (this.props.onClick && !this.props.href) {
            this.element?.addEventListener('click', this.props.onClick);
        }
    }
}