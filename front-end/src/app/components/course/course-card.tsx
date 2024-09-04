import { ICourse } from "@/app/interfaces/course-interface";

interface I {
  course: ICourse;
}

function CourseCard({ course }: I) {
    return <>
        {course.title}
    </>
}

export default CourseCard;
