import './styles/main.css';
import './styles/transitions.css'; // <--- ¿TIENES ESTA LÍNEA?
import { Router } from './core/Router';
import { HomePage } from './pages/Home';
import { ProjectsPage } from './pages/Projects';
import { ContactPage } from './pages/Contact'; // <--- 1. IMPORTAMOS LA NUEVA PÁGINA
import { AboutPage } from './pages/About'; // <--- 1. IMPORTAMOS LA NUEVA PÁGINA
import { ServicesPage } from './pages/Services'; // <--- 1. IMPORTAMOS LA NUEVA PÁGINA
import { ProjectDetailPage } from './pages/ProjectDetail'; // <--- 1. IMPORTAMOS LA NUEVA PÁGINA
import { CustomCursor } from './components/atoms/CustomCursor';

document.addEventListener('DOMContentLoaded', () => {
    // El contenedor raíz en index.html
    // 1. INYECTAR EL CURSOR GLOBALMENTE AL BODY
    // Creamos un div contenedor específico para él para no ensuciar el body directamente
    const cursorContainer = document.createElement('div');
    cursorContainer.id = "global-cursor-container";
    document.body.appendChild(cursorContainer);

    const globalCursor = new CustomCursor();
    globalCursor.mount(cursorContainer);
    const app = document.getElementById('app');

    if (app) {
        // Inicializamos el Router pasándole el contenedor raíz
        const router = new Router(app);

        // Definimos las rutas (Mapping)

        // '/' es la ruta por defecto (Home)
        router.addRoute('/', HomePage);
        router.addRoute('home', HomePage);

        // Ruta de Proyectos
        router.addRoute('proyectos', ProjectsPage);

        // Nueva Ruta de Contacto
        router.addRoute('contacto', ContactPage); // <--- 2. AGREGAMOS LA RUTA

        // Nueva Ruta de Contacto
        router.addRoute('nosotros', AboutPage); // <--- 2. AGREGAMOS LA RUTA

        // Nueva Ruta de Contacto
        router.addRoute('servicios', ServicesPage); // <--- 2. AGREGAMOS LA RUTA
        router.addRoute('proyecto/:id', ProjectDetailPage); // <--- 2. AGREGAMOS LA RUTA
        router.addRoute('project/:id', ProjectDetailPage);
        router.addRoute('/project/:id', ProjectDetailPage);
        console.log("Innograf Core: Router Inicializado 🚀");
    }
});