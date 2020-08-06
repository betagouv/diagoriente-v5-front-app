import React, { useState, useEffect } from 'react';

import classNames from 'utils/classNames';

import Zoom from '@material-ui/core/Zoom/Zoom';
import BaseTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Settings from '@material-ui/icons/Settings';

import Pagination, { PaginationProps } from '../Pagination/Pagination';

import useStyles, { useIconsStyles } from './styles';

export function useActionsHeader<T extends { id: string }>(
  headers: Header<T>[],
  data: T[],
  options: {
    onEdit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: T, index: number) => void;
    onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: T, index: number) => void;
    onMultipleDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, values: string[]) => void;
  } = {},
): [Header<T>[], { id: string; checked: boolean }[], (values: { id: string; checked: boolean }[]) => void] {
  const classes = useIconsStyles();
  const [values, valuesChange] = useState<{ id: string; checked: boolean }[]>([]);

  useEffect(() => {
    if (!data.length && values.length) valuesChange([]);
    else {
      valuesChange((prevValues) =>
        data.map(({ id }) => prevValues.find((value) => value.id === id) || { id, checked: false }));
    }
    // eslint-disable-next-line
  }, [data]);

  function checkAll(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    valuesChange(values.map(({ id }) => ({ id, checked })));
  }

  function onCheckClick(e: React.ChangeEvent<HTMLInputElement>, checked: boolean, i: number) {
    const table = [...values];
    table[i] = { ...table[i], checked };
    valuesChange(table);
  }

  const improvedHeaders = [
    {
      title: values.length ? (
        <Checkbox
          classes={{ checked: classes.checkbox }}
          onChange={checkAll}
          checked={!values.find((value) => !value.checked)}
        />
      ) : (
        ''
      ),
      key: '__check__',
      render(value: any, record: T, i: number) {
        return (
          <Checkbox
            classes={{ checked: classes.checkbox }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => onCheckClick(event, checked, i)}
            checked={values[i] ? values[i].checked : false}
          />
        );
      },
    },
    ...headers,
    {
      title: (
        <div className={classes.deleteMultiple}>
          <Zoom in={!!(options.onMultipleDelete && values.find((value) => value.checked))}>
            <Tooltip title="Supprimer plusieurs">
              <IconButton
                onClick={(e) => {
                  if (options.onMultipleDelete) {
                    options.onMultipleDelete(
                      e,
                      values.filter((value) => value.checked).map((value) => value.id),
                    );
                  }
                }}
              >
                <Delete className={classNames(classes.icon, classes.delete)} />
              </IconButton>
            </Tooltip>
          </Zoom>
        </div>
      ),
      render(value: any, row: T, i: number) {
        return (
          <div className={classes.icons}>
            {options.onEdit && (
              <Tooltip title="Modifier">
                <IconButton
                  onClick={(e) => {
                    if (options.onEdit) options.onEdit(e, row, i);
                  }}
                >
                  <Settings className={classNames(classes.icon, classes.edit)} />
                </IconButton>
              </Tooltip>
            )}
            {options.onDelete && (
              <Tooltip title="Supprimer">
                <IconButton
                  onClick={(e) => {
                    if (options.onDelete) {
                      options.onDelete(e, row, i);
                    }
                  }}
                >
                  <Delete className={classNames(classes.icon, classes.delete)} />
                </IconButton>
              </Tooltip>
            )}
          </div>
        );
      },
      key: '__actions__',
    },
  ];

  return [improvedHeaders, values, valuesChange];
}

export interface Header<T extends { id: string }> {
  title: string | JSX.Element;
  key: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => JSX.Element | string | null;
}

export interface TableProps<T extends { id: string }> extends PaginationProps {
  headers: Header<T>[];
  data: T[];
  emptyComponent: JSX.Element | string;
  rowClassName?: string;
  onRowClick?: (row: T, index: number) => void;
  count?: number;
}

function Table<T extends { id: string }>({
  headers,
  data,
  emptyComponent,
  rowClassName,
  onRowClick,
  count,
  ...rest
}: TableProps<T>) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <BaseTable>
        <TableHead className={classes.head}>
          <TableRow>
            {headers.map((header) => (
              <TableCell className={classes.headerItem} key={header.key} align="left">
                {header.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length
            ? data.map((row, i) => (
              <TableRow
                onClick={() => {
                    if (onRowClick) onRowClick(row, i);
                  }}
                className={rowClassName}
                key={row.id}
              >
                {headers.map((header) => {
                    let value: any = header.dataIndex ? row[header.dataIndex] : null;
                    if (header.render) {
                      value = header.render(value, row, i);
                    }

                    return (
                      <TableCell className={classes.rowItem} key={header.key} align="left">
                        {value}
                      </TableCell>
                    );
                  })}
              </TableRow>
              ))
            : null}
        </TableBody>
        {rest.totalPages ? (
          <TableFooter>
            <TableRow>
              <td colSpan={1000} className={classes.paginationWrapper}>
                <div className={classes.paginationContainer}>
                  <Chip label={`${count}`} color="primary" className={classes.pagesCount} />
                  <Pagination {...rest} />
                </div>
              </td>
            </TableRow>
          </TableFooter>
        ) : null}
      </BaseTable>
    </Paper>
  );
}
Table.defaultProps = {
  emptyComponent: 'empty data',
};
export default Table;
