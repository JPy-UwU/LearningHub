import Link from "next/link";

import { Button } from "@/components/ui/button";

const CoursesPage = () => {
  return (
    <div className="p-6">
      <Link href="/admin/create">
        <Button>
          New Course
        </Button>
      </Link>
    </div>
  );
}

export default CoursesPage;