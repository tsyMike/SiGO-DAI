import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../api/axiosConfig";
import { formattedDate, updatedFormattedDate } from "./formatDate";
export const adminGetActivitiesColumnsFormat = [
  {
    name: "Nombre de la actividad",
    selector: (row) => row.activity_name,
    wrap: "true",
  },
  {
    name: "Tipo de actividad",
    selector: (row) => row.activity_type_name,
    wrap: "true",
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
    wrap: "true",
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
    name: "Nombre del Auditor",
    selector: (row) => row.last_name + " " + row.name,
    wrap: "true",
  },
  {
    name: "Prefesión del Auditor",
    selector: (row) => row.profession,
    wrap: "true",
  },
  {
    name: "Fecha de incorporación",
    selector: (row) => formattedDate(row.incorporation_date),
    wrap: "true",
  },
  {
    name: "Eliminar",
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
    wrap: "true",
  },
  {
    name: "Tipo de actividad",
    selector: (row) => row.activity_type_name,
    wrap: "true",
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
    wrap: "true",
  },
  {
    name: "Eliminar",
    cell: (row) => {
      return (
        <IconButton
          disabled={row.finished}
          onClick={async () => {
            try {
              console.log(row);
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
          <DoneIcon color="success" />
        </IconButton>
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
              console.log(finished);
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
