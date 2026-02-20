import { Component } from '../../../core/Component';
import { Button } from '../../atoms/Button';
import { contactData } from '../../../data/contact';
import './style.css';

export class ContactSplit extends Component {

    render(): string {
        // Construimos la URL del embed de Google Maps usando las coordenadas de la data
        // z=15 es el zoom, output=embed es obligatorio para iframes gratuitos
        const mapUrl = `https://maps.google.com/maps?q=${contactData.coordinates.lat},${contactData.coordinates.lng}&hl=es&z=15&output=embed`;

        return `
            <section class="o-contact-split">
                <div class="o-contact-split__info">
                    <div class="o-contact-split__content">
                        <span class="o-contact-split__subtitle">${contactData.subtitle}</span>
                        <h1 class="o-contact-split__title">${contactData.title}</h1>
                        <div class="o-contact-split__divider"></div>
                        <p class="o-contact-split__desc">${contactData.description}</p>
                        
                        <div class="o-contact-split__btn-mount"></div>
                    </div>
                </div>

                <div class="o-contact-split__map-wrapper">
                    <iframe 
                        class="o-contact-split__map"
                        src="${mapUrl}" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                    
                    <div class="o-contact-split__map-overlay"></div>

                    <div class="o-contact-split__card">
                        <h3 class="o-contact-split__card-title">VISÍTANOS</h3>
                        <p class="o-contact-split__card-text">${contactData.address}</p>
                        
                        <div class="o-contact-split__card-divider"></div>
                        
                        <h3 class="o-contact-split__card-title">LLÁMANOS</h3>
                        ${contactData.phones.map(phone => `<p class="o-contact-split__card-text">${phone}</p>`).join('')}
                        
                        <div class="o-contact-split__card-divider"></div>

                        <h3 class="o-contact-split__card-title">ESCRÍBENOS</h3>
                        <p class="o-contact-split__card-text">${contactData.email}</p>
                    </div>
                </div>
            </section>
        `;
    }

    onMount(): void {
        const btnMount = this.element?.querySelector('.o-contact-split__btn-mount');

        if (btnMount) {
            new Button({
                text: "MANDAR UN EMAIL",
                href: `mailto:${contactData.email}`,
                variant: 'solid',
                color: 'primary' // Usará tu rojo corporativo
            }).mount(btnMount as HTMLElement);
        }
    }
}