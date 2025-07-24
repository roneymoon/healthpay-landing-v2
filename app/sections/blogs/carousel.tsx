"use client";

import { type FC, useEffect, useState } from "react";
import { blogService } from "./services/blog-service";
import CarouselCard from "./components/carousel-card";
import styles from "./styles.module.css";
import { BlogPost } from "./types";
import LayoutWrapper from "@/components/layout-wrapper";
import SectionHeading from "@/components/sectionHeading";

const BlogsCarousel: FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await blogService.getBlogs();
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className={styles.blogs}>
        <LayoutWrapper>
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </LayoutWrapper>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.blogs}>
        <LayoutWrapper>
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Error loading blogs: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </LayoutWrapper>
      </section>
    );
  }

  return (
    <section className={styles.blogs} id="blogs">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <LayoutWrapper>
        <div className={styles.header}>
          <SectionHeading 
            badgeText="Blog" 
            heading="Latest Insights" 
          />
        </div>
        
        <div className={styles.carousel}>
          {blogs.length > 0 ? (
            blogs.map(blog => (
              <CarouselCard key={blog.id} blog={blog} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No blog posts available at the moment.</p>
            </div>
          )}
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default BlogsCarousel;

