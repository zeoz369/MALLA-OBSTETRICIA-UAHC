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
  'saludcom1': [],
  'fundamentos2': ['fisiologia', 'anatomia', 'histologia', 'integracion1'],
  'obstetricia1': ['fisiologia', 'anatomia', 'histologia', 'biodesarrollo', 'integracion1'],
  'neonatologia1': ['fisiologia', 'anatomia', 'histologia', 'biodesarrollo', 'integracion1'],
  'fisiologia_sis': ['fisiologia'],
  'agentes': ['fisiologia', 'anatomia', 'histologia'],
  'cs_sociales3': ['cs_sociales2'],
  'ingles3': ['ingles2'],
  'neonatologia2': ['neonatologia1', 'fisiologia_sis', 'agentes'],
  'obstetricia2': ['obstetricia1', 'fisiologia_sis'],
  'gineco1': ['histologia', 'fisiologia_sis'],
  'fisiopato': ['fisiologia_sis'],
  'infectologia': ['agentes'],
  'farmacologia': ['fisiologia_sis', 'bioquimica'],
  'integracion2': ['fisiologia_sis','fundamentos2'],
  'clinica_neonatal1': ['neonatologia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_partos1': ['obstetricia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_ap1': ['obstetricia2', 'gineco1', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_puerperio': ['obstetricia2', 'fisiopato', 'infectologia', 'farmacologia', 'integracion2'],
  'clinica_saludcom': ['integracion2'],
  'modulo1': [],
  'neonatologia3': ['farmacologia', 'fisiopato', 'obstetricia2'],
  'saludcom2': ['saludcom1'],
  'obstetricia_pat': ['obstetricia2', 'farmacologia', 'fisiopato'],
  'gestion1': ['investigacion1'],
  'investigacion2': ['investigacion1'],
  'enfermeria_mq': ['neonatologia3', 'obstetricia_pat'],
  'reproduccion': ['fisiologia_sis'],
  'gineco_pat': ['clinica_ap1'],
  'gestion2': ['gestion1'],
  'investigacion3': ['investigacion2'],
  'cs_sociales4': ['cs_sociales3'],
  'clinica_neonatal2': ['neonatologia3', 'enfermeria_mq'],
  'clinica_partos2': ['obstetricia_pat', 'enfermeria_mq'],
  'clinica_ap2': ['obstetricia_pat', 'gineco_pat', 'saludcom2'],
  'alto_riesgo': ['obstetricia_pat', 'enfermeria_mq'],
  'clinica_mq': ['gineco_pat', 'enfermeria_mq'],
  'modulo2': ['modulo1'],
  'seminario1': ['investigacion3'],
  'internado_neonatologia': ['clinica_neonatal2'],
  'internado_obstetricia': ['clinica_partos2', 'alto_riesgo'],
  'internado_ap': ['clinica_ap2'],
  'internado_gineco': ['clinica_mq'],
  'internado_neonatologia1': ['clinica_neonatal2'],
  'internado_obstetricia1': ['clinica_partos2', 'alto_riesgo'],
  'internado_ap1': ['clinica_ap2'],
  'internado_gineco1': ['clinica_mq'],
  'internado_electivo': [],
  'internado_electivo1': [],
  'seminario2': ['seminario1'],
  'ingles4': ['ingles3']
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
