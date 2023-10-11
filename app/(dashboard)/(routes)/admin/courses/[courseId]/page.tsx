import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/login");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId
    }
  });

  if (!course) {
    return redirect("/dashboard");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionTest = `${completedFields}/${totalFields} fields completed.`;

  return (
    <div className="p-6">
      CourseIdPage
    </div>
  );
}
 
export default CourseIdPage;