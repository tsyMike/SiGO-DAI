import { Button, Grid, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DinamicDataTableWithFilter from '../../components/DinamicDataTableWithFilter';
import { AuditorManagement } from '../../components/expandableRowsComponents';
import { adminGetAuditorsColumnsFormat } from '../../utils/columns';
import axios from '../../api/axiosConfig';
import { AddAuditor } from '../../components/admin-components/users-management/AddAuditor';

export const UsersManagement = () => {
  const [auditors, setAuditors] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchAuditors = async () => {
      try {
        const response = await axios.get("/auditors");
        setAuditors(response.data);
      } catch (error) {
        console.error("Error fetching auditors:", error);
      }
    };
    fetchAuditors();
  }, [auditors]);
  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        sx={{ overflow: "auto" }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <AddAuditor />
      </Modal>
      <Grid item xs={1}></Grid>
      <Grid item xs={7}>
        <Typography variant="h4">Gestión de auditores</Typography>
      </Grid>
      <Grid item xs={4}>
        <Button
          onClick={() => setOpenModal(true)}
          size="small"
          variant="contained"
          color="success"
        >
          Agregar auditor
        </Button>
      </Grid>
      <Grid item xs={12}>
        <DinamicDataTableWithFilter
          data={auditors}
          columnsData={adminGetAuditorsColumnsFormat}
          expandableRowsComponent={AuditorManagement}
          expandableRowsValue={true}
          title="Auditores registradas"
          filterParam="name"
        />
      </Grid>
    </>
  );
}
