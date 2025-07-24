"use client";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import { BlogPost } from "../types";
import styles from "./blog-card.module.css";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "../styles/highlight.css";

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{blog.title}</h2>
      <div className={styles.meta}>
        <span>By {blog.author}</span>
        <span className={styles.dot}>•</span>
        <span>{new Date(blog.date).toLocaleDateString()}</span>
      </div>
      <div className={styles.content}>
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
            h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
            h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
            p: ({ children }) => <p className={styles.paragraph}>{children}</p>,
            ul: ({ children }) => <ul className={styles.list}>{children}</ul>,
            ol: ({ children }) => <ol className={styles.orderedList}>{children}</ol>,
            li: ({ children }) => <li className={styles.listItem}>{children}</li>,
            blockquote: ({ children }) => <blockquote className={styles.quote}>{children}</blockquote>,
            code: ({ children, className }) => {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <code className={`${styles.codeBlock} ${className}`}>{children}</code>
              ) : (
                <code className={styles.inlineCode}>{children}</code>
              );
            },
            table: ({ children }) => <table className={styles.table}>{children}</table>,
            thead: ({ children }) => <thead className={styles.tableHead}>{children}</thead>,
            tbody: ({ children }) => <tbody className={styles.tableBody}>{children}</tbody>,
            tr: ({ children }) => <tr className={styles.tableRow}>{children}</tr>,
            td: ({ children }) => <td className={styles.tableCell}>{children}</td>,
            th: ({ children }) => <th className={styles.tableHeader}>{children}</th>,
          }}
        >{blog.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogCard;
