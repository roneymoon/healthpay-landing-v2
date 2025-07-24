// types.ts

export interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    slug: string;
}

// Strapi API response structure
export interface StrapiResponse<T> {
    data: T;
    meta: {
        pagination?: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface BlogPostAttributes {
    title: string;
    content: string;
    author: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface StrapiEntity<T> {
    id: number;
    attributes: T;
}
