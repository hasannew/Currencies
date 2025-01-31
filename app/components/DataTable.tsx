import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
  Trash2,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { Item } from "../lib/types";

// Define generic type for table data
type SortDirection = "asc" | "desc" | null;
type ColumnType =
  | "string"
  | "number"
  | "datetime"
  | "Store"
  | "currency []"
  | "bulletin []"
  | "bulletin";

export interface Column {
  key: string;
  label: string;
  type: ColumnType;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  filtered_data: T[];
  itemsPerPage?: number;
  onAdd?: () => void;
  onDelete?: (item: Item) => void;
  onSort?: (key: string, direction: SortDirection) => void;
  onSearch?: (searchTerm: string) => void;
  isLoading?: boolean;
  isSearching?: boolean;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  filtered_data,
  itemsPerPage = 10,
  onAdd,
  onDelete,
  onSort,
  onSearch,
  isLoading = false,
  isSearching = true,
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({
    key: "",
    direction: null,
  });
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSort = (key: string) => {
    let direction: SortDirection = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "asc") direction = "desc";
      else if (sortConfig.direction === "desc") direction = null;
    }

    setSortConfig({ key, direction });
    onSort?.(key, direction);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    onSearch?.(value);
  };

  const isMobile = windowWidth < 640;

  const formatValue = (value: number | string, type: ColumnType) => {
    if (value === null || value === undefined) return "-";

    switch (type) {
      case "datetime":
        return new Date(value).toLocaleString();
      case "number":
        return typeof value === "number" ? value.toLocaleString() : value;
      default:
        return value;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header with search and add button */}
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            <span>Add New</span>
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer select-none" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <ArrowUpDown
                        size={14}
                        className={`transition-transform ${
                          sortConfig.key === column.key
                            ? sortConfig.direction === "asc"
                              ? "text-blue-600 rotate-0"
                              : "text-blue-600 rotate-180"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
              {onDelete && <th className="px-6 py-3 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (onDelete ? 1 : 0)}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onDelete ? 1 : 0)}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : isSearching && filtered_data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onDelete ? 1 : 0)}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : isSearching && filtered_data.length != 0 ? (
              filtered_data.slice(startIndex, endIndex).map((item: Item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap ${
                        column.type === "number" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatValue(item[column.key], column.type)}
                    </td>
                  ))}
                  {onDelete && (
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              data.slice(startIndex, endIndex).map((item: Item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`text-black px-6 py-4 whitespace-nowrap ${
                        column.type === "number" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatValue(item[column.key], column.type)}
                    </td>
                  ))}
                  {onDelete && (
                    <td className="px-6 py-4 text-right ">
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
            {data.length} entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            {!isMobile && (
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                  )
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[32px] h-8 rounded-md ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
              </div>
            )}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
