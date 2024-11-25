import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "@/features/blogSlice";
import { AppDispatch, RootState } from "@/store/store";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Blogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  const formatDate = (date: string) => {
    const dateObj = new Date(date);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // months are zero indexed
    const day = dateObj.getDate();

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch])

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center ">
        {blogs?.map((blog) => (
          <Card key={blog._id}>
            <CardHeader className="space-y-0">
              <CardTitle className="line-clamp-1 break-all leading-2">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-1">{blog.content}</p>
            </CardContent>
            <CardFooter>
              <span className="text-xs text-slate-400">{formatDate(blog.createdAt)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Blogs