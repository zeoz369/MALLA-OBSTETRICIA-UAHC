// Prerrequisitos de cada ramo (ramos que deben estar aprobados para desbloquear este)
const prerequisitos = {
  'anatomia2': ['anatomia1'],
  'microbio': ['biologia'],
  'bioquimica': ['quimica'],
  'estrategias2': ['estrategias1'],
  'ingles2': ['ingles1'],
  'tecnicas': ['fundamentos'],
  'obstetricia2': ['obstetricia1'],
  'fisiopato': ['fisiologia'],
  'farmacologia': ['pauxilios'],
  'etica': ['derechosh'],
  'ingles3': ['ingles2'],
  'obstetricia3': ['obstetricia2'],
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

// Guardar y obtener ramos aprobados desde localStorage
function obtenerAprobados() {
  const data = localStorage.getItem('mallaAprobados');
  return data ? JSON.parse(data) : [];
}

function guardarAprobados(aprobados) {
  localStorage.setItem('mallaAprobados', JSON.stringify(aprobados));
}

// Actualiza los ramos desbloqueados en función de los aprobados
function actualizarDesbloqueos() {
  const aprobados = obtenerAprobados();
  const todosRamos = document.querySelectorAll('.ramo');

  todosRamos.forEach(elem => {
    const id = elem.id;
    const reqs = prerequisitos[id];

    if (!reqs) {
      // Sin prerrequisitos → desbloqueado
      elem.classList.remove('bloqueado');
    } else {
      const puede = reqs.every(r => aprobados.includes(r));
      if (puede) {
        elem.classList.remove('bloqueado');
      } else {
        elem.classList.add('bloqueado');
      }
    }
  });
}

// Al hacer clic en un ramo
function aprobar(e) {
  const ramo = e.currentTarget;
  if (ramo.classList.contains('bloqueado')) return;

  ramo.classList.toggle('aprobado');

  let aprobados = obtenerAprobados();
  if (ramo.classList.contains('aprobado')) {
    if (!aprobados.includes(ramo.id)) {
      aprobados.push(ramo.id);
    }
  } else {
    aprobados = aprobados.filter(id => id !== ramo.id);
  }

  guardarAprobados(aprobados);
  actualizarDesbloqueos();
}

// Al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const todosRamos = document.querySelectorAll('.ramo');
  const aprobados = obtenerAprobados();

  // Marcar visualmente los ramos aprobados
  todosRamos.forEach(ramo => {
    if (aprobados.includes(ramo.id)) {
      ramo.classList.add('aprobado');
    }
  });

  // Asignar eventos de clic
  todosRamos.forEach(ramo => {
    ramo.addEventListener('click', aprobar);
  });

  actualizarDesbloqueos();
});
