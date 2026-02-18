import axios from 'axios'
import toast from 'react-hot-toast'

// Track if we're currently waking up the server
let isServerWakingUp = false
let wakeUpToastId = null

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000 // 60 second timeout for cold starts
})

// Request interceptor - show waking up message on slow requests
api.interceptors.request.use((config) => {
    // Set a timer to show "server waking up" after 5 seconds
    config.wakeUpTimer = setTimeout(() => {
        if (!isServerWakingUp) {
            isServerWakingUp = true
            wakeUpToastId = toast.loading('Server is waking up... This may take a moment.', {
                duration: Infinity
            })
        }
    }, 5000)
    
    return config
})

// Response interceptor - clear the waking up state
api.interceptors.response.use(
    (response) => {
        // Clear the timer and dismiss toast
        if (response.config.wakeUpTimer) {
            clearTimeout(response.config.wakeUpTimer)
        }
        if (wakeUpToastId) {
            toast.dismiss(wakeUpToastId)
            wakeUpToastId = null
            isServerWakingUp = false
        }
        return response
    },
    async (error) => {
        const originalRequest = error.config
        
        // Clear the timer
        if (originalRequest?.wakeUpTimer) {
            clearTimeout(originalRequest.wakeUpTimer)
        }

        // If it's a network error or timeout, retry once
        if (
            (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true
            
            // Show waking up message if not already shown
            if (!isServerWakingUp) {
                isServerWakingUp = true
                wakeUpToastId = toast.loading('Server is waking up... Please wait.', {
                    duration: Infinity
                })
            }

            // Wait 3 seconds before retry
            await new Promise(resolve => setTimeout(resolve, 3000))
            
            return api(originalRequest)
        }

        // Dismiss wake up toast on final failure
        if (wakeUpToastId) {
            toast.dismiss(wakeUpToastId)
            wakeUpToastId = null
            isServerWakingUp = false
        }

        return Promise.reject(error)
    }
)

export default api
