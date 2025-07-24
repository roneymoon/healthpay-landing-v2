"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CarouselCard from './components/CarouselCard';
import { BlogPost } from './types';
import styles from './styles.module.css';

// Generate slug from title
const generateSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
};

// Mock blog data for development
const getMockBlogs = (): BlogPost[] => {
    return [
        {
            id: 1,
            title: "Revolutionizing Healthcare Claims with AI: The Future is Now",
            content: `# The Dawn of AI-Powered Healthcare\n\nHealthcare claims processing has traditionally been a time-consuming and error-prone process. But with the advent of **artificial intelligence**, we're witnessing a revolutionary transformation.\n\n## Key Benefits of AI in Claims Processing\n\n- **94% accuracy rate** in claim adjudication\n- **5-minute processing time** vs traditional 2-3 days\n- **70% reduction** in operational costs\n- **Real-time fraud detection** capabilities`,
            author: "Dr. Rajesh Sharma",
            date: "2024-01-15",
            slug: generateSlug("Revolutionizing Healthcare Claims with AI: The Future is Now")
        },
        {
            id: 2,
            title: "Real-time Fraud Detection: Protecting India's Health Insurance Ecosystem",
            content: `# Combating Healthcare Fraud with Advanced AI\n\nHealthcare fraud costs the Indian insurance industry **₹45,000 crores annually**. Our AI-powered fraud detection system is changing the game.\n\n## How Our System Works\n\n### Pattern Recognition\nOur machine learning algorithms analyze millions of claims to identify unusual billing patterns, duplicate submissions, and provider anomalies.`,
            author: "Priya Mehta",
            date: "2024-01-20",
            slug: generateSlug("Real-time Fraud Detection: Protecting India's Health Insurance Ecosystem")
        },
        {
            id: 3,
            title: "The Digital Transformation of Health Insurance: A Complete Guide",
            content: `# Embracing Digital Innovation in Health Insurance\n\nThe health insurance landscape in India is undergoing a **massive digital transformation**. Here's what insurers need to know.\n\n## Current Challenges\n\n### Manual Processing Bottlenecks\n- Average claim processing time: **15-30 days**\n- Manual error rate: **12-15%**\n- Customer satisfaction scores: **Below 60%**`,
            author: "Amit Patel",
            date: "2024-01-25",
            slug: generateSlug("The Digital Transformation of Health Insurance: A Complete Guide")
        }
    ];
};

// Fetch all blog posts from Strapi
const fetchBlogs = async (): Promise<BlogPost[]> => {
    try {
        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        const res = await fetch(`${strapiUrl}/api/blog-posts?sort=date:desc`);
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        const data = await res.json();
        return data.data.map((post: any) => ({
            id: post.id,
            title: post.attributes.title,
            content: post.attributes.content,
            author: post.attributes.author,
            date: post.attributes.date,
            slug: generateSlug(post.attributes.title)
        }));
    } catch (error) {
        console.warn('Failed to fetch from Strapi, using mock data:', error);
        return getMockBlogs();
    }
};

const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const blogPosts = await fetchBlogs();
                setBlogs(blogPosts);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    if (loading) {
        return (
            <section className={styles.carouselSection}>
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </section>
        );
    }
    
    if (error) {
        return (
            <section className={styles.carouselSection}>
                <div className="text-center py-12">
                    <p className="text-red-500 mb-4">Error: {error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.blogsSection}>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={styles.blogsContainer}
            >
                <div className={styles.blogsGrid}>
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1, 
                                ease: "easeOut" 
                            }}
                        >
                            <CarouselCard blog={blog} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Blogs;

