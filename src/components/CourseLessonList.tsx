"use client";

import { Lesson } from "@/graphql/graphql";
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable,  } from "@tanstack/react-table";
import DragHandle from "@/svgs/drag-handle.svg";
import Info from "@/svgs/info.svg";
import Ellipses from "@/svgs/ellipses.svg";
import Image from "next/image";

interface CourseLessonListProps {
  lessons?: Lesson[];
}

export default function CourseLessonList(props: CourseLessonListProps) {
  const isDev = process.env.NODE_ENV === "development";
  const { lessons=[] } = props;
  const columnHelper = createColumnHelper<Lesson>();
  const columns: ColumnDef<Lesson, any>[] = [
    columnHelper.accessor("id", {
      cell: () => (
        <button className="pl-5">
          <Image src={DragHandle} alt="Drag Handle" />
        </button>
      ),
      header: () => null,
    }),
    columnHelper.accessor("createdAt", {
      cell: () => <input type="checkbox" />,
      header: () => <input type="checkbox" />,
    }),
    columnHelper.accessor("title", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <h6>Lesson</h6>
    }),
    columnHelper.accessor("author", {
      cell: (info) => {
        const author = info.getValue();
        return (
          <span className="">
            {author?.name ?? "Uknown"}
          </span>
        );
      },
      header: () => <h6>Author</h6>
    }),
    columnHelper.accessor("lastUpdated", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <h6>Last Updated</h6>
    }),
    columnHelper.accessor("__typename", {
      cell: () => (
        <div className="flex flex-row">
          <button>
            <Image src={Info} alt="Drag Handle" className="mr-5"/>
          </button>
          <button>
            <Image src={Ellipses} alt="Drag Handle" />
          </button>
        </div>
      ),
      header: () => null,
    }),
  ];
  const table = useReactTable({
    data: lessons,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    debugTable: isDev,
    debugHeaders: isDev,
    debugColumns: isDev,
  })

  return (
    <table className="w-full bg-white rounded-md">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="text-left py-4">
                {header.isPlaceholder ? null : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} className="py-5">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
