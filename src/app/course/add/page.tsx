import AddCourseForm from "./components/AddCourseForm";

export default async function AddCourse() {
  return (
    <div className="w-full h-full bg-snowGrey">
      <div className="flex flex-col grow mt-16 bg-white border-borderBg border-[1px] w-[700px] h-[500px] mx-auto rounded-2xl">
        <h1 className="text-headlineText text-[32px] font-bold py-6 px-10">
          Create Course
        </h1>

        <AddCourseForm />
      </div>
    </div>
  );
}
