"use client";

import { PropsWithChildren, useCallback, useState } from "react";
import dynamic from 'next/dynamic';
import rehypeSanitize from "rehype-sanitize";

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value?: string) => void;
}

export default function MarkdownEditor(props: PropsWithChildren<MarkdownEditorProps>) {
  const { id, name, value="", onChange } = props;
  const [data, setData] = useState<string | undefined>(value);
  const handleChange = useCallback((text?: string) => {
    onChange?.(text);
    setData(text);
  }, [onChange]);

  return (
    <MDEditor
      value={data}
      onChange={handleChange}
      highlightEnable={false}
      previewOptions={{  rehypePlugins: [[rehypeSanitize]] }}
      textareaProps={{ id, name }}
    />
  );
}
