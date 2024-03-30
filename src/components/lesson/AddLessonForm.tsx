"use client";

import LessonHeader from "@/components/LessonHeader";
import { Course } from "@/graphql/graphql";
import LessonIntro from "./Intro";
import LessonRecap from "./Recap";
import AddLessonBlock from "./AddLessonBlock";
import LessonBlockView from "./LessonBlock";
import useLessonBlocks from "../hooks/useLessonBlocks";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, PointerSensor, TouchSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { useCallback, useMemo, useState } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function AddLessonForm({ course }: { course: Course }) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const { lessonBlocks, setLessonBlocks } = useLessonBlocks();
  const blockIds = useMemo(() => lessonBlocks.map((block) => block.id), [lessonBlocks]);
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
    <form className="flex flex-col w-full grow overflow-hidden">
      <LessonHeader course={course} />

      <div className="flex grow flex-col items-center overflow-auto">
        <LessonIntro course={course} />

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

          </DragOverlay>
        </DndContext>

        <AddLessonBlock index={lessonBlocks.length} />
        <LessonRecap />
      </div>
    </form>
  );
}
