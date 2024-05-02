"use client";

import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, PointerSensor,
  TouchSensor,UniqueIdentifier, closestCenter, useSensor, useSensors
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import AddLessonBlock from "./AddLessonBlock";
import LessonBlockView from "./LessonBlock";
import { useCallback, useMemo, useState } from "react";
import useLessonBlocks from "../hooks/useLessonBlocks";
import { LessonBlock, LessonWithRelationships } from "@/requests/lesson";

export default function ViewLessonBlocks(props: { lesson?: LessonWithRelationships }) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const { lessonBlocks, setLessonBlocks } = useLessonBlocks(undefined, props.lesson?.lesson_blocks);
  const blockIds = useMemo(() => lessonBlocks.map((block) => block.id), [lessonBlocks]);
  const activeBlock = useMemo(() => lessonBlocks.find((block) => block.id === activeId), [activeId, lessonBlocks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
  );
  const handleDragStart = useCallback((e: DragStartEvent) => {
    const { active } = e;
    setActiveId(active.id);
  }, []);
  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    if (over?.id && active.id !== over.id) {
      const oldIndex = lessonBlocks.findIndex((block) => block.id === active.id);
      const newIndex = lessonBlocks.findIndex((block) => block.id === over.id);
      setLessonBlocks(arrayMove(lessonBlocks, oldIndex, newIndex));
    }
    setActiveId(null);
  }, [lessonBlocks, setLessonBlocks]);

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={blockIds} strategy={verticalListSortingStrategy}>
        {lessonBlocks.map((block, index) => (
          <div key={`${block.id}-${index}`} className="flex flex-col w-full max-w-[680px]">
            <AddLessonBlock index={index} />
            <LessonBlockView block={block} />
          </div>
        ))}
      </SortableContext>
      <DragOverlay>
        {activeId && <LessonBlockView block={activeBlock ?? {} as LessonBlock} />}
      </DragOverlay>
      <AddLessonBlock index={lessonBlocks.length} />
    </DndContext>
  );
}
