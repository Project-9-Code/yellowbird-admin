import clsx from "clsx";

export default function Title({ title, className }: { title: string, className?: string }) {
  return (
    <h1 className={clsx("text-headlineText font-ginto text-[30px] font-bold", className)}>
      {title}
    </h1>
  );
}
