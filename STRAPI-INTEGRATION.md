# Strapi v5 Blog Integration Guide

This document explains how to integrate the HealthPay landing page with Strapi v5 for real-time blog management.

## Features

✅ **Real-time Updates**: WebSocket connection for instant blog updates  
✅ **Markdown Support**: Full markdown rendering with syntax highlighting  
✅ **Responsive Design**: Mobile-optimized blog layout  
✅ **Fallback Mechanism**: Automatic fallback to polling if WebSocket fails  
✅ **Connection Status**: Visual indicator for real-time connection status  
✅ **Error Handling**: Graceful error handling with retry functionality  

## Strapi v5 Setup

### 1. Create BlogPosts Collection Type

In your Strapi v5 admin panel, create a new Collection Type named `BlogPosts` with the following fields:

```json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 255
    },
    "content": {
      "type": "text",
      "required": true
    },
    "author": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "date": {
      "type": "datetime",
      "required": true
    }
  }
}
```

### 2. Configure Permissions

1. Go to **Settings** > **Users & Permissions Plugin** > **Roles** > **Public**
2. Enable the following permissions for `Blog-post`:
   - `find`
   - `findOne`

### 3. Enable WebSocket (Optional)

For real-time updates, install and configure the WebSocket plugin:

```bash
npm install @strapi/plugin-websockets
```

Add to your Strapi configuration:

```javascript
// config/plugins.js
module.exports = {
  websockets: {
    enabled: true,
  },
};
```

## Environment Configuration

### 1. Copy Environment File

```bash
cp .env.example .env.local
```

### 2. Update Configuration

```env
# Required: Your Strapi instance URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Optional: API Token for authenticated requests
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token-here

# Environment
NODE_ENV=development
```

### 3. Create API Token (Recommended)

1. In Strapi admin: **Settings** > **API Tokens** > **Create new API Token**
2. Name: `NextJS Frontend`
3. Token type: `Read-only`
4. Duration: `Unlimited` (or as per your security policy)
5. Copy the generated token to your `.env.local` file

## Sample Blog Content

Here are some sample blog posts you can create in Strapi to test the integration:

### Post 1: AI in Healthcare
```markdown
# Revolutionizing Healthcare Claims with AI

Healthcare claims processing has traditionally been a time-consuming and error-prone process. But with the advent of **artificial intelligence**, we're witnessing a revolutionary transformation.

## Key Benefits

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

```

**Fields:**
- Title: "Revolutionizing Healthcare Claims with AI: The Future is Now"
- Author: "Dr. Rajesh Sharma"
- Date: 2024-01-15
- Content: [Above markdown]

### Post 2: Fraud Detection
```markdown
# Combating Healthcare Fraud with Advanced AI

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

```
FRAUD ALERT: Unusual claim pattern detected
Provider: ABC Hospital
Pattern: 300% increase in specific procedure codes
Risk Score: 95/100
```

## Impact Statistics

| Metric | Before AI | After AI | Improvement |
|--------|-----------|----------|-------------|
| Fraud Detection Rate | 23% | 89% | **+287%** |
| False Positives | 45% | 8% | **-82%** |
| Investigation Time | 15 days | 2 hours | **-99%** |

*Protecting the integrity of India's healthcare system, one claim at a time.*
```

**Fields:**
- Title: "Real-time Fraud Detection: Protecting India's Health Insurance Ecosystem"
- Author: "Priya Mehta"
- Date: 2024-01-20
- Content: [Above markdown]

## Real-time Updates

The system supports two methods for real-time updates:

### 1. WebSocket Connection (Preferred)
- Instant updates when blog posts are created, updated, or deleted
- Automatic reconnection on connection loss
- Visual connection status indicator

### 2. Polling Fallback
- Checks for updates every 30 seconds
- Automatically enabled if WebSocket connection fails
- Compares `updatedAt` timestamps to detect changes

## Markdown Features Supported

- **Headers** (H1-H6) with custom styling
- **Bold** and *italic* text
- Unordered and ordered lists
- `Inline code` and code blocks with syntax highlighting
- > Blockquotes with custom styling
- Tables with responsive design
- Links with hover effects

## Troubleshooting

### WebSocket Connection Issues
1. Check if Strapi WebSocket plugin is installed and enabled
2. Verify CORS configuration in Strapi
3. Check browser console for connection errors
4. The system will automatically fall back to polling

### API Connection Issues
1. Verify `NEXT_PUBLIC_STRAPI_URL` is correct
2. Check if Strapi is running and accessible
3. Verify API permissions are set correctly
4. Check network connectivity

### No Blog Posts Displayed
1. Ensure blog posts are published (not in draft)
2. Check API permissions for the `find` operation
3. Verify the collection type name matches `blog-posts`
4. Check browser console for API errors

## Development vs Production

### Development Mode
- Uses mock data if Strapi connection fails
- More verbose error logging
- Hot reload support for real-time updates

### Production Mode
- Strict error handling
- Optimized polling intervals
- Production-ready WebSocket configuration
- Enhanced security measures

## Performance Optimization

- **Lazy Loading**: Blog cards load progressively
- **Caching**: API responses cached for optimal performance  
- **Debounced Updates**: Real-time updates are debounced to prevent excessive re-renders
- **Connection Management**: Efficient WebSocket connection lifecycle management

## Security Considerations

- API tokens should be read-only
- Use HTTPS in production
- Implement rate limiting on Strapi API
- Validate and sanitize all markdown content
- Use environment variables for sensitive configuration

## Testing Real-time Updates

1. Open the landing page in a browser
2. Check the connection status indicator (should show "Live Updates Active")
3. In Strapi admin, create a new blog post
4. The new post should appear automatically without page refresh
5. Try updating or deleting posts to verify real-time sync

## Support

For issues or questions regarding the Strapi integration:
1. Check the browser console for error messages
2. Verify Strapi server logs
3. Review this documentation for troubleshooting steps
4. Test with the provided sample content
