"use client";

import { PropsWithChildren, useCallback, useState } from "react";
import dynamic from 'next/dynamic';
import rehypeSanitize from "rehype-sanitize";
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  value?: string;
  onChange?: (value?: string) => void;
}

export default function MarkdownEditor(props: PropsWithChildren<MarkdownEditorProps>) {
  const { value="", onChange } = props;
  const [data, setData] = useState<string | undefined>(value);
  const handleChange = useCallback((text?: string) => {
    onChange?.(text);
    setData(text);
  }, [onChange]);

  return (
    <div>
      <MDEditor
        value={data}
        onChange={handleChange}
        highlightEnable={false}
        previewOptions={{  rehypePlugins: [[rehypeSanitize]] }}
      />
    </div>
  );
}
