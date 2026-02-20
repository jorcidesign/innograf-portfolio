export interface ContactInfo {
    title: string;
    subtitle: string;
    description: string;
    email: string;
    phones: string[];
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    googleMapsEmbedUrl: string;
}

export const contactData: ContactInfo = {
    title: "CONTACTO",
    subtitle: "¿TIENES UN PROYECTO?",
    description: "Estamos listos para llevar tu marca al siguiente nivel. Cuéntanos tu idea y descubramos cómo podemos colaborar para crear algo memorable.",
    email: "hola@tuagencia.com", // Reemplázalo con tu email real
    phones: ["+51 999 999 999"],  // Reemplázalo con tu teléfono real
    address: "La Molina, Lima - Perú",
    coordinates: {
        lat: -12.061019364221599,
        lng: -76.94002186285984
    },
    // He configurado este link para que apunte exactamente a tus coordenadas
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=-12.061019,-76.940022&t=m&z=15&ie=UTF8&iwloc=&output=embed"
};