export function getEquipmentsGetter(state) {
    let equipments = state.equipments.map(equipment => ({
      cardTitle: equipment.equipmentName,
      cardImg: equipment.photo,
      cardLabels: [
        { brand: `Marca: ${equipment.equipmentBrand}` },
        { serie: `No. serie: ${equipment.serialNumber}` },
      ],
      cardDate: equipment.createdAt,
    }));
    console.log('EQUIPOS: ', equipments);
    return equipments;
  }