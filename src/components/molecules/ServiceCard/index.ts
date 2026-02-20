import { Component } from '../../../core/Component';
import { ServiceThumbnail } from '../../atoms/ServiceThumbnail';
import './style.css';

// Definimos la interfaz basada en tu data
export interface ServiceItem {
    type: string;
    category: string;
    title: string;
    description: string;
    image: string;
}

interface ServiceCardProps {
    service: ServiceItem;
    className?: string;
}

export class ServiceCard extends Component {
    constructor(props: ServiceCardProps) {
        super(props);
    }

    render(): string {
        const { service, className = '' } = this.props as ServiceCardProps;

        // Instanciamos el átomo para la parte superior
        // Usamos el título como etiqueta dentro de la imagen para el efecto hover
        const thumbnail = new ServiceThumbnail({
            image: service.image,
            label: service.title
        });

        return `
            <article class="m-service-card ${className}">
                <div class="m-service-card__thumb-wrapper">
                    ${thumbnail.render()}
                </div>

                <div class="m-service-card__content">
                    <span class="m-service-card__category">${service.category}</span>
                    <h3 class="m-service-card__title">${service.title}</h3>
                    <div class="m-service-card__divider"></div>
                    <p class="m-service-card__desc">${service.description}</p>
                </div>
            </article>
        `;
    }
}