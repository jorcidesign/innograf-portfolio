import { projects } from './projects';

// Definimos tipos para evitar errores de tipeo
export interface NavItem {
    id: string;
    title: string;
    href: string;
}

export interface HeroCard {
    id: string;
    title: string;
    text: string;
    type: 'action' | 'visual';
    link?: string; // <--- Añadimos el link (opcional porque la tarjeta 'visual' no lo usa)
}

export interface ServiceSlide {
    type: 'intro' | 'service'; // 'intro' tiene botón, 'service' tiene categoría
    title: string;
    description: string;
    image: string; // La imagen que aparecerá en el mouse
    // Solo para 'intro'
    buttonText?: string;
    buttonLink?: string;
    // Solo para 'service'
    category?: string;
}

// NUEVA INTERFAZ PARA EL FOOTER
export interface FooterData {
    logo: string;
    sections: { title: string; links: NavItem[] }; // Columna 1
    contact: { title: string; info: string[] };    // Columna 2
    address: { title: string; lines: string[] };   // Columna 3
    legal: {
        copyright: string;
        links: { title: string; href: string }[];
    };
}



// Añadir al inicio del archivo o donde definas interfaces
export interface ClientLogo {
    id: string;
    name: string;
    logo: string; // Ruta de la imagen
}

export const content = {
    navigation: [
        { id: "projects", title: "Proyectos", href: "#proyectos" },
        { id: "nosotros", title: "Nosotros", href: "#nosotros" },
        { id: "servicios", title: "Servicios", href: "#servicios" },
        { id: "contacto", title: "Contacto", href: "#contacto" }
    ] as NavItem[],

    home: {
        hero: {
            cards: [
                {
                    id: "projects",
                    title: "PROYECTOS",
                    text: "Desde el diseño de marca hasta la producción a gran escala, transformamos tus ideas.",
                    type: 'action',
                    link: "#/proyectos" // <--- Ruteo
                },
                {
                    id: "visual",
                    title: "DISEÑOS Y MERCH DE CALIDAD",
                    text: "",
                    type: 'visual'
                },
                {
                    id: "services",
                    title: "SERVICIOS",
                    text: "Ofrecemos un portafolio completo: impresión offset, digital y acabados especiales.",
                    type: 'action',
                    link: "#/servicios" // <--- Ruteo
                }
            ] as HeroCard[]
        },
        cta: {
            title: "¿CÓMO PODEMOS\nAYUDARTE A CRECER?",
            buttonText: "INICIA UN PROYECTO",
            buttonLink: "#/contacto" // Asumiendo que lleva al formulario
        }, clients: {
            title: "NUESTROS CLIENTES",
            items: [
                { id: "c1", name: "Cliente 1", logo: "/src/assets/images/clients/logo1.png" },
                { id: "c2", name: "Cliente 2", logo: "/src/assets/images/clients/logo2.png" },
                { id: "c3", name: "Cliente 3", logo: "/src/assets/images/clients/logo3.png" },
                { id: "c4", name: "Cliente 4", logo: "/src/assets/images/clients/logo4.png" },
                { id: "c5", name: "Cliente 5", logo: "/src/assets/images/clients/logo5.png" },
                { id: "c6", name: "Cliente 6", logo: "/src/assets/images/clients/logo6.png" },
                // ... Añade más para que el loop se vea lleno
            ] as ClientLogo[]
        }, services: {
            title: "NUESTROS SERVICIOS", // Título general (opcional)
            slides: [
                {
                    type: 'intro',
                    title: "COMBINAMOS CREATIVIDAD Y TECNOLOGÍA",
                    description: "Soluciones de impresión y diseño que superan tus expectativas.",
                    image: "/src/assets/images/services/intro-hover.jpg", // Imagen al pasar mouse
                    buttonText: "EXPLORAR SERVICIOS",
                    buttonLink: "#servicios"
                },
                {
                    type: 'service',
                    category: "Diseño Gráfico y Branding",
                    title: "IDENTIDAD VISUAL",
                    description: "Creamos marcas memorables, desde el diseño del logotipo hasta el manual de marca completo.",
                    image: "https://images.unsplash.com/photo-1636247499734-893da2bcfc1c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                },
                {
                    type: 'service',
                    category: "Impresión de Alta Calidad",
                    title: "IMPRESIÓN OFFSET Y DIGITAL",
                    description: "Soluciones versátiles para cualquier volumen. Calidad de imagen superior para catálogos.",
                    image: "https://images.unsplash.com/photo-1503694978374-8a2fa686963a?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                },
                {
                    type: 'service',
                    category: "Merchandising",
                    title: "PRODUCTOS CON TU MARCA",
                    description: "Transformamos tu logo en productos promocionales atractivos y de alta calidad.",
                    image: "https://images.unsplash.com/photo-1668959813575-8e68053e2fcc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
            ] as ServiceSlide[]
        }

    },
    // AÑADIMOS EL FOOTER
    footer: {
        logo: "/src/assets/images/logo.svg", // Asumimos que es un SVG que se puede pintar de blanco o ya es blanco
        sections: {
            title: "SECCIONES",
            links: [
                { id: "projects", title: "Proyectos", href: "#proyectos" },
                { id: "about", title: "Nosotros", href: "#about" },
                { id: "servicios", title: "Servicios", href: "#servicios" },
            ]
        },
        contact: {
            title: "CONTACTO",
            info: [
                "(+51) 123 456 789",
                "contacto@inngraf.com"
            ]
        },
        address: {
            title: "DIRECCIÓN",
            lines: [
                "Av. Ejemplo 123, Oficina 404",
                "La Molina, Lima",
                "Perú"
            ]
        },
        legal: {
            copyright: "© 2025 Innovaciones Gráficas J y M SRL",
            links: [
                { title: "Privacidad", href: "#privacy" },
                { title: "Términos y Condiciones", href: "#terms" }
            ]
        }
    } as FooterData,

    projectsPage: {
        title: "NUESTROS PROYECTOS",
        subtitle: "Aquí puedes ver una selección de nuestros trabajos más destacados.",
        items: projects
    }
};