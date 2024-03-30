import { LessonBlock } from "@/graphql/graphql";
import Card from "../Card";
import { LegacyRef, forwardRef } from "react";

export default forwardRef(function LessonBlockOverlay({ block, ...props }: { block: LessonBlock }, ref: LegacyRef<HTMLDivElement>) {
  return (
    <div {...props} ref={ref}>
      <Card>
        <h1>{block.type}</h1>
      </Card>
    </div>
  );
});

