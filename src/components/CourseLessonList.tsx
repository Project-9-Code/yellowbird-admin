"use client";

import { ColumnDef, Row, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import DragHandle from "@/svgs/drag-handle.svg";
import Info from "@/svgs/info.svg";
import Ellipses from "@/svgs/ellipses.svg";
import Image from "next/image";
import useSelectedIds from "./hooks/useSelectedIds";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, useCallback, useMemo } from "react";
import { DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { archiveLesson } from "@/actions/lesson";
import { Lesson } from "@/requests/lesson";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface CourseLessonListProps {
  lessons?: Lesson[];
  courseId?: string;
}

export default function CourseLessonList(props: CourseLessonListProps) {
  const isDev = process.env.NODE_ENV === "development";
  const { lessons=[] } = props;
  const { toggleAllIds, isAllSelected } = useSelectedIds("selectedLessons");
  const columnHelper = createColumnHelper<Lesson>();
  const lessonIds = lessons.map((lesson) => lesson?.id).filter((id) => id !== undefined && id !== null) as string[];
  const allLessonsSelected = isAllSelected(lessonIds);
  const toggleAllLessons = useCallback(() => toggleAllIds(lessonIds), [lessonIds, toggleAllIds]);

  const columns: ColumnDef<Lesson, any>[] = useMemo(() => [
    columnHelper.accessor("created_at", {
      cell: RowHandleCell,
      header: () => null,
    }),
    columnHelper.accessor("id", {
      cell: SelectCell,
      header: () => <input type="checkbox" checked={allLessonsSelected} onChange={toggleAllLessons} />,
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
            {author?.full_name ?? "Uknown"}
          </span>
        );
      },
      header: () => <h6>Author</h6>
    }),
    columnHelper.accessor("updated_at", {
      cell: (info) => {
        const date = info.getValue() ?? info.row.getValue("updated_at");
        return <span>{date ? 
          `${new Date(parseInt(date)).toLocaleTimeString()}` : 
          "Unknown"}</span>;
      },
      header: () => <h6>Last Updated</h6>
    }),
    columnHelper.accessor("course", {
      cell: (info) => (
        <div className="flex flex-row">
          <LessonDialog lesson={info.row.original} />
          <CourseDropdownMenu lessonId={info.row.getValue("id")} />
        </div>
      ),
      header: () => null,
    }),
  ], [allLessonsSelected, columnHelper, toggleAllLessons]);

  const table = useReactTable({
    data: lessons,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    debugTable: isDev,
    debugHeaders: isDev,
    debugColumns: isDev,
  });

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    console.log(active, over);
  }, []);

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
          <SortableContext items={lessonIds} strategy={verticalListSortingStrategy}>
            {table.getRowModel().rows.map(row => <TableRow key={row.id} row={row} />)}
          </SortableContext>
        </tbody>
      </table>
    </DndContext>
  );
}

function RowHandleCell({ row }: { row: Row<Partial<Lesson>> }) {
  const { attributes, listeners } = useSortable({ id: row.id });
  return (
    <div className="flex w-full h-full">
      <button className="pl-5" {...attributes} {...listeners} aria-describedby="">
        <Image src={DragHandle} alt="Drag Handle" />
      </button>
    </div>
  )
}

function TableRow({ row }: { row: Row<Partial<Lesson>>}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id ?? "",
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  };

  return (
    <tr style={style} ref={setNodeRef}>
      {row.getVisibleCells().map(cell => (
        <td key={cell.id} className="py-5">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
}

function SelectCell({ row }: { row: Row<Partial<Lesson>>}) {
  const { selectedIds, toggleId } = useSelectedIds("selectedLessons");
  return (
    <input
      type="checkbox"
      checked={selectedIds.includes(row.id)}
      onChange={() => toggleId(row.id)}
    />
  );
}

function CourseDropdownMenu({ lessonId }: { lessonId: string }) {
  const router = useRouter();
  const onArchive = useCallback((lessonId: string) => async () => {
    await archiveLesson(lessonId);
    router.refresh();
  }, [router]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image src={Ellipses} alt="More Options" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/lesson/${lessonId}`}>Edit lesson</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button type="button" onClick={onArchive(lessonId)}>
            Archive lesson
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LessonDialog({ lesson }: { lesson: Lesson }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Image src={Info} alt="Info Handle" className="mr-5"/>
      </DialogTrigger>
      <DialogContent className="w-[550px] h-[323px]">
        <DialogHeader>
          <DialogTitle className="font-ginto text-headlineText text-[30px] tracking-[-0.3px] leading-9">
            Create Lesson
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  );
}
