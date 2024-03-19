import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

const PetsTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, globalFilter: filtering },
    onSortingChange: setSorting,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="h-full flex flex-col items-center justify-center text-center rounded-md">
      <div className="bg-zinc-900 inline-block p-4 mb-4 rounded-md">
        <label htmlFor="filter" className="text-white font-bold">
          Buscar:
        </label>
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="text-black ml-4 rounded-md"
        />
      </div>
      {/* table {
  border-collapse: collapse;
  border-radius: 25px;
  box-shadow: inset 0 0 0 1px;
} */}

      <div className="bg-zinc-300 p-4 mb-4 rounded-md items-center justify-center">
        <table className="table-auto w-full">
          <thead className="text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-zinc-900">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: "⬆️", des: "⬇️" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
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
                className="odd:bg-zinc-100 odd:dark:bg-zinc-900 even:bg-zinc-200 even:dark:bg-zinc-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-zinc-900 inline-block p-4 rounded-md">
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-sm font-bold px-3 py-1 mr-4 rounded-md"
          onClick={() => table.setPageIndex(0)}
        >
          First page
        </button>
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-sm font-bold px-3 py-1 mr-4 rounded-md"
          onClick={() => table.previousPage()}
        >
          Previous page
        </button>
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-sm font-bold px-3 py-1 mr-4 rounded-md"
          onClick={() => table.nextPage()}
        >
          Next page
        </button>
        <button
          className="bg-zinc-600 hover:bg-zinc-700 text-sm font-bold px-3 py-1 rounded-md"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last page
        </button>
      </div>
    </div>
  );
};

export default PetsTable;
