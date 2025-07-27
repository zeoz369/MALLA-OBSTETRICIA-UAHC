// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
  'anatomia2': ['anatomia1'],
  'microbio': ['biologia‎'],
  'bioquimica‎': ['quimica‎'],
  'estrategias2': ['estrategias1'],
  'biodesarrollo': ['biologia'],
  'ingles2': ['ingles1'],
  'tecnicas': ['fundamentos'],
  'obstetricia2': ['obstetricia1'],
  'fisiopato': ['fisiologia'],
  'farmacologia': ['pauxilios'],
  'etica': ['derechosh'],
  'ingles3': ['ingles2'],
  'obstetricia3': ['obstetricia2‎'],
  'gine3': ['gine2'],
  'neopato': ['neofisio'],
  'saludsex2': ['saludsex1'],
  'metoinve': ['bioest'],
  'practicaint2': ['practicaint1'],
  'optativo2': ['optativo1'],
  'practicagine': ['practicaint2'],
  'seminario2': ['seminario1'],
  'optativo3': ['optativo2'],
  'internado_gineobs2': ['internado_gineobs1'],
  'internado_matroaps2': ['internado_matroaps1'],
  'internado_electivo2': ['internado_electivo1'],
};

// Funciones para guardar y cargar progreso en localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// Actualiza qué ramos están desbloqueados o bloqueados según prerrequisitos 
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();

  for (const [destino, reqs] of Object.entries(prerequisitos)) {
    const elem = document.getElementById(destino);
    if (!elem) continue;

    // Verificar si se cumplen prerrequisitos normales
    let puedeDesbloquear = reqs.every(r => aprobados.includes(r));

      // Si está aprobado, no debe estar bloqueado
      elem.classList.remove('bloqueado');
    }
  }
}

// Maneja el clic para aprobar o desaprobar un ramo (solo si no está bloqueado)
function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  const aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) aprobados.push(ramo.id);
  } else {
    const idx = aprobados.indexOf(ramo.id);
    if (idx > -1) aprobados.splice(idx, 1);
  }
  guardarAprobados(aprobados);

  actualizarDesbloqueos();
}

// Al cargar la página, asignar eventos, cargar progreso y actualizar desbloqueos
window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');

  const aprobados = obtenerAprobados();
  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
  });

  todosRamos.forEach(ramo => {
    ramo.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos();
});
