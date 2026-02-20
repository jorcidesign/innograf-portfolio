export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    email?: string;
}

export interface AboutData {
    intro: {
        title: string;
        subtitle: string;
        text: string;
        founded: string;
        location: string;
    };
    team: TeamMember[];
}

export const aboutData: AboutData = {
    intro: {
        title: "NOSOTROS",
        subtitle: "NUESTRA HISTORIA",
        text: "Fundada en 2011 por Jorge del Águila, <strong>INNOGRAF</strong> nació con una visión clara: elevar el estándar de la impresión comercial en Lima. Con más de una década de experiencia, nos hemos consolidado como un aliado estratégico para empresas que buscan precisión, calidad y acabados impecables. Desde nuestras instalaciones en La Molina, combinamos artesanía gráfica con tecnología eficiente para materializar la identidad de tu marca.",
        founded: "Desde 2011",
        location: "La Molina, Lima"
    },
    team: [
        {
            id: "t-1",
            name: "Jorge del Águila",
            role: "Fundador & CEO",
            // Imagen de prueba (Unsplash) - Reemplazar con foto real luego
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
            email: "jorge@innograf.com"
        },
        {
            id: "t-2",
            name: "Andrea M.",
            role: "Directora de Arte",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
            email: "diseno@innograf.com"
        },
        {
            id: "t-3",
            name: "Miguel R.",
            role: "Jefe de Producción",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
            email: "produccion@innograf.com"
        }
    ]
};