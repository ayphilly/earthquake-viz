import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
  type RowSelectionState,
} from "@tanstack/react-table";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useEarthquakeStore } from "../store/useEarthquakeStore";
import type { EarthquakeData } from "../types/earthquake";
import ReactPaginate from "react-paginate";
import { PAGE_SIZE } from "../utils/constants";
import Inputfield from "./inputs/InputField";
import Button from "./inputs/Button";
import moment from "moment";
import { getMagnitudeStyle } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faArrowsUpDown,
} from "@fortawesome/free-solid-svg-icons";
import { setNewEarthquakeData, setPageIndex } from "../store/earthquakeSlice";

const columnHelper = createColumnHelper<EarthquakeData>();

const DataTable: React.FC = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const { allEarthquakes,filteredEarthquakes, totalItems, pageIndex } = useAppSelector(
    (state) => state.earthquake
  );
  const { selectedEarthquake, selectEarthquake } = useEarthquakeContext();
  const { setHighlightedRecord } = useEarthquakeStore();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableRef.current) {
      gsap.fromTo(
        tableRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  const formatNumber = (value: number) => {
    return value.toFixed(2);
  };

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: "S/N",
        cell: (item) => <p>{item.row.index + 1}</p>,
        size: 50,
      }),
      columnHelper.accessor("time", {
        header: "Time",
        cell: (info) => moment(info.getValue()).format("YYYY-MM-DD"),
        sortingFn: "datetime",
        size: 250,
      }),
      columnHelper.accessor("place", {
        header: "Place",
        cell: (info) => (
          <div className="max-w-xs truncate font-medium text-main-902">
            {info.getValue()}
          </div>
        ),
        size: 250,
      }),
      columnHelper.accessor("mag", {
        header: "Magnitude",
        cell: (info) => {
          const mag = info.getValue();
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getMagnitudeStyle(
                mag
              )}`}
            >
              {formatNumber(mag)}
            </span>
          );
        },
        sortingFn: "alphanumeric",
        size: 100,
      }),
      columnHelper.accessor("depth", {
        header: "Depth (km)",
        cell: (info) => formatNumber(info.getValue()),
        sortingFn: "alphanumeric",
        size: 100,
      }),
      columnHelper.accessor("latitude", {
        header: "Latitude",
        cell: (info) => formatNumber(info.getValue()),
        sortingFn: "alphanumeric",
        size: 100,
      }),
      columnHelper.accessor("longitude", {
        header: "Longitude",
        cell: (info) => formatNumber(info.getValue()),
        sortingFn: "alphanumeric",
        size: 100,
      }),
      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => info.getValue(),
        size: 100,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          return (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                status === "reviewed"
                  ? "bg-main-100 text-main-800"
                  : "bg-sec-100 text-sec-800"
              }`}
            >
              {status}
            </span>
          );
        },
        size: 100,
      }),
      columnHelper.accessor("nst", {
        header: "Stations",
        cell: (info) => info.getValue(),
        sortingFn: "alphanumeric",
        size: 80,
      }),
      columnHelper.accessor("gap", {
        header: "Gap",
        cell: (info) => formatNumber(info.getValue()),
        sortingFn: "alphanumeric",
        size: 80,
      }),
      columnHelper.accessor("dmin", {
        header: "DMin",
        cell: (info) => formatNumber(info.getValue()),
        sortingFn: "alphanumeric",
        size: 80,
      }),
      columnHelper.accessor("rms", {
        header: "RMS",
        cell: (info) => formatNumber(info.getValue()),
        sortingFn: "alphanumeric",
        size: 80,
      }),
      columnHelper.accessor("net", {
        header: "Network",
        cell: (info) => info.getValue(),
        size: 80,
      }),
      columnHelper.accessor("magType", {
        header: "Mag Type",
        cell: (info) => info.getValue(),
        size: 80,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredEarthquakes,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: PAGE_SIZE,
      },
    },
  });

  const startItem = totalItems === 0 ? 0 : pageIndex * PAGE_SIZE + 1;
  const endItem = Math.min((pageIndex + 1) * PAGE_SIZE, totalItems);

  const handlePageClick = (event: { selected: number }) => {
    const newIndex = event.selected+1
    const start = (newIndex > 0 ? newIndex - 1 : 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const paginatedData = allEarthquakes.slice(start,end);

    dispatch(setPageIndex(event.selected));
    dispatch(setNewEarthquakeData(paginatedData));
  };

  const handleRowClick = (earthquake: EarthquakeData) => {
    selectEarthquake(earthquake);
  };

  const handleRowHover = (earthquake: EarthquakeData | null) => {
    setHighlightedRecord(earthquake);
  };

  const getRowClasses = (earthquake: EarthquakeData) => {
    let classes =
      "hover:bg-main-100 cursor-pointer transition-colors duration-200 ";
    if (selectedEarthquake?.id === earthquake.id) {
      classes += "bg-main-200 ";
    }
    return classes;
  };

  return (
    <div
      ref={tableRef}
      className="h-full bg-white rounded-xl shadow-sm border border-sec-200 p-6 flex flex-col"
    >
      <div className="w-full flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-main-902 mb-2">
          Earthquake Table
        </h2>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-sec-600 hidden">
            {table.getFilteredRowModel().rows.length} of{" "}
            {filteredEarthquakes.length} earthquakes
          </p>
          <div className="w-fit flex gap-2 items-center">
            <div className="w-[350px] h-[2.75em] flex items-center ">
              <Inputfield
                name="search"
                label=""
                value={globalFilter}
                placeholder="Search all columns..."
                icon={true}
                addOns="!h-[2.75em]"
                iconStyle="text-[1em] text-main-200"
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>

            {Object.keys(rowSelection).length > 0 && (
              <Button
                text="Clear Selection"
                Click={() => setRowSelection({})}
                btnType="button"
                small={true}
                type="secondary"
                className="!px-[1em] !w-fit !h-[2.25em] !py[.8em]  hover:bg-sec-300 transition-colors"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto border border-sec-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-sec-100 sticky top-0">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 text-left font-medium text-sec-800 border-b border-sec-200"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-1 whitespace-nowrap"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getCanSort() && (
                          <span className="text-xs">
                            {{
                              asc: (
                                <FontAwesomeIcon
                                  icon={faArrowUp}
                                  className="text-[.75em] text-sec-400"
                                />
                              ),
                              desc: (
                                <FontAwesomeIcon
                                  icon={faArrowDown}
                                  className="text-[.75em] text-sec-400"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <FontAwesomeIcon icon={faArrowsUpDown} />
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={getRowClasses(row.original)}
                onClick={() => handleRowClick(row.original)}
                onMouseEnter={() => handleRowHover(row.original)}
                onMouseLeave={() => handleRowHover(null)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-sec-700 border-b border-sec-100 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {table.getRowModel().rows.length === 0 && (
          <div className="text-center py-8 text-sec-500">
            No earthquake data matches your filters
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="w-full px-[1em] flex justify-between py-[1em]">
          <p></p>
          <div className="flex items-center gap-[1em]">
            <p className="text-xs font-[400] text-neutral-700">
              {startItem} - {endItem} of {totalItems}
            </p>

            {/* {filteredEarthquakes?.length} */}
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              initialPage={pageIndex-1}
              pageCount={Math.ceil(totalItems / PAGE_SIZE)}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName={"paginationList"}
            />
          </div>
          <p className="text-[.85em] font-[300] font-outfit text-neutral-500">
            {totalItems} Items
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
