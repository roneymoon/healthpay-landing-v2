// CarouselCard.tsx

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { BlogPost } from '../types';
import styles from './CarouselCard.module.css';

interface CarouselCardProps {
    blog: BlogPost;
}

// Generate excerpt from markdown content (first paragraph)
const generateExcerpt = (content: string, maxLength: number = 150): string => {
    // Remove markdown syntax for clean excerpt
    const plainText = content
        .replace(/#{1,6}\s/g, '') // Remove headers
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links, keep text
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/>\s/g, '') // Remove blockquotes
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .trim();

    // Get the first paragraph or sentence
    const firstParagraph = plainText.split('\n')[0] || plainText;
    
    if (firstParagraph.length <= maxLength) {
        return firstParagraph;
    }

    // Truncate at word boundary
    const truncated = firstParagraph.substring(0, maxLength);
    const lastSpaceIndex = truncated.lastIndexOf(' ');
    
    return lastSpaceIndex > 0 
        ? truncated.substring(0, lastSpaceIndex) + '...'
        : truncated + '...';
};

const CarouselCard: FC<CarouselCardProps> = ({ blog }) => {
    // Add safety checks for blog data
    if (!blog) {
        return (
            <div className={styles.card}>
                <p>Loading blog post...</p>
            </div>
        );
    }

    const excerpt = generateExcerpt(blog.content || '');
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link href={`/blog/${blog.slug}`} className={styles.cardLink}>
            <motion.div 
                className={styles.card}
                whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2, ease: "easeOut" } 
                }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Blog Icon/Image Container */}
                <div className={styles.iconContainer}>
                    <div className={styles.blogIcon}>
                        <motion.div
                            animate={{ 
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1] 
                            }}
                            transition={{ 
                                duration: 3, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        >
                            📰
                        </motion.div>
                    </div>
                </div>

                {/* Content Container */}
                <div className={styles.contentContainer}>
                    <div className={styles.textSection}>
                        {/* Blog Title */}
                        <h3 className={styles.title}>{blog.title}</h3>
                        
                        {/* Blog Excerpt */}
                        <p className={styles.excerpt}>{excerpt}</p>
                        
                        {/* Blog Metadata */}
                        <div className={styles.metadata}>
                            <div className={styles.metaItem}>
                                <User size={14} />
                                <span>{blog.author}</span>
                            </div>
                            <div className={styles.metaItem}>
                                <Calendar size={14} />
                                <span>{formattedDate}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Read More Button */}
                    <div className={styles.actionContainer}>
                        <motion.div 
                            className={styles.readMoreButton}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ArrowUpRight size={18} />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default CarouselCard;
