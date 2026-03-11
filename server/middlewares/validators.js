import { z } from "zod";

export const sendOtpSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
    }),
});

export const verifyOtpSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        otp: z.string().length(6, "OTP must be 6 digits"),
    }),
});

export const registerUserSchema = z.object({
    body: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
    }),
    headers: z.object({
        // We will extract the exact header name later, ensuring it's present
        authorization: z.string().optional(),
        'x-registration-token': z.string({
            required_error: "Registration token is required"
        })
    }).passthrough(),
});

export const loginUserSchema = z.object({
    body: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(1, "Password is required"),
    }),
});

// Resume schemas
export const createResumeSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Title is required")
    })
})
