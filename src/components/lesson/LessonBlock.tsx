import { LessonBlock } from "@/graphql/graphql";
import TextBlock from "./TextBlock";

export default function LessonBlockView(props: { block: LessonBlock }) {
  const { block } = props;
  switch (block.type) {
    case "TEXT":
      return <TextBlock block={props.block} />;
    case "MEDIA":
      return <h1>Here</h1>;

    default:
      return null;
  }
}
