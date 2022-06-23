import * as React from 'react';

// mui core
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// model
import{ IHeadCell } from 'models/ITable';

interface IProps {
  headCells: IHeadCell[];
  rows: any[];
  renderRows: (rowItem: any) => React.ReactNode;
}

const TableNutrition: React.FC<IProps> = ({ headCells, rows, renderRows }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
          <TableHead>
            <TableRow>
              {headCells.map(headCell => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding="normal"
                  data-testid={headCell.dataTestId}
                >
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
            <TableBody>
              {rows.map(renderRows)}
            
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}


export default TableNutrition;