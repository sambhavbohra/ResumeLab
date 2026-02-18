import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000 // 60 second timeout for cold starts
})

// Server warm-up: Ping server every 10 minutes to keep it awake
const WARM_UP_INTERVAL = 10 * 60 * 1000 // 10 minutes in milliseconds

const warmUpServer = async () => {
    try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/health`, { timeout: 10000 })
    } catch (error) {
        // Silent fail - just trying to keep server warm
    }
}

// Initial warm-up on app load
warmUpServer()

// Schedule periodic warm-ups
setInterval(warmUpServer, WARM_UP_INTERVAL)

// Response interceptor - handle errors with retry
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // If it's a network error or timeout, retry once
        if (
            (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            // Wait 3 seconds before retry
            await new Promise(resolve => setTimeout(resolve, 3000))
            
            return api(originalRequest)
        }

        return Promise.reject(error)
    }
)

export default api
