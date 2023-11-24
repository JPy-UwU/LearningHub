import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

const DashboardPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const {
    completedCourses,
    coursesInProgress,
  } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          {/* TODO: Info Card */}
        </div>
        <div>
          {/* TODO: Info Card */}
        </div>
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  );
}
 
export default DashboardPage;