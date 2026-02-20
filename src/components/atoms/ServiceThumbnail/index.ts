import { Component } from '../../../core/Component';
import './style.css';

interface ServiceThumbnailProps {
    image: string;
    label: string; // Recibiremos el 'title' aquí para mostrarlo en el centro
    className?: string;
}

export class ServiceThumbnail extends Component {
    constructor(props: ServiceThumbnailProps) {
        super(props);
    }

    render(): string {
        const { image, label, className = '' } = this.props as ServiceThumbnailProps;

        return `
            <figure class="a-service-thumb ${className}">
                <div class="a-service-thumb__image-wrapper">
                    <img 
                        src="${image}" 
                        alt="${label}" 
                        class="a-service-thumb__image" 
                        loading="lazy"
                    >
                </div>
                
                <div class="a-service-thumb__overlay">
                    <h3 class="a-service-thumb__label">${label}</h3>
                </div>
            </figure>
        `;
    }
}