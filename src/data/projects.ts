export interface Project {
    // --- DATOS BASE (Para la Card / Grilla) ---
    id: string;
    title: string;
    category: string;      // Ej: "Packaging", "Editorial", "Branding"
    image: string;         // Thumbnail para la card
    description: string;   // Descripción corta para la card

    // --- DATOS DETALLE (Para la Página Interna) ---
    heroImage: string;     // Imagen de alta calidad para el header del detalle
    client: string;
    year: string;
    services: string[];    // Ej: ["Dirección de Arte", "Impresión Offset"]
    challenge: string;     // El problema a resolver
    solution: string;      // Cómo lo solucionaron
    gallery: string[];     // Array de imágenes extra
}

export const projects: Project[] = [
    // --- PROYECTO 1 ---
    {
        id: "packaging-lujo",
        title: "Aurum Coffee",
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=800&auto=format&fit=crop",
        description: "Acabados especiales en foil dorado para marca de café premium.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1615362879505-1a3b10b80549?q=80&w=1920&auto=format&fit=crop",
        client: "Aurum Coffee Co.",
        year: "2023",
        services: ["Diseño de Empaque", "Impresión Hot Stamping", "Selección de Papel"],
        challenge: "El cliente necesitaba diferenciar su línea 'Gold Reserve' en un mercado saturado de empaques minimalistas. Buscaban transmitir lujo y exclusividad sin perder la esencia orgánica del producto.",
        solution: "Desarrollamos una caja rígida con textura soft-touch y aplicamos hot stamping dorado en el logotipo y los patrones botánicos. La experiencia de unboxing fue clave, añadiendo un interior impreso con la historia de los caficultores.",
        gallery: [
            "https://images.unsplash.com/photo-1517488031086-5389476b704d?q=80&w=1200",
            "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?q=80&w=1200",
            "https://images.unsplash.com/photo-1626017004661-d7a6e1471715?q=80&w=1200"
        ]
    },

    // --- PROYECTO 2 ---
    {
        id: "revista-corporativa",
        title: "Revista Inmueble",
        category: "Editorial",
        image: "https://images.unsplash.com/photo-1558191053-8edcb01e1da3?q=80&w=800&auto=format&fit=crop",
        description: "Diagramación y dirección de arte para sector inmobiliario.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1920&auto=format&fit=crop",
        client: "Grupo Inmobiliario Z",
        year: "2022",
        services: ["Diseño Editorial", "Retoque Fotográfico", "Impresión Offset"],
        challenge: "Convertir una memoria anual llena de cifras en una pieza de lectura atractiva para inversionistas y clientes VIP.",
        solution: "Apostamos por una maquetación aireada, infografías personalizadas y fotografía arquitectónica de alto contraste. Se imprimió en papel couché mate de alto gramaje para dar peso y seriedad a la publicación.",
        gallery: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200",
            "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1200"
        ]
    },

    // --- PROYECTO 3 ---
    {
        id: "merch-festivales",
        title: "Neon Fest 2024",
        category: "Merchandising",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
        description: "Polos y gorras con serigrafía de alta densidad y tintas UV.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1459749411177-d4a428c37ae5?q=80&w=1920&auto=format&fit=crop",
        client: "Producciones Nocturnas",
        year: "2024",
        services: ["Serigrafía Textil", "Diseño de Merch", "Gestión de Stock"],
        challenge: "Crear una línea de ropa oficial que brillara literalmente en la oscuridad y resistiera el uso intenso durante 3 días de festival.",
        solution: "Utilizamos tintas plastisol fluorescentes y reactivas a la luz UV. La selección de algodón pima aseguró comodidad, mientras que el diseño tipográfico 'bold' garantizó legibilidad a distancia.",
        gallery: [
            "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1200",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200"
        ]
    },

    // --- PROYECTO 4 ---
    {
        id: "identidad-tech",
        title: "Nova Software",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
        description: "Sistema visual escalable para startup de inteligencia artificial.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920&auto=format&fit=crop",
        client: "Nova AI Solutions",
        year: "2023",
        services: ["Identidad Corporativa", "Papelería", "Manual de Marca"],
        challenge: "La marca necesitaba humanizar la tecnología y alejarse de los clichés azules y fríos del sector tecnológico.",
        solution: "Creamos un sistema visual basado en gradientes cálidos (morado a naranja) y formas orgánicas. La papelería se imprimió con acabados mate para transmitir cercanía y modernidad.",
        gallery: [
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200",
            "https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?q=80&w=1200"
        ]
    },

    // --- PROYECTO 5 ---
    {
        id: "etiquetas-vino",
        title: "Vinos Raíces",
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop",
        description: "Etiquetas texturizadas para línea de vinos premium.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1920&auto=format&fit=crop",
        client: "Viñedos del Sur",
        year: "2022",
        services: ["Diseño de Etiquetas", "Troquelado", "Barniz Sectorizado"],
        challenge: "Transmitir la tradición de 50 años del viñedo utilizando un diseño contemporáneo.",
        solution: "Utilizamos papel enológico texturizado (verjurado) que soporta la humedad. El diseño integra una ilustración a pluma de la hacienda original, modernizada con un troquel irregular.",
        gallery: [
            "https://images.unsplash.com/photo-1563829285038-f8602b9cb030?q=80&w=1200",
            "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=1200"
        ]
    },

    // --- PROYECTO 6 ---
    {
        id: "wayfinding-urbano",
        title: "Parque Central",
        category: "Wayfinding",
        image: "https://images.unsplash.com/photo-1570126618953-d437176e8c79?q=80&w=800&auto=format&fit=crop",
        description: "Sistema de orientación para complejo de oficinas y parque.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
        client: "Constructora Urbania",
        year: "2023",
        services: ["Diseño Industrial", "Señalética", "Instalación"],
        challenge: "Unificar visualmente tres torres de oficinas y un área verde pública, facilitando el tránsito de 5000 personas diarias.",
        solution: "Diseñamos tótems de acero galvanizado con pintura automotriz para resistir el clima. La tipografía y los iconos fueron creados específicamente para alta legibilidad a 20 metros de distancia.",
        gallery: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200"
        ]
    },

    // --- PROYECTO 7 (NUEVO) ---
    {
        id: "eco-skincare",
        title: "Botanical Pure",
        category: "Packaging",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop",
        description: "Empaques 100% biodegradables para línea cosmética.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1556228720-1957be83d317?q=80&w=1920&auto=format&fit=crop",
        client: "Botanical Labs",
        year: "2024",
        services: ["Ecodiseño", "Impresión en Kraft", "Tintas de Soya"],
        challenge: "Eliminar el plástico por completo del empaque manteniendo la protección del producto.",
        solution: "Desarrollamos cajas automontables en cartón kraft certificado FSC. Toda la impresión se realizó con tintas a base de soya, garantizando que el empaque sea compostable en casa.",
        gallery: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200",
            "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=1200"
        ]
    },

    // --- PROYECTO 8 (NUEVO) ---
    {
        id: "burger-brand",
        title: "Street Burger",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop",
        description: "Rebranding completo para cadena de comida rápida.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1920&auto=format&fit=crop",
        client: "Street Foods Inc.",
        year: "2023",
        services: ["Rebranding", "Merchandising", "Menú Boards"],
        challenge: "Actualizar una marca de los 90s para atraer a un público Gen-Z sin alienar a los clientes clásicos.",
        solution: "Optamos por una estética 'retro-moderna', colores vibrantes y tipografía bold. Se rediseñó todo: desde el papel para envolver hamburguesas hasta los uniformes del staff.",
        gallery: [
            "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1200",
            "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1200"
        ]
    },

    // --- PROYECTO 9 (NUEVO) ---
    {
        id: "fotografia-minimal",
        title: "Lens Portfolio",
        category: "Editorial",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
        description: "Libro de fotografía de edición limitada.",

        // Detalle
        heroImage: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1920&auto=format&fit=crop",
        client: "Carlos V. Photography",
        year: "2021",
        services: ["Curaduría Visual", "Encuadernación Artesanal", "Impresión Fine Art"],
        challenge: "Producir un libro de 200 páginas donde la fidelidad del color fuera absoluta.",
        solution: "Utilizamos impresión digital Indigo sobre papel de algodón. La encuadernación cosida a mano permite que el libro se abra 180 grados (lay-flat) para apreciar las fotos panorámicas sin cortes.",
        gallery: [
            "https://images.unsplash.com/photo-1544207240-8b10b5febc18?q=80&w=1200",
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1200"
        ]
    }
];