import { useEffect } from 'react';
// @mui
import {
  Box,
  Card,
  Table,
  Switch,
  Button,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  DialogTitle
} from '@mui/material';

import Page from 'src/components/Page';
import { useRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/Iconify';
import useSettings from 'src/hooks/useSettings';
import Scrollbar from 'src/components/Scrollbar';
import { DialogAnimate } from 'src/components/animate';
import useTable, { emptyRows } from 'src/hooks/useTable';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData } from 'src/components/table';
import { RoleTableRow, UpsertRole } from 'src/sections/@dashboard/user/settingRole';
import Role from 'src/recoils/dashboard/role';
import { getAllRole } from 'src/api/role.api';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'priority', label: 'Priority', align: 'left' },
  { id: 'action', label: 'Action', align: 'right' }
];

// ----------------------------------------------------------------------

export default function RoleList() {
  const { dense, page, rowsPerPage, onChangeDense, onChangePage, onChangeRowsPerPage } = useTable();

  const { themeStretch } = useSettings();

  const [roleState, setRoleState] = useRecoilState(Role);
  const { roleList, total, isEdit } = roleState;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const roleRes = await getAllRole();
        setRoleState((prev) => ({ ...prev, roleList: roleRes?.data, total: roleRes?.total }));
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error?.message || 'Không thể tải danh sách role vì lỗi hệ thống!', { variant: 'error' });
      }
    })();
  }, []);

  const handleDeleteRow = async (_id) => {
    try {
      await singleDeleteRole(_id);
      const deleteRow = roleList?.filter((row) => row._id !== _id);
      setRoleState((prev) => ({ ...prev, roleList: deleteRow }));
      enqueueSnackbar('Đã xóa role!');
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err?.message || 'Không thể xóa role vì lỗi hệ thống!', { variant: 'error' });
    }
  };

  const handleCreateRole = () => {
    setRoleState((prev) => ({
      ...prev,
      currentRole: {},
      isUpsertRoleOpen: true,
      isEdit: false
    }));
  };
  const handleEditRow = (row) => {
    setRoleState((prev) => ({
      ...prev,
      currentRole: row,
      isUpsertRoleOpen: true,
      isEdit: true
    }));
  };
  const handleCloseDialog = () => {
    setRoleState((prev) => ({
      ...prev,
      isUpsertRoleOpen: false,
      currentRole: {},
      isEdit: false
    }));
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !roleList.length;

  return (
    <Page title="Role: Danh sách">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <DialogAnimate open={roleState.isUpsertRoleOpen} onClose={handleCloseDialog} maxWidth="xs">
          <DialogTitle sx={{ mb: 3 }}>{isEdit ? 'Chỉnh sửa role' : 'Tạo mới role'}</DialogTitle>
          <UpsertRole />
        </DialogAnimate>
        <HeaderBreadcrumbs
          heading="Danh sách role"
          links={[]}
          action={
            <Button variant="contained" onClick={handleCreateRole} startIcon={<Iconify icon={'eva:plus-fill'} />}>
              Thêm role
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom headLabel={TABLE_HEAD} />

                <TableBody>
                  {roleList?.map((row) => (
                    <RoleTableRow
                      key={row._id}
                      row={row}
                      onDeleteRow={() => handleDeleteRow(row._id)}
                      onEditRow={() => handleEditRow(row)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, roleList?.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={total}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
