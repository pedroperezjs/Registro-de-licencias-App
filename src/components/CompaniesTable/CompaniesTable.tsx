import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export interface CompanyRow {
  id: string;
  nameCompany: string;
  rutCompany: string;
  created_at?: string;
}

interface CompaniesTableProps {
  rows: CompanyRow[];
  loading?: boolean;
  onDelete?: (id: string) => void;
}

export const CompaniesTable = ({
  rows,
  loading = false,
  onDelete,
}: CompaniesTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table
        arial-label="Empresas"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre</strong>
            </TableCell>
            <TableCell>
              <strong>RUT</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Acciones</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  color="text.secondary"
                  sx={{ py: 2 }}
                >
                  No hay empresas registradas todavía.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                hover
              >
                <TableCell>{row.nameCompany}</TableCell>
                <TableCell>{row.rutCompany}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Eliminar">
                    <span>
                      <IconButton
                        aria-label={`Eliminar ${row.nameCompany}`}
                        onClick={() => onDelete?.(row.id)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
