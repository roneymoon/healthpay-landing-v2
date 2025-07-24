// /pages/blog/[slug].tsx

import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock, Share } from "lucide-react";
import { blogService } from "@/app/sections/blogs/services/blog-service";
import { BlogPost } from "@/app/sections/blogs/types";
import ErrorPage from "next/error";
import LayoutWrapper from "@/components/layout-wrapper";
import styles from "./blog-post.module.css";
import "highlight.js/styles/github-dark.css";
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
});

interface BlogPostPageProps {
  blog: BlogPost | null;
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ blog }) => {
  const router = useRouter();

  if (!router.isFallback && !blog) {
    return <ErrorPage statusCode={404} />;
  }

  const formattedDate = blog ? new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div 
      className={`${styles.pageWrapper} ${bricolage.variable} ${bricolage.className}`}
      style={{
        fontFamily: `${bricolage.style.fontFamily}, 'Bricolage Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
        background: '#000000',
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        maxWidth: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowX: 'hidden',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}
    >
      <LayoutWrapper>
        {router.isFallback ? (
          <motion.div 
            className={styles.loading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.loadingSpinner}>
              <motion.div
                className={styles.spinner}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h2>Loading...</h2>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Navigation Header */}
            <motion.header 
              className={styles.navigation}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Link href="/" className={styles.backLink}>
                <ArrowLeft size={18} />
                <span>Back to Home</span>
              </Link>
            </motion.header>
          
          <motion.article 
            className={styles.article}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Blog Header */}
            <motion.header 
              className={styles.header}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <motion.h1 
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                {blog!.title}
              </motion.h1>
              
              <motion.div 
                className={styles.meta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <div className={styles.metaItem}>
                  <User size={16} />
                  <span className={styles.author}>{blog!.author}</span>
                </div>
                <div className={styles.metaItem}>
                  <Calendar size={16} />
                  <time className={styles.date} dateTime={blog!.date}>
                    {formattedDate}
                  </time>
                </div>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>5 min read</span>
                </div>
              </motion.div>
              
              <motion.div 
                className={styles.shareContainer}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              >
                <button className={styles.shareButton}>
                  <Share size={18} />
                  <span>Share</span>
                </button>
              </motion.div>
            </motion.header>
            
            {/* Blog Content with Enhanced Markdown */}
            <motion.div 
              className={styles.content}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <motion.h1 
                      className={styles.h1}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {children}
                    </motion.h1>
                  ),
                  h2: ({ children }) => (
                    <motion.h2 
                      className={styles.h2}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {children}
                    </motion.h2>
                  ),
                  h3: ({ children }) => (
                    <motion.h3 
                      className={styles.h3}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {children}
                    </motion.h3>
                  ),
                  p: ({ children }) => (
                    <motion.p 
                      className={styles.paragraph}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {children}
                    </motion.p>
                  ),
                  ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
                  ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
                  li: ({ children }) => <li className={styles.listItem}>{children}</li>,
                  blockquote: ({ children }) => (
                    <motion.blockquote 
                      className={styles.quote}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {children}
                    </motion.blockquote>
                  ),
                  code: ({ children, className }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <motion.code 
                        className={`${styles.codeBlock} ${className}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        {children}
                      </motion.code>
                    ) : (
                      <code className={styles.inlineCode}>{children}</code>
                    );
                  },
                  table: ({ children }) => (
                    <motion.table 
                      className={styles.table}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      {children}
                    </motion.table>
                  ),
                  thead: ({ children }) => <thead className={styles.tableHead}>{children}</thead>,
                  tbody: ({ children }) => <tbody className={styles.tableBody}>{children}</tbody>,
                  tr: ({ children }) => <tr className={styles.tableRow}>{children}</tr>,
                  td: ({ children }) => <td className={styles.tableCell}>{children}</td>,
                  th: ({ children }) => <th className={styles.tableHeader}>{children}</th>,
                }}
              >
                {blog!.content}
              </ReactMarkdown>
            </motion.div>
          </motion.article>
          
          {/* Footer Navigation */}
          <motion.footer 
            className={styles.footer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={18} />
              <span>Back to Home</span>
            </Link>
          </motion.footer>
        </>
      )}
      </LayoutWrapper>
    </div>
  );
};

// Server-side logic to fetch the blog post by slug
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params!;
  const blog = await blogService.getBlogBySlug(slug as string);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
    },
  };
};

export default BlogPostPage;

