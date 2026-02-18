// Utility to convert error responses to user-friendly messages
export const getErrorMessage = (error) => {
    // If we have a server response message, use it
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }

    // Map common HTTP status codes to friendly messages
    const status = error?.response?.status;
    
    const statusMessages = {
        400: "Invalid request. Please check your input and try again.",
        401: "Your session has expired. Please log in again.",
        403: "You don't have permission to perform this action.",
        404: "The requested resource was not found.",
        408: "Request timed out. Please try again.",
        429: "Too many requests. Please wait a moment and try again.",
        500: "Something went wrong on our end. Please try again later.",
        502: "Server is temporarily unavailable. Please try again.",
        503: "Service is currently unavailable. Please try again later.",
        504: "Request timed out. Please check your connection."
    };

    if (status && statusMessages[status]) {
        return statusMessages[status];
    }

    // Network errors
    if (error?.code === 'ERR_NETWORK' || error?.message === 'Network Error') {
        return "Server is currently unavailable. Please try again in a minute.";
    }

    if (error?.code === 'ECONNABORTED') {
        return "Server is taking too long to respond. It may be starting up - please try again.";
    }

    // Default fallback - avoid showing technical messages
    const technicalPatterns = [
        /status code/i,
        /axios/i,
        /request failed/i,
        /\d{3}/,  // numeric codes
        /connection refused/i,
        /timeout/i,
        /cast to string/i,
        /validation failed/i,
        /type.*object/i
    ];

    const errorMessage = error?.message || 'Something went wrong';
    
    for (const pattern of technicalPatterns) {
        if (pattern.test(errorMessage)) {
            return "Something went wrong. Please try again.";
        }
    }

    return errorMessage;
};

export default getErrorMessage;
