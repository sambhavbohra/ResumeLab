import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (email, otp) => {
    await resend.emails.send({
        from: 'ResumeLab <noreply@resume-lab.tech>',
        to: email,
        subject: 'ResumeLab - Email Verification OTP',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #c01219; text-align: center;">ResumeLab</h2>
                <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px;">
                    <h3 style="color: #333;">Email Verification</h3>
                    <p style="color: #666;">Your OTP for email verification is:</p>
                    <div style="background-color: #c01219; color: white; font-size: 32px; font-weight: bold; text-align: center; padding: 15px; border-radius: 8px; letter-spacing: 8px;">
                        ${otp}
                    </div>
                    <p style="color: #666; margin-top: 20px;">This OTP will expire in <strong>10 minutes</strong>.</p>
                    <p style="color: #999; font-size: 12px;">If you didn't request this, please ignore this email.</p>
                </div>
            </div>
        `
    });
};
