export default function ListToolbar() {
  return (
    <div className="absolute p-4 bg-black top-0 left-0 flex flex-row gap-x-4">
      <div className="flex flex-row">
        <input type="checkbox" className="h-4 w-4 cursor-pointer mr-2" />
        <span className="text-white text-base">
          Select all
        </span>
      </div>
    </div>
  )
}