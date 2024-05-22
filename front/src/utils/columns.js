export const activitiesColumnsFormat = [
  {
    name: "Nombre de la actividad",
    selector: (row) => row.activity_name,
    wrap: "true",
  },
  {
    name: "Tipo de actividad",
    selector: (row) => row.activity_type,
    wrap: "true",
  },
  {
    name: "Estado",
    selector: (row) => {
      if ((row.finished = 1)) return "En proceso";
      return "Finalizado";
    },
    wrap: "true",
  },
];
