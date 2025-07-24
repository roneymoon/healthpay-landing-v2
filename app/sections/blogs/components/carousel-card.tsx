"use client";

import { FC } from "react";
import styles from "./carousel-card.module.css";
import { BlogPost } from "../types";
import Link from "next/link";
import { formatDate } from "../utils/blog-utils";

interface CarouselCardProps {
  blog: BlogPost;
}

const CarouselCard: FC<CarouselCardProps> = ({ blog }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{blog.title}</h3>
      <p className={styles.excerpt}>{blog.excerpt}</p>
      <div className={styles.meta}>
        <span>By {blog.author}</span>
        <span className={styles.dot}>•</span>
        <span>{formatDate(blog.date)}</span>
      </div>
      <Link href={`/blog/${blog.slug}`} className={styles.readMore}>
        Read More
      </Link>
    </div>
  );
};

export default CarouselCard;
