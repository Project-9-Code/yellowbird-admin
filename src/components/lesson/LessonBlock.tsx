import TextBlock from "./TextBlock";
import MediaBlock from "./Media";
import MultiChoice from "./MultiSelect";
import Choice from "./Choice";
import { LessonBlock } from "@/requests/lesson";

export default function LessonBlockView(props: { block: LessonBlock }) {
  const { block } = props;
  switch (block.block_type) {
    case "TEXT":
      return <TextBlock block={props.block} />;
    case "MEDIA":
      return <MediaBlock block={block} />;
    case "VIDEO":
      return <MediaBlock block={block} inputLabel="Video Link" urlKey="videoUrl" textKey="videoText" />;
    case "CHOICE":
      return <Choice block={props.block} />;
    case "MULTI_CHOICE":
      return <MultiChoice block={props.block} />;
    case "MULTI_SELECT":
      return <MultiChoice block={props.block} multiple />;

    default:
      return null;
  }
}
