import { useState } from 'react';
import { Typography, Box, Container, useTheme, useMediaQuery } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { milestones } from '../../data/milestones';

const columns: GridColDef[] = [
  { field: 'milestone', headerName: 'Milestone', width: 250 },
  { field: 'status', headerName: 'Status', width: 150 },
  {
    field: 'progress',
    headerName: 'Progress',
    width: 150,
    renderCell: (params) => (
      <Box sx={{ width: '100%', bgcolor: '#e0e0e0', borderRadius: 1 }}>
        <Box
          sx={{
            width: `${params.value}%`,
            bgcolor: params.value < 50 ? 'warning.main' : 'success.main',
            height: '100%',
            borderRadius: 1,
            textAlign: 'center',
            color: 'white',
            p: 0.5,
          }}
        >
          {params.value}%
        </Box>
      </Box>
    ),
  },
  { field: 'due_date', headerName: 'Due Date', width: 150 },
];

const MilestonesTable = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [rows] = useState(milestones);

  return (
    <Box sx={{ py: mobile ? 4 : 8, bgcolor: 'background.paper' }} id="milestones">
      <Container>
        <Typography
          variant="h2"
          align="center"
          mt={mobile ? 4 : 4}
          gutterBottom
          sx={{
            mb: mobile ? 4 : 6,
            color: 'primary.main',
            fontSize: mobile ? '1.5rem' : '2.5rem',
          }}
        >
          Project Milestones
        </Typography>
        <Box sx={{ height: mobile ? 300 : 400, width: '100%', my: 4 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
            pageSizeOptions={[5, 10]}
            sx={{
              '& .MuiDataGrid-cell': { fontSize: mobile ? '0.8rem' : '0.9rem' },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontSize: mobile ? '0.9rem' : '1rem',
                fontWeight: 600,
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default MilestonesTable;