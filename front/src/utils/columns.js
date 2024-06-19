import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../api/axiosConfig";
import { updatedFormattedDate } from "./formatDate";
// const sortFunction = (a,b) => {
//   const aJson = jsonDDMMYYDate(a);
//   const bJson = jsonDDMMYYDate(b);
//   if (aJson.year === bJson.year) {
//     if (aJson.month === bJson.month) {
//       if (aJson.day === bJson.day) {
//         return 0;
//       } else return aJson.day < bJson.day ? -1 : 1;
//     } else {
//       return aJson.month < bJson.month ? -1 : 1;
//     }
//   } else {
//     return aJson.year < bJson.year ? -1 : 1;
//   }
// }
export const adminGetActivitiesColumnsFormat = [
  {
    name: "Nombre de la actividad",
    selector: (row) => row.activity_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Tipo de actividad",
    selector: (row) => row.activity_type_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Estado",
    selector: (row) => {
      if (row.finished === null) {
        return "Sin asignar";
      } else if (row.finished === 0) {
        return "En proceso";
      } else return "Finalizado";
    },
    wrap: true,
    sortable: true,
  },
  {
    name: "Eliminar",
    cell: (row) => {
      const { id_activity } = row;
      return (
        <IconButton
          onClick={async () => {
            try {
              await axios.delete("/audit-activities/" + id_activity);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      );
    },
  },
];
export const adminGetAuditorsColumnsFormat = [
  {
    name: "Organigrama",
    selector: (row) => (row.last_name ? row.last_name : ""),
    wrap: true,
    sortable: true,
  },
  {
    name: "Nombre del Auditor",
    selector: (row) => row.name || "S/N asignar",
    wrap: true,
    sortable: true,
  },
  {
    name: "Usuario activo",
    selector: (row) => (row.is_active === 0 ? "No" : "Si"),
    sortable: true,
  },
  {
    name: "Desactivar",
    cell: (row) => {
      const { id_user } = row;
      return (
        <IconButton
          onClick={async () => {
            try {
              await axios.delete("/auditors/" + id_user);
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      );
    },
    wrap: true,
  },
];
export const auditorGetActivitiesFormat = [
  {
    name: "Nombre de la actividad",
    selector: (row) => row.activity_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Tipo de actividad",
    selector: (row) => row.activity_type_name,
    wrap: true,
    sortable: true,
  },
  {
    name: "Estado",
    selector: (row) => {
      if (row.finished === null) {
        return "Sin asignar";
      }
      if (row.finished === 0) {
        return "En proceso";
      }
      return "Finalizado";
    },
    wrap: true,
    sortable: true,
  },
  {
    name: "Finalizar",
    cell: (row) => {
      return (
        <Button
          color="success"
          variant="contained"
          disabled={row.finished === 1}
          onClick={async () => {
            try {
              const response = await axios.get(
                "/audit-activities/" + row.id_activity
              );
              const { starting_date, ending_date } = response.data;
              await axios.put("/audit-activities/" + row.id_activity, {
                ...response.data,
                starting_date: updatedFormattedDate(starting_date),
                ending_date: updatedFormattedDate(ending_date),
                finished: 1,
              });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          Finalizar actividad
        </Button>
      );
    },
  },
];
export const auditorGetReportsByActivity = [
  { name: "Título", selector: (row) => row.title, wrap: true },
  { name: "Tipo", selector: (row) => row.id_report_type, wrap: true },
  { name: "Descarga", selector: (row) => row.link, wrap: true },
  {
    name: "Eliminar",
    cell: (row) => {
      return (
        <IconButton
          onClick={async () => {
            try {
              const isFinishedResponse = await axios.get(
                "/audit-activities/" + row.id_activity
              );
              const { finished } = isFinishedResponse.data;
              if (finished === 0) {
                await axios.delete("/reports/" + row.id_report);
              } else {
                console.log("No se edita porque ya está finalizado");
              }
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      );
    },
    wrap: true,
  },
];
