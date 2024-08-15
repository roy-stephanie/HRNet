import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';

/**
 * EmployeeTable component displays a table of employees with pagination, sorting, and filtering functionalities.
 * It uses the `@tanstack/react-table` library for table management and `react-redux` for state management.
 */
function EmployeeTable() {
  const employees = useSelector((state) => state.employees);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  /**
   * Defines the columns for the table, including headers and accessor keys
   * to map data fields to table columns.
   */
  const columns = React.useMemo(
    () => [
      { header: 'First Name', accessorKey: 'firstName', className: 'col-first-name' },
      { header: 'Last Name', accessorKey: 'lastName', className: 'col-last-name' },
      { header: 'Start Date', accessorKey: 'startDate', className: 'col-start-date' },
      { header: 'Department', accessorKey: 'department', className: 'col-department' },
      { header: 'Date of Birth', accessorKey: 'dateOfBirth', className: 'col-date-of-birth' },
      { header: 'Street', accessorKey: 'address.street', className: 'col-street' },
      { header: 'City', accessorKey: 'address.city', className: 'col-city' },
      { header: 'State', accessorKey: 'address.state', className: 'col-state' },
      { header: 'Zip Code', accessorKey: 'address.zipCode', className: 'col-zip-code' },
    ],
    []
  );

  /**
   * Initializes the table instance using `useReactTable` hook with the specified configurations:
   * - data: The list of employees
   * - columns: The column definitions
   * - pageCount: Total number of pages based on the data length and page size
   * - state: Manages global filtering and pagination
   * - globalFilterFn: Specifies the filtering method ('includesString')
   * - getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel: Plugins for row models
   */
  const table = useReactTable({
    data: employees,
    columns,
    pageCount: Math.ceil(employees.length / pageSize),
    state: {
      globalFilter,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  return (
    <div className="table-container">
      <h1 className="section-title">Current Employees</h1>

      {/* Global filter input */}
      <input
        type="text"
        placeholder="Search..."
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="form-control mb-3"
      />

      {/* Employee table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="header-row">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`header-cell sortable ${header.column.columnDef.className}`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  {header.column.getIsSorted() &&
                    (header.column.getIsSorted() === 'asc'
                      ? ' 🔼'
                      : ' 🔽')}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="body-row">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`body-cell ${cell.column.columnDef.className}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button
            className="btn btn-primary me-2"
            onClick={() => {
              table.previousPage();
              setPageIndex((old) => Math.max(old - 1, 0));
            }}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              table.nextPage();
              setPageIndex((old) => Math.min(old + 1, table.getPageCount() - 1));
            }}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
        <span className="pagination-stats">
          Page&nbsp;<strong>{pageIndex + 1}&nbsp;/&nbsp;{table.getPageCount()}</strong>
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            const newSize = Number(e.target.value);
            setPageSize(newSize);
            setPageIndex(0);
          }}
          className="form-select w-auto"
        >
          {[10, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EmployeeTable;
