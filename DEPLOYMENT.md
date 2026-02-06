# Vercel Deployment Checklist

## Pre-Deployment

✅ **Build Test**: `npm run build` completes successfully  
✅ **Configuration**: `vercel.json` configured  
✅ **Environment Variables**: Optional `NEXT_PUBLIC_SITE_URL` for custom domain  
✅ **Static Assets**: Images in `/public/images/` are accessible  

## Deployment Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New Project**
   - Import your Git repository
   - Vercel will auto-detect Next.js framework
   - Review settings:
     - **Framework Preset**: Next.js (auto-detected)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)
     - **Install Command**: `npm install` (default)

3. **Environment Variables (Optional)**
   - If using a custom domain, add:
     - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
   - Vercel automatically provides `VERCEL_URL` in production

4. **Deploy**
   - Click **Deploy**
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

## Post-Deployment

- ✅ Verify site loads correctly
- ✅ Check images load (`/images/profile.png`, etc.)
- ✅ Test navigation and routing
- ✅ Verify dark mode toggle works
- ✅ Check mobile responsiveness
- ✅ Test dynamic routes (`/work/[slug]`)

## Custom Domain Setup

1. In Vercel dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` environment variable if needed

## Troubleshooting

- **Build fails**: Check build logs in Vercel dashboard
- **Images not loading**: Verify `/public/images/` files are committed to Git
- **Environment variables**: Ensure they're set in Vercel dashboard → Settings → Environment Variables
- **404 errors**: Check Next.js routing and ensure all pages are properly exported

## Notes

- Vercel automatically handles:
  - Next.js optimization
  - Image optimization
  - Edge functions
  - Analytics (if enabled)
- The project uses Next.js 16.1.6 with App Router
- Static pages are pre-rendered at build time
- Dynamic routes (`/work/[slug]`) are server-rendered on demand
