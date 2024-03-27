import Button from "./Button";

export default function AppHeader() {
  return (
    <div className="flex flex-row items-center bg-white px-8 py-2.5 shadow-[0_1px_0_0_rgba(0,0,0,0.10)]">
      <div className="w-[55px] h-[48px] rounded-[100px] bg-brand mr-4">
      </div>

      <span className="weight font-bold text-base text-displayText mr-10">
        Incubator
      </span>

      <div className="grow" />

      <Button label="Logout" buttonClassName="w-16 bg-white" textClassName="text-black" />
    </div>
  );
}