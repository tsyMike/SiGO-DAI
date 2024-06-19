import { useEffect, useState } from "react";
import DinamicDataTableWithFilter from "../../DinamicDataTableWithFilter";
import axios from "../../../api/axiosConfig";
import { auditorGetReportsByActivity } from "../../../utils/columns";
import { ReportInfo } from "../../expandableRowsComponents";
export const AllReportsAssigned = ({ id_activity }) => {
  const [assignedReports, setAssignedReports] = useState([]);
  const [activityIsFinished, setActivityIsFinished] = useState(true);
  useEffect(() => {
    const fetchAssignedReports = async () => {
      const response = await axios.get("/reports/activity/" + id_activity);
      setAssignedReports(response.data);
    };
    const fetchActivity = async () => {
      try {
        const response = await axios.get("/audit-activities/" + id_activity);
        const { finished } = response.data;
        if (finished === 1) {
          setActivityIsFinished(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
    fetchAssignedReports();
  }, [id_activity, assignedReports]);
  return (
    <DinamicDataTableWithFilter
      data={assignedReports}
      columnsData={auditorGetReportsByActivity}
      title="Informes adjuntados"
      filterParam="title"
      expandableRowsValue={activityIsFinished}
      expandableRowsComponent={ReportInfo}
    />
  );
};
