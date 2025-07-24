"use client";

import { type FC, useEffect, useState } from "react";
import LayoutWrapper from "@/components/layout-wrapper";
import { cn } from "@/lib/utils";
import BlogCard from "./components/blog-card";
import { BlogPost } from "./types";
import { blogService } from "./services/blog-service";
import SectionHeading from "@/components/sectionHeading";
import styles from "./styles.module.css";

const Blogs: FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRealTimeConnected, setIsRealTimeConnected] = useState(false);

  useEffect(() => {
    // Initial fetch
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

    // Set up real-time updates
    const unsubscribe = blogService.subscribeToUpdates((updatedBlogs) => {
      setBlogs(updatedBlogs);
      setIsRealTimeConnected(true);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
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
            title="Latest Insights" 
            subtitle="Stay updated with the latest developments in AI-powered healthcare and insurance technology" 
          />
          
          {/* Real-time connection indicator */}
          <div className={styles.connectionStatus}>
            <div className={cn(
              styles.statusIndicator,
              isRealTimeConnected ? styles.connected : styles.disconnected
            )}>
              <div className={styles.statusDot}></div>
              <span className={styles.statusText}>
                {isRealTimeConnected ? 'Live Updates Active' : 'Offline Mode'}
              </span>
            </div>
          </div>
        </div>
        
        <div className={styles.blogs__grid}>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
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

export default Blogs;
