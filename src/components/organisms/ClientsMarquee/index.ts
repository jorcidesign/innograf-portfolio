import { Component } from '../../../core/Component';
import { content } from '../../../data/content';
import './style.css';

export class ClientsMarquee extends Component {
    private data = content.home.clients;

    render(): string {
        // Generamos el HTML de un solo item (tarjeta con logo)
        // Nota: Si no tienes imágenes aún, puedes usar un placeholder de texto temporal
        const createItem = (client: any) => `
            <div class="o-clients__item">
                <img src="${client.logo}" alt="${client.name}" class="o-clients__img" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
                <span class="o-clients__fallback" style="display:none">${client.name}</span>
            </div>
        `;

        // Creamos dos filas:
        // Fila 1: Se mueve a la izquierda (normal)
        // Fila 2: Se mueve a la derecha (reverse)

        // Truco: Duplicamos la data varias veces para asegurar que cubra pantallas grandes
        // y el loop sea imperceptible.
        const itemsHTML = this.data.items.map(createItem).join('');
        const duplicatedHTML = itemsHTML + itemsHTML + itemsHTML; // Triple contenido

        return `
            <section class="o-clients">
                <div class="container">
                    <h2 class="o-clients__title">${this.data.title}</h2>
                </div>

                <div class="o-clients__track-wrapper">
                    <div class="o-clients__track o-clients__track--left">
                        ${duplicatedHTML}
                    </div>

                    <div class="o-clients__track o-clients__track--right">
                        ${duplicatedHTML}
                    </div>
                </div>
            </section>
        `;
    }

    // No necesitamos lógica JS compleja, todo el movimiento es CSS puro.
}