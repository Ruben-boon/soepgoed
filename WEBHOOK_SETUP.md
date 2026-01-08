# Sanity Webhook Setup Guide

This guide will help you set up on-demand revalidation for your Next.js site when content changes in Sanity.

## 1. Generate a Webhook Secret

First, generate a secure random string for your webhook secret:

```bash
openssl rand -base64 32
```

## 2. Add Environment Variables

Create a `.env.local` file in your project root (this file should not be committed to git):

```env
SANITY_WEBHOOK_SECRET=paste-your-generated-secret-here
```

Also add this to your production environment variables (Vercel, Netlify, etc.).

## 3. Deploy Your Changes

Deploy your updated code to your hosting provider so the webhook endpoint is available.

## 4. Set Up Webhook in Sanity

1. Go to your Sanity project at https://sanity.io/manage
2. Select your project (ID: `9ug7m45i`)
3. Navigate to **API** → **Webhooks**
4. Click **Create webhook**
5. Configure the webhook:
   - **Name**: Next.js Site Revalidation
   - **URL**: `https://your-domain.com/api/webhook/sanity?secret=YOUR_SECRET_HERE`
     - Replace `your-domain.com` with your actual domain
     - Replace `YOUR_SECRET_HERE` with the secret you generated in step 1
   - **Dataset**: production
   - **Trigger on**:
     - ✅ Create
     - ✅ Update
     - ✅ Delete
   - **Filter** (optional): Leave blank to revalidate on all changes, or add GROQ filter
   - **Projection**: Use this to send only the data needed:
     ```groq
     {
       _type,
       "slug": coalesce(urlSlug.current, slug.current, meta.slug.current)
     }
     ```
   - **HTTP method**: POST
   - **API version**: v2021-06-07 (or latest)

6. Click **Save**

## 5. Test the Webhook

1. In Sanity Studio, make a change to any content (e.g., edit a page)
2. Publish the change
3. Go back to your webhook settings in Sanity and check the **Deliveries** tab
4. You should see a successful delivery (green checkmark)
5. Your site should now show the updated content (may take a few seconds)

## How It Works

- **Without changes**: Your pages are cached for 60 seconds (fast performance)
- **After Sanity changes**: The webhook immediately clears the cache for affected pages
- **Result**: Fresh content appears instantly while maintaining fast load times

## Troubleshooting

### Webhook returns 401 Unauthorized
- Check that the secret in the webhook URL matches `SANITY_WEBHOOK_SECRET` in your environment variables
- Ensure the environment variable is deployed to production

### Webhook returns 500 Error
- Check your deployment logs for error messages
- Verify the webhook projection includes `_type` and `slug` fields

### Content still not updating
- Check that your changes are published (not just saved as draft)
- Verify the webhook delivery was successful in Sanity's webhook dashboard
- Check your Next.js deployment logs

### Manual Revalidation (for testing)

You can manually trigger revalidation using the alternative endpoint:

```bash
curl -X POST "https://your-domain.com/api/revalidate?secret=YOUR_REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"slug": "home", "_type": "page"}'
```

(Requires setting `REVALIDATE_SECRET_TOKEN` environment variable)
