import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { TableRow, TableCell, MenuItem } from '@mui/material';
// components
import Iconify from 'src/components/Iconify';
import { TableMoreMenu } from 'src/components/table';

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  onEditRow: PropTypes.func,
  onDeleteRow: PropTypes.func
};

export default function UserTableRow({ row, onEditRow, onDeleteRow }) {
  const { name, priority } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{priority}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Xóa
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                Chỉnh sửa
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
