import { useEffect, useState } from "react";
import DinamicDataTableWithFilter from "../../DinamicDataTableWithFilter";
import axios from "../../../api/axiosConfig";
import { auditorGetReportsByActivity } from "../../../utils/columns";
import { ReportInfo } from "../../expandableRowsComponents";
export const AllReportsAssigned = ({ id_activity }) => {
  const [assignedReports, setAssignedReports] = useState([]);
  useEffect(() => {
    const fetchAssignedReports = async () => {
      const response = await axios.get(
        "/reports/activity/" + id_activity
      );
      setAssignedReports(response.data);
    };
    fetchAssignedReports();
  }, [id_activity, assignedReports]);
  return (
    <DinamicDataTableWithFilter
      data={assignedReports}
      columnsData={auditorGetReportsByActivity}
      title="Informes adjuntados"
      filterParam="title"
      expandableRowsValue={true}
      expandableRowsComponent={ReportInfo}
    />
  );
};
