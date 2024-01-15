export default function () {
  return {
    changedMenu: 0,
    thumbStyle: {
      right: '6px',
      borderRadius: '5px',
      background: 'rgba(29, 100, 231, 0.2)',
      width: '5px',
      opacity: 1,
    },
    thumbStyleEquipments: {
      borderRadius: '5px',
      background: 'rgba(29, 100, 231, 0.2)',
      width: '5px',
      opacity: 1,
    },
    date: calcDate(),

    localStorage: JSON.parse(localStorage.getItem('configuration')) || null,
  }
}


function calcDate() {
  const initialDate = new Date();
  // Definir las opciones de formato deseado
  const optFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  // Obtener la fecha formateada
  return initialDate.toLocaleDateString('es-ES', optFormat);
}