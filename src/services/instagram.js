/**
 * Instagram Basic Display API Service
 *
 * Setup Instructions:
 * 1. Go to https://developers.facebook.com/
 * 2. Create a new app (type: Consumer)
 * 3. Add Instagram Basic Display product
 * 4. Configure OAuth Redirect URI: https://your-domain.vercel.app/auth/callback
 * 5. Add Instagram Tester (your Instagram account)
 * 6. Accept tester invitation in Instagram app settings
 * 7. Copy App ID and App Secret to .env file
 */

const INSTAGRAM_API_BASE = 'https://graph.instagram.com'

/**
 * Generate Instagram authorization URL
 * User clicks this to authorize the app
 */
export const getInstagramAuthUrl = () => {
  const appId = import.meta.env.VITE_INSTAGRAM_APP_ID
  const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI
  const scope = 'user_profile,user_media'

  return `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
}

/**
 * Exchange authorization code for access token
 * This happens after user authorizes the app
 */
export const getAccessToken = async (code) => {
  const appId = import.meta.env.VITE_INSTAGRAM_APP_ID
  const appSecret = import.meta.env.VITE_INSTAGRAM_APP_SECRET
  const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI

  const formData = new FormData()
  formData.append('client_id', appId)
  formData.append('client_secret', appSecret)
  formData.append('grant_type', 'authorization_code')
  formData.append('redirect_uri', redirectUri)
  formData.append('code', code)

  const response = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()
  return data.access_token
}

/**
 * Exchange short-lived token for long-lived token (60 days)
 */
export const getLongLivedToken = async (shortLivedToken) => {
  const appSecret = import.meta.env.VITE_INSTAGRAM_APP_SECRET

  const response = await fetch(
    `${INSTAGRAM_API_BASE}/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${shortLivedToken}`
  )

  const data = await response.json()
  return data.access_token
}

/**
 * Fetch user's media (photos/videos)
 */
export const getInstagramMedia = async (accessToken, limit = 20) => {
  try {
    const fields = 'id,caption,media_type,media_url,permalink,timestamp'
    const response = await fetch(
      `${INSTAGRAM_API_BASE}/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Instagram media')
    }

    const data = await response.json()

    // Filter only images (exclude videos and carousels for now)
    const photos = data.data
      .filter(item => item.media_type === 'IMAGE')
      .map((item, index) => ({
        id: item.id,
        src: item.media_url,
        alt: item.caption ? item.caption.substring(0, 100) : `Instagram photo ${index + 1}`,
        permalink: item.permalink,
        timestamp: item.timestamp,
        // Auto-detect orientation based on image dimensions (we'll load the image to check)
        orientation: 'landscape', // Default, will be updated when image loads
      }))

    return photos
  } catch (error) {
    console.error('Error fetching Instagram media:', error)
    throw error
  }
}

/**
 * Refresh long-lived token (should be done before it expires)
 */
export const refreshAccessToken = async (accessToken) => {
  const response = await fetch(
    `${INSTAGRAM_API_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
  )

  const data = await response.json()
  return data.access_token
}

/**
 * Store access token in localStorage
 */
export const saveAccessToken = (token) => {
  localStorage.setItem('instagram_access_token', token)
  localStorage.setItem('instagram_token_timestamp', Date.now().toString())
}

/**
 * Get access token from localStorage
 */
export const getStoredAccessToken = () => {
  return localStorage.getItem('instagram_access_token')
}

/**
 * Check if token needs refresh (refresh after 50 days to be safe)
 */
export const needsTokenRefresh = () => {
  const timestamp = localStorage.getItem('instagram_token_timestamp')
  if (!timestamp) return true

  const daysSinceAuth = (Date.now() - parseInt(timestamp)) / (1000 * 60 * 60 * 24)
  return daysSinceAuth > 50
}

/**
 * Clear stored token
 */
export const clearAccessToken = () => {
  localStorage.removeItem('instagram_access_token')
  localStorage.removeItem('instagram_token_timestamp')
}
