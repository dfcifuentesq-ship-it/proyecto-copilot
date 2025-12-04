// ====================================
// FUNCIONALIDAD DE NAVEGACIÓN DE POSTS
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Obtener todos los contenedores de posts
    const postContainers = document.querySelectorAll('.post-container');
    
    // Agregar event listener a cada botón
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Obtener el número del post desde el atributo data-post
            const postNumber = this.getAttribute('data-post');
            
            // Cambiar post activo
            showPost(postNumber);
            
            // Actualizar estado de botones
            updateActiveButton(this);
            
            // Scroll suave hacia el contenido
            document.querySelector('.post-container.active').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    /**
     * Muestra el post especificado ocultando los demás
     * @param {string} postNumber - Número del post a mostrar
     */
    function showPost(postNumber) {
        postContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        const activePost = document.getElementById(`post-${postNumber}`);
        if (activePost) {
            activePost.classList.add('active');
        }
    }
    
    /**
     * Actualiza el estado activo de los botones de navegación
     * @param {HTMLElement} activeButton - El botón que debe estar activo
     */
    function updateActiveButton(activeButton) {
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        activeButton.classList.add('active');
    }
});

// ====================================
// FUNCIONALIDAD ADICIONAL
// ====================================

/**
 * Resalta el código cuando se pasa el ratón por encima
 */
document.querySelectorAll('.code-example').forEach(codeBlock => {
    codeBlock.addEventListener('mouseenter', function() {
        this.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(52, 152, 219, 0.5)';
    });
    
    codeBlock.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'inset 0 2px 4px rgba(0, 0, 0, 0.3)';
    });
});

/**
 * Funcionalidad de tabla responsiva
 */
const tables = document.querySelectorAll('.comparison-table');
tables.forEach(table => {
    table.addEventListener('mouseover', function(e) {
        if (e.target.tagName === 'TD' || e.target.tagName === 'TH') {
            const row = e.target.parentElement;
            row.style.backgroundColor = '#e8f4f8';
        }
    });
});

/**
 * Smooth scroll para links internos
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ====================================
// VALIDACIÓN Y MONITOREO
// ====================================

/**
 * Valida que los posts estén cargados correctamente
 */
function validatePostStructure() {
    console.log('🔍 Validando estructura del blog...');
    
    const posts = document.querySelectorAll('.post-container');
    if (posts.length !== 3) {
        console.warn('⚠️ Se esperaban 3 posts, se encontraron', posts.length);
    } else {
        console.log('✅ Se encontraron los 3 posts correctamente');
    }
    
    const navButtons = document.querySelectorAll('.nav-btn');
    if (navButtons.length !== 3) {
        console.warn('⚠️ Se esperaban 3 botones de navegación, se encontraron', navButtons.length);
    } else {
        console.log('✅ Botones de navegación correctos');
    }
}

// Ejecutar validación cuando el DOM esté listo
validatePostStructure();

// ====================================
// INFORMACIÓN DE DESARROLLADOR
// ====================================

console.log('%c🏗️ Blog Técnico - Arquitectura de Software', 'font-size: 16px; font-weight: bold; color: #667eea;');
console.log('%cAutor: Daniel Felipe Cifuentes Quiroga | COG: 84608', 'font-size: 12px; color: #7f8c8d;');
console.log('%cMateria: Electiva de Ingeniería de Software', 'font-size: 12px; color: #7f8c8d;');
console.log('%cÚltima actualización: 3 de diciembre de 2025', 'font-size: 12px; color: #7f8c8d;');
console.log('%c-------------------------------------------', 'color: #667eea;');
console.log('%c✨ El blog está completamente funcional', 'font-size: 12px; color: #27ae60; font-weight: bold;');
console.log('%cPOST 1: ¿Qué es la Arquitectura de Software?', 'font-size: 11px; color: #3498db;');
console.log('%cPOST 2: Estilos Arquitectónicos más Utilizados', 'font-size: 11px; color: #3498db;');
console.log('%cPOST 3: Patrones Arquitectónicos Modernos', 'font-size: 11px; color: #3498db;');

// ====================================
// ESTADÍSTICAS DE LECTURA
// ====================================

class StatisticsTracker {
    constructor() {
        this.postViews = {
            'post-1': 0,
            'post-2': 0,
            'post-3': 0
        };
        this.loadFromLocalStorage();
    }
    
    savePostView(postId) {
        if (this.postViews.hasOwnProperty(postId)) {
            this.postViews[postId]++;
            this.saveToLocalStorage();
        }
    }
    
    saveToLocalStorage() {
        localStorage.setItem('blogStats', JSON.stringify(this.postViews));
    }
    
    loadFromLocalStorage() {
        const saved = localStorage.getItem('blogStats');
        if (saved) {
            this.postViews = JSON.parse(saved);
        }
    }
    
    getStats() {
        return this.postViews;
    }
    
    logStats() {
        console.log('📊 Estadísticas de Lectura:', this.postViews);
    }
}

// Crear instancia del tracker
const tracker = new StatisticsTracker();

// Monitorear cambios de posts
const postContainers = document.querySelectorAll('.post-container');
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const target = mutation.target;
            if (target.classList.contains('active')) {
                tracker.savePostView(target.id);
                console.log(`👁️ Post visto: ${target.id}`);
            }
        }
    });
});

postContainers.forEach(post => {
    observer.observe(post, { attributes: true });
});

// ====================================
// TEMA OSCURO (Futuro)
// ====================================

/**
 * Función para cambiar tema (preparada para futuras actualizaciones)
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ====================================
// ACCESO A TECLADO
// ====================================

/**
 * Navegación con teclado (teclas 1, 2, 3)
 */
document.addEventListener('keydown', function(event) {
    if (event.key === '1') {
        document.querySelector('[data-post="1"]').click();
    } else if (event.key === '2') {
        document.querySelector('[data-post="2"]').click();
    } else if (event.key === '3') {
        document.querySelector('[data-post="3"]').click();
    }
});

console.log('%c💡 Tip: Usa las teclas 1, 2, 3 para navegar entre posts rápidamente', 'font-size: 11px; color: #f39c12;');
