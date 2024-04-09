import { LessonBlock, LessonBlockTypes } from "@/graphql/graphql";
import TextBlock from "./TextBlock";
import MediaBlock from "./Media";
import MultiChoice from "./MultiSelect";
import Choice from "./Choice";

export default function LessonBlockView(props: { block: LessonBlock }) {
  const { block } = props;
  switch (block.type) {
    case LessonBlockTypes.Text:
      return <TextBlock block={props.block} />;
    case LessonBlockTypes.Media:
      return <MediaBlock block={block} />;
    case LessonBlockTypes.Video:
      return <MediaBlock block={block} inputLabel="Video Link" urlKey="videoUrl" textKey="videoText" />;
    case LessonBlockTypes.Choice:
      return <Choice block={props.block} />;
    case LessonBlockTypes.MultiChoice:
      return <MultiChoice block={props.block} />;
    case LessonBlockTypes.MultiSelect:
      return <MultiChoice block={props.block} multiple />;

    default:
      return null;
  }
}
