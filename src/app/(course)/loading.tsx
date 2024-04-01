export default function LoadingCourses() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      <p className="mt-4 text-lg font-semibold text-gray-900">Loading ...</p>
    </div>
  );
}