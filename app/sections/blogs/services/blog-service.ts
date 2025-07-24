import { BlogPost, StrapiResponse, StrapiEntity, BlogPostAttributes } from "../types";
import { generateSlug, generateExcerpt } from "../utils/blog-utils";
import { io, Socket } from "socket.io-client";

class BlogService {
  private baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338';
  private apiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  private subscribers: ((blogs: BlogPost[]) => void)[] = [];
  private pollInterval: NodeJS.Timeout | null = null;
  private lastFetchTime = 0;
  private socket: Socket | null = null;
  private isConnected = false;

  private getHeaders() {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.apiToken) {
      headers['Authorization'] = `Bearer ${this.apiToken}`;
    }

    return headers;
  }

  async getBlogs(): Promise<BlogPost[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/blog-posts?sort=date:desc&populate=*`,
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: StrapiResponse<StrapiEntity<BlogPostAttributes>[]> = await response.json();
      
      return data.data.map(item => ({
        id: item.id,
        documentId: item.documentId,
        title: item.attributes.title,
        content: item.attributes.content,
        author: item.attributes.author,
        date: item.attributes.date,
        slug: generateSlug(item.attributes.title),
        excerpt: generateExcerpt(item.attributes.content),
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        publishedAt: item.attributes.publishedAt,
      }));
    } catch (error) {
      console.error('Error fetching blogs:', error);
      
      // Return mock data if API fails (for development)
      if (process.env.NODE_ENV === 'development') {
        return this.getMockBlogs();
      }
      
      throw error;
    }
  }

  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const blogs = await this.getBlogs();
      return blogs.find(blog => blog.slug === slug) || null;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  }

  subscribeToUpdates(callback: (blogs: BlogPost[]) => void): () => void {
    this.subscribers.push(callback);

    // Start real-time connection if this is the first subscriber
    if (this.subscribers.length === 1) {
      this.connectWebSocket();
      this.startPolling(); // Fallback polling
    }

    // Return unsubscribe function
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }

      // Stop connection if no more subscribers
      if (this.subscribers.length === 0) {
        this.disconnectWebSocket();
        this.stopPolling();
      }
    };
  }

  private startPolling() {
    // Poll every 30 seconds for new content
    this.pollInterval = setInterval(async () => {
      try {
        const blogs = await this.getBlogs();
        const currentTime = Date.now();
        
        // Check if any blog was updated since last fetch
        const hasUpdates = blogs.some(blog => 
          new Date(blog.updatedAt).getTime() > this.lastFetchTime
        );

        if (hasUpdates || this.lastFetchTime === 0) {
          this.lastFetchTime = currentTime;
          this.notifySubscribers(blogs);
        }
      } catch (error) {
        console.error('Error polling for updates:', error);
      }
    }, 30000);
  }

  private stopPolling() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private notifySubscribers(blogs: BlogPost[]) {
    this.subscribers.forEach(callback => callback(blogs));
  }

  private connectWebSocket() {
    if (this.socket || typeof window === 'undefined') return;

    try {
      this.socket = io(this.baseUrl, {
        auth: {
          token: this.apiToken
        },
        transports: ['websocket', 'polling'],
      });

      this.socket.on('connect', () => {
        console.log('Connected to Strapi WebSocket');
        this.isConnected = true;
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from Strapi WebSocket');
        this.isConnected = false;
      });

      // Listen for blog post updates
      this.socket.on('blog-posts:created', this.handleBlogUpdate.bind(this));
      this.socket.on('blog-posts:updated', this.handleBlogUpdate.bind(this));
      this.socket.on('blog-posts:deleted', this.handleBlogUpdate.bind(this));

      this.socket.on('connect_error', (error) => {
        console.warn('WebSocket connection failed, falling back to polling:', error);
      });

    } catch (error) {
      console.warn('Failed to initialize WebSocket, using polling fallback:', error);
    }
  }

  private disconnectWebSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  private async handleBlogUpdate() {
    try {
      const blogs = await this.getBlogs();
      this.notifySubscribers(blogs);
    } catch (error) {
      console.error('Error handling blog update:', error);
    }
  }

  // Mock data for development/demonstration
  private getMockBlogs(): BlogPost[] {
    const mockData = [
      {
        id: 1,
        documentId: "mock-1",
        title: "Revolutionizing Healthcare Claims with AI: The Future is Now",
        content: `# The Dawn of AI-Powered Healthcare

Healthcare claims processing has traditionally been a time-consuming and error-prone process. But with the advent of **artificial intelligence**, we're witnessing a revolutionary transformation.

## Key Benefits of AI in Claims Processing

- **94% accuracy rate** in claim adjudication
- **5-minute processing time** vs traditional 2-3 days
- **70% reduction** in operational costs
- **Real-time fraud detection** capabilities

### Smart Document Processing

Our AI engine can automatically extract and validate information from:

1. Medical reports
2. Insurance forms  
3. Billing statements
4. Laboratory results

> "HealthPay has transformed our claims processing from a 3-day nightmare into a 5-minute breeze. The accuracy is unprecedented." - *Dr. Sarah Kumar, Chief Medical Officer*

The future of healthcare claims is here, and it's powered by intelligent automation.`,
        author: "Dr. Rajesh Sharma",
        date: "2024-01-15",
        createdAt: "2024-01-15T10:00:00.000Z",
        updatedAt: "2024-01-15T10:00:00.000Z",
        publishedAt: "2024-01-15T10:00:00.000Z"
      },
      {
        id: 2,
        documentId: "mock-2",
        title: "Real-time Fraud Detection: Protecting India's Health Insurance Ecosystem",
        content: `# Combating Healthcare Fraud with Advanced AI

Healthcare fraud costs the Indian insurance industry **₹45,000 crores annually**. Our AI-powered fraud detection system is changing the game.

## How Our System Works

### Pattern Recognition
Our machine learning algorithms analyze millions of claims to identify:
- Unusual billing patterns
- Duplicate submissions
- Provider anomalies
- Patient behavior inconsistencies

### Real-time Alerts
The system provides instant notifications when suspicious activities are detected:

\`\`\`
FRAUD ALERT: Unusual claim pattern detected
Provider: ABC Hospital
Pattern: 300% increase in specific procedure codes
Risk Score: 95/100
\`\`\`

## Impact Statistics

| Metric | Before AI | After AI | Improvement |
|--------|-----------|----------|-------------|
| Fraud Detection Rate | 23% | 89% | **+287%** |
| False Positives | 45% | 8% | **-82%** |
| Investigation Time | 15 days | 2 hours | **-99%** |

*Protecting the integrity of India's healthcare system, one claim at a time.*`,
        author: "Priya Mehta",
        date: "2024-01-20",
        createdAt: "2024-01-20T14:30:00.000Z",
        updatedAt: "2024-01-20T14:30:00.000Z",
        publishedAt: "2024-01-20T14:30:00.000Z"
      },
      {
        id: 3,
        documentId: "mock-3",
        title: "The Digital Transformation of Health Insurance: A Complete Guide",
        content: `# Embracing Digital Innovation in Health Insurance

The health insurance landscape in India is undergoing a **massive digital transformation**. Here's what insurers need to know.

## Current Challenges

### Manual Processing Bottlenecks
- Average claim processing time: **15-30 days**
- Manual error rate: **12-15%**
- Customer satisfaction scores: **Below 60%**

### Regulatory Compliance Issues
Meeting IRDAI guidelines while maintaining efficiency has been a constant struggle for traditional systems.

## The HealthPay Solution

### Automated Workflows
Our platform automates the entire claims lifecycle:

1. **Document ingestion** via OCR and NLP
2. **Medical coding** with 99.2% accuracy
3. **Policy verification** in real-time
4. **Automated adjudication** for standard claims
5. **Exception handling** for complex cases

### Compliance by Design
- Built-in IRDAI compliance checks
- Automated audit trails
- Real-time regulatory reporting
- Data privacy safeguards (DPDP Act compliant)

## ROI Calculator

For a mid-size insurer processing 10,000 claims/month:

**Cost Savings:**
- Personnel: ₹2.4 crores/year
- Processing time: 85% reduction
- Error corrections: ₹45 lakhs/year

**Revenue Impact:**
- Faster claim settlement: 25% customer retention improvement
- Fraud prevention: ₹1.8 crores saved annually

### Getting Started

Ready to transform your claims processing? Contact our team for a **free consultation** and see HealthPay in action.`,
        author: "Amit Patel",
        date: "2024-01-25",
        createdAt: "2024-01-25T09:15:00.000Z",
        updatedAt: "2024-01-25T09:15:00.000Z",
        publishedAt: "2024-01-25T09:15:00.000Z"
      }
    ];
    
    // Generate slug and excerpt for each mock blog post
    return mockData.map(blog => ({
      ...blog,
      slug: generateSlug(blog.title),
      excerpt: generateExcerpt(blog.content)
    }));
  }
}

export const blogService = new BlogService();
