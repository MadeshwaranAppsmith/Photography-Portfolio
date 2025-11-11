# Instagram Integration Setup Guide

This guide will help you set up Instagram Basic Display API to automatically fetch photos from your Instagram account and display them in the gallery.

## Overview

Once configured, your portfolio will:
- Automatically fetch up to 20 recent photos from your Instagram account
- Update the gallery every time the page loads
- Fall back to manual photos if Instagram is not connected
- Auto-detect portrait vs landscape orientation

## Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Choose **"Consumer"** as the app type
4. Fill in the app details:
   - **App Name**: "Pixel Stories Portfolio" (or your choice)
   - **App Contact Email**: Your email
5. Click **"Create App"**

## Step 2: Add Instagram Basic Display Product

1. In your app dashboard, scroll down to **"Add Products"**
2. Find **"Instagram Basic Display"** and click **"Set Up"**
3. Scroll down to **"User Token Generator"**
4. Click **"Create New App"** under Instagram App ID

## Step 3: Configure Instagram Basic Display

1. In the Instagram Basic Display settings, find **"Basic Display"** in the left sidebar
2. Add the following **OAuth Redirect URIs**:
   ```
   https://your-vercel-domain.vercel.app/admin/instagram
   http://localhost:5173/admin/instagram
   ```
   (Replace `your-vercel-domain` with your actual Vercel URL)

3. Add **Deauthorize Callback URL**:
   ```
   https://your-vercel-domain.vercel.app/
   ```

4. Add **Data Deletion Request URL**:
   ```
   https://your-vercel-domain.vercel.app/
   ```

5. Click **"Save Changes"**

## Step 4: Add Instagram Tester

1. In Instagram Basic Display settings, scroll to **"Instagram Testers"**
2. Click **"Add Instagram Testers"**
3. Enter your Instagram username
4. Click **"Submit"**

5. **On your phone:**
   - Open Instagram app
   - Go to **Settings** → **Account** → **Apps and Websites**
   - Under **Tester Invites**, accept the invitation

## Step 5: Get App Credentials

1. In your Facebook app dashboard, go to **Settings** → **Basic**
2. Copy your **App ID** and **App Secret**
3. Keep these safe - you'll need them for environment variables

## Step 6: Configure Environment Variables

### For Local Development:

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_INSTAGRAM_APP_ID=your_app_id_here
   VITE_INSTAGRAM_APP_SECRET=your_app_secret_here
   VITE_INSTAGRAM_REDIRECT_URI=http://localhost:5173/admin/instagram
   ```

### For Vercel Production:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:
   - `VITE_INSTAGRAM_APP_ID` = your app ID
   - `VITE_INSTAGRAM_APP_SECRET` = your app secret
   - `VITE_INSTAGRAM_REDIRECT_URI` = `https://your-domain.vercel.app/admin/instagram`
5. Click **"Save"**
6. Redeploy your app for changes to take effect

## Step 7: Authenticate Your Instagram Account

1. Visit your website at: `https://your-domain.vercel.app/admin/instagram`
2. Click **"Connect Instagram"**
3. You'll be redirected to Instagram to authorize the app
4. Click **"Allow"** to grant permissions
5. You'll be redirected back to the admin panel
6. You should see **"✓ Connected to Instagram"**

## Step 8: Test the Integration

1. Go back to your homepage
2. Scroll down to the gallery section
3. You should now see photos from your Instagram account!

## How It Works

### Automatic Photo Fetching

- Every time someone visits your portfolio, the Gallery component checks for an Instagram access token
- If found, it fetches your 20 most recent Instagram photos
- Images are automatically sorted by orientation (portrait/landscape)
- If Instagram fails or is not connected, it falls back to the manual photos in `src/data/photos.js`

### Token Management

- Access tokens last for **60 days**
- The admin panel shows token age and expiration
- Click **"Refresh Token"** before it expires to extend it another 60 days
- Set a calendar reminder to refresh every 50 days

### Manual Fallback

If you want to temporarily use manual photos instead of Instagram:
1. Visit `/admin/instagram`
2. Click **"Disconnect Instagram"**
3. Gallery will use photos from `src/data/photos.js`

## Troubleshooting

### "Failed to fetch Instagram media"

**Solution:** Check that:
- Your Instagram account is added as a tester in the Facebook app
- You accepted the tester invitation in your Instagram app
- Your access token hasn't expired (check in `/admin/instagram`)

### "Invalid OAuth redirect URI"

**Solution:** Make sure the redirect URI in:
- Facebook app settings
- Environment variables (`.env` or Vercel)
- Match exactly (including http:// or https://)

### Photos not loading

**Solution:**
- Open browser console (F12) to check for errors
- Verify environment variables are set correctly in Vercel
- Try disconnecting and reconnecting Instagram
- Make sure your Instagram posts are public photos (not videos or private)

### Token expired

**Solution:**
1. Go to `/admin/instagram`
2. Click **"Refresh Token"** if available
3. If refresh fails, click **"Disconnect"** then **"Connect"** again

## Security Notes

- **Never commit `.env` file to git** (it's in `.gitignore`)
- App Secret should be kept private
- Access tokens are stored in browser localStorage (user's device only)
- Each user who wants to connect must be added as an Instagram Tester

## Updating Photos

Your gallery will automatically show your latest Instagram posts. Just:
1. Post a new photo on Instagram
2. Refresh your portfolio website
3. The new photo will appear in the gallery!

## Support

For issues with:
- **Instagram API**: Check [Instagram Basic Display API Documentation](https://developers.facebook.com/docs/instagram-basic-display-api)
- **Facebook App Settings**: Visit [Facebook Developers Support](https://developers.facebook.com/support)
- **This Integration**: Review the code in `src/services/instagram.js` and `src/components/InstagramAuth.jsx`

---

**Happy shooting! 📸**
