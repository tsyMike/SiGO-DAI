import { Container, FormControl, InputLabel, Select, Stack, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import DataTableWithFilter from '../components/DataTableWithFilter';

export const AuditorsManagement = () => {
  return (
    <ThemeProvider>
      <Stack spacing={2} direction={"row"}>
        <Container>
          <Stack spacing={2} alignItems={"center"}>
            <Typography variant="h3">
              Registrar actividad de auditoria interna
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="activityType-label">Tipo de actividad</InputLabel>
              <Select
                id="activityType"
                labelId="activityType-label"
                label="Tipo de Actividad"
                name="activityType"
                value={activity.activityType}
                onChange={handleChange}
              >
                {activityTypes.map((e) => (
                  <MenuItem key={e.id_activity_type} value={e.id_activity_type}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Nombre de la Actividad"
              name="activityName"
              value={activity.activityName}
              onChange={handleChange}
            />
            <Typography>Fecha de inicio y finalización</Typography>
            <Stack spacing={1} direction="row">
              <TextField
                // label="Fecha de Vencimiento"
                type="date"
                name="startingDate"
                value={activity.startingDate}
                onChange={handleChange}
              />
              <TextField
                // label="Fecha de Vencimiento"
                type="date"
                name="endingDate"
                value={activity.endingDate}
                onChange={handleChange}
              />
              <TextField
                label="Tiempo estimado (dias)"
                type="number"
                name="estimatedTime"
                value={activity.estimatedTime}
                onChange={handleChange}
              />
            </Stack>
            <TextField
              label="Alcance"
              name="scope"
              value={activity.scope}
              onChange={handleChange}
            />
            <TextField
              label="Riesgos identificados"
              name="riskDescription"
              value={activity.riskDescription}
              onChange={handleChange}
            />
            <Stack direction="row" alignItems="center">
              Actividad programada
              <Checkbox
                label="Actividad programada"
                name="programmed"
                checked={activity.programmed}
                onChange={handleChange}
              />
            </Stack>
            <FormControl fullWidth>
              <InputLabel id="auditedUnit-label">Unidad auditada</InputLabel>
              <Select
                id="auditedUnit"
                labelId="auditedUnit-label"
                label="Unidad aduitada"
                name="unitReference"
                value={activity.unitReference}
                onChange={handleChange}
              >
                {auditedUnits.map((e) => (
                  <MenuItem key={e.id_user} value={e.id_user}>
                    {e.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Typography>Subir memorandum</Typography>
            <Input required type="file" /> */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Registrar Actividad
            </Button>
          </Stack>
        </Container>
        <DataTableWithFilter />
      </Stack>
    </ThemeProvider>
  );
}
