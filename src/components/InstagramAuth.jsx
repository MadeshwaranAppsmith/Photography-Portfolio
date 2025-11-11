import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  getInstagramAuthUrl,
  getAccessToken,
  getLongLivedToken,
  saveAccessToken,
  getStoredAccessToken,
  clearAccessToken,
  needsTokenRefresh,
  refreshAccessToken,
} from '../services/instagram'

/**
 * Instagram Authentication Admin Panel
 * Hidden component - access via URL: /admin/instagram
 */
const InstagramAuth = ({ onAuthComplete }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [tokenInfo, setTokenInfo] = useState(null)

  useEffect(() => {
    // Check if already authenticated
    const token = getStoredAccessToken()
    if (token) {
      setIsAuthenticated(true)
      checkTokenStatus()
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    if (code) {
      handleAuthCallback(code)
    }
  }, [])

  const checkTokenStatus = () => {
    const token = getStoredAccessToken()
    const timestamp = localStorage.getItem('instagram_token_timestamp')
    if (timestamp) {
      const daysOld = Math.floor((Date.now() - parseInt(timestamp)) / (1000 * 60 * 60 * 24))
      setTokenInfo({
        daysOld,
        needsRefresh: needsTokenRefresh(),
      })
    }
  }

  const handleAuthCallback = async (code) => {
    setIsLoading(true)
    setError(null)

    try {
      // Exchange code for short-lived token
      const shortToken = await getAccessToken(code)

      // Exchange for long-lived token (60 days)
      const longToken = await getLongLivedToken(shortToken)

      // Save token
      saveAccessToken(longToken)
      setIsAuthenticated(true)
      checkTokenStatus()

      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)

      // Notify parent component
      if (onAuthComplete) {
        onAuthComplete(longToken)
      }
    } catch (err) {
      setError('Failed to authenticate with Instagram. Please try again.')
      console.error('Auth error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnect = () => {
    const authUrl = getInstagramAuthUrl()
    window.location.href = authUrl
  }

  const handleDisconnect = () => {
    clearAccessToken()
    setIsAuthenticated(false)
    setTokenInfo(null)
  }

  const handleRefreshToken = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const currentToken = getStoredAccessToken()
      const newToken = await refreshAccessToken(currentToken)
      saveAccessToken(newToken)
      checkTokenStatus()
      alert('Token refreshed successfully!')
    } catch (err) {
      setError('Failed to refresh token. Please reconnect.')
      console.error('Refresh error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-light mb-6 text-center">Instagram Integration</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">Processing...</p>
            </div>
          ) : isAuthenticated ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium mb-2">✓ Connected to Instagram</p>
                {tokenInfo && (
                  <div className="text-sm text-green-700">
                    <p>Token age: {tokenInfo.daysOld} days</p>
                    <p>Expires in: {60 - tokenInfo.daysOld} days</p>
                  </div>
                )}
              </div>

              {tokenInfo?.needsRefresh && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    Your token will expire soon. Click "Refresh Token" to extend it.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <button
                  onClick={handleRefreshToken}
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Refresh Token
                </button>
                <button
                  onClick={handleDisconnect}
                  className="w-full py-3 px-4 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors"
                >
                  Disconnect Instagram
                </button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 text-center">
                  Your gallery will now automatically display photos from your Instagram account.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600 text-center mb-6">
                Connect your Instagram account to automatically display your photos in the gallery.
              </p>
              <button
                onClick={handleConnect}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Connect Instagram
              </button>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium mb-2">Setup Required:</p>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Create Facebook Developer app</li>
                  <li>Add Instagram Basic Display</li>
                  <li>Configure environment variables</li>
                  <li>Add yourself as Instagram Tester</li>
                </ol>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default InstagramAuth
