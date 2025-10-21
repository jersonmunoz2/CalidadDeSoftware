// Sistema de navegación
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    const buttons = document.querySelectorAll('.nav-btn');
    
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sistema de sliders
const sliders = ['funcionalidad', 'desempeno', 'compatibilidad', 'usabilidad', 
                'fiabilidad', 'seguridad', 'mantenibilidad', 'portabilidad'];

sliders.forEach(slider => {
    const input = document.getElementById(slider);
    const display = document.getElementById(slider + '-val');
    
    if (input && display) {
        input.addEventListener('input', function() {
            display.textContent = this.value;
        });
    }
});

// Calculadora de calidad
function calculateQuality() {
    const metrics = {
        funcionalidad: parseFloat(document.getElementById('funcionalidad').value),
        desempeno: parseFloat(document.getElementById('desempeno').value),
        compatibilidad: parseFloat(document.getElementById('compatibilidad').value),
        usabilidad: parseFloat(document.getElementById('usabilidad').value),
        fiabilidad: parseFloat(document.getElementById('fiabilidad').value),
        seguridad: parseFloat(document.getElementById('seguridad').value),
        mantenibilidad: parseFloat(document.getElementById('mantenibilidad').value),
        portabilidad: parseFloat(document.getElementById('portabilidad').value)
    };

    // Cálculo del promedio ponderado
    const weights = {
        funcionalidad: 0.15,
        desempeno: 0.12,
        compatibilidad: 0.10,
        usabilidad: 0.15,
        fiabilidad: 0.13,
        seguridad: 0.15,
        mantenibilidad: 0.10,
        portabilidad: 0.10
    };

    let totalScore = 0;
    for (let metric in metrics) {
        totalScore += metrics[metric] * weights[metric];
    }

    // Redondear a 2 decimales
    totalScore = Math.round(totalScore * 100) / 100;

    // Determinar interpretación
    let interpretation = '';
    let recommendation = '';
    let color = '';

    if (totalScore >= 4.5) {
        interpretation = '⭐ EXCELENTE - Calidad superior';
        recommendation = 'El software cumple con los más altos estándares de calidad. Mantener las buenas prácticas y realizar auditorías periódicas para asegurar la sostenibilidad de la calidad.';
        color = '#10b981';
    } else if (totalScore >= 3.5) {
        interpretation = '✅ BUENO - Calidad satisfactoria';
        recommendation = 'El software tiene un nivel de calidad aceptable. Se recomienda identificar las métricas más bajas y establecer un plan de mejora continua para alcanzar la excelencia.';
        color = '#667eea';
    } else if (totalScore >= 2.5) {
        interpretation = '⚠️ REGULAR - Requiere mejoras';
        recommendation = 'El software presenta deficiencias importantes que deben ser atendidas. Es necesario priorizar las áreas críticas y desarrollar un plan de acción inmediato para mejorar la calidad.';
        color = '#f59e0b';
    } else if (totalScore >= 1.5) {
        interpretation = '❌ DEFICIENTE - Acción urgente requerida';
        recommendation = 'El software tiene serias deficiencias que comprometen su funcionalidad y confiabilidad. Se requiere una revisión completa y posiblemente una refactorización importante del sistema.';
        color = '#ef4444';
    } else {
        interpretation = '🚫 CRÍTICO - No apto para producción';
        recommendation = 'El software no cumple con estándares mínimos de calidad y no debe ser utilizado en producción. Se recomienda un rediseño completo o considerar alternativas.';
        color = '#991b1b';
    }

    // Mostrar resultados
    document.getElementById('score').textContent = totalScore.toFixed(2);
    document.getElementById('interpretation').textContent = interpretation;
    document.getElementById('recommendation').textContent = recommendation;
    
    const resultDiv = document.getElementById('result');
    resultDiv.style.background = `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
    resultDiv.classList.add('show');

    // Animación del score
    animateScore(0, totalScore, 1500);

    // Scroll suave al resultado
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Animación del puntaje
function animateScore(start, end, duration) {
    const scoreElement = document.getElementById('score');
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (end - start) * easeOutQuart;
        
        scoreElement.textContent = current.toFixed(2);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Ejemplo automático al cargar
window.addEventListener('load', function() {
    // Aplicar valores de ejemplo (comentado para que usuario configure)
});

// Atajos de teclado
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        const evaluatorSection = document.getElementById('evaluador');
        if (evaluatorSection.classList.contains('active')) {
            calculateQuality();
        }
    }
});

// Validación de navegación
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', function() {
        const evaluatorSection = document.getElementById('evaluador');
        if (evaluatorSection.classList.contains('active')) {
            const values = {};
            sliders.forEach(slider => {
                values[slider] = document.getElementById(slider).value;
            });
            sessionStorage.setItem('evaluatorValues', JSON.stringify(values));
        }
    });
});

// Restaurar valores si existen
const savedValues = sessionStorage.getItem('evaluatorValues');
if (savedValues) {
    const values = JSON.parse(savedValues);
    Object.keys(values).forEach(key => {
        const input = document.getElementById(key);
        const display = document.getElementById(key + '-val');
        if (input && display) {
            input.value = values[key];
            display.textContent = values[key];
        }
    });
}

// Generar reporte (función adicional)
function generateReport() {
    const metrics = {
        'Adecuación Funcional': document.getElementById('funcionalidad').value,
        'Eficiencia de Desempeño': document.getElementById('desempeno').value,
        'Compatibilidad': document.getElementById('compatibilidad').value,
        'Usabilidad': document.getElementById('usabilidad').value,
        'Fiabilidad': document.getElementById('fiabilidad').value,
        'Seguridad': document.getElementById('seguridad').value,
        'Mantenibilidad': document.getElementById('mantenibilidad').value,
        'Portabilidad': document.getElementById('portabilidad').value
    };

    let report = 'REPORTE DE EVALUACIÓN DE CALIDAD DE SOFTWARE\n\n';
    report += 'Fecha: ' + new Date().toLocaleDateString() + '\n\n';
    report += 'MÉTRICAS EVALUADAS:\n';
    report += '='.repeat(50) + '\n\n';

    for (let metric in metrics) {
        report += `${metric}: ${metrics[metric]} / 5.0\n`;
    }

    report += '\n' + '='.repeat(50) + '\n';
    report += `CALIFICACIÓN FINAL: ${document.getElementById('score').textContent} / 5.0\n`;
    report += `INTERPRETACIÓN: ${document.getElementById('interpretation').textContent}\n\n`;
    report += `RECOMENDACIÓN:\n${document.getElementById('recommendation').textContent}\n`;

    return report;
}

// Función para descargar reporte
function downloadReport() {
    const report = generateReport();
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte_calidad_software_' + new Date().getTime() + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Preset de configuraciones
function loadPreset(preset) {
    const presets = {
        excelente: { funcionalidad: 4.8, desempeno: 4.7, compatibilidad: 4.9, usabilidad: 4.6, fiabilidad: 4.8, seguridad: 4.9, mantenibilidad: 4.5, portabilidad: 4.7 },
        bueno: { funcionalidad: 4.2, desempeno: 3.8, compatibilidad: 4.5, usabilidad: 4.0, fiabilidad: 3.5, seguridad: 4.3, mantenibilidad: 3.9, portabilidad: 4.2 },
        regular: { funcionalidad: 3.2, desempeno: 2.8, compatibilidad: 3.0, usabilidad: 3.5, fiabilidad: 2.5, seguridad: 3.3, mantenibilidad: 2.9, portabilidad: 3.0 },
        deficiente: { funcionalidad: 2.0, desempeno: 1.8, compatibilidad: 2.2, usabilidad: 2.5, fiabilidad: 1.5, seguridad: 2.0, mantenibilidad: 1.8, portabilidad: 2.1 }
    };

    const values = presets[preset];
    if (values) {
        Object.keys(values).forEach(key => {
            const input = document.getElementById(key);
            const display = document.getElementById(key + '-val');
            if (input && display) {
                input.value = values[key];
                display.textContent = values[key];
            }
        });
    }
}

// Tooltip helper (unused)
function showTooltip(element, message) {
    // This function is not currently used in the application.
}

// Validación de entrada
sliders.forEach(slider => {
    const input = document.getElementById(slider);
    if(input) {
        input.addEventListener('change', function() {
            if (this.value < 0) this.value = 0;
            if (this.value > 5) this.value = 5;
            document.getElementById(slider + '-val').textContent = this.value;
        });
    }
});

// Inicialización
console.log('Sistema de Evaluación de Calidad de Software cargado correctamente');
console.log('Versión 1.0 - Basado en ISO/IEC 25010');

// Scroll to top button logic
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (!scrollToTopBtn) return;

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollToTopBtn.style.display = "flex";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    scrollToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
