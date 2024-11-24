// pages/api/forgot-password.js
import nodemailer from "nodemailer"; // Email sending service
import crypto from "crypto"; // To generate the token
import connectToDatabase from "@/lib/mongodb";
import User from "@/lib/models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      await connectToDatabase();

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Generate a reset token using crypto
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

      // Hash the reset token for security
      const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // Log the token for debugging
      console.log("Generated Reset Token:", resetToken);
      console.log("Hashed Reset Token:", hashedToken);

      // Store the reset token and its expiry in the database
      user.resetPasswordToken = hashedToken;
      user.resetPasswordTokenExpiry = resetTokenExpiry;
      await user.save();

      // Setup email transporter (using Nodemailer as an example)
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const resetLink = `${process.env.SITE_URL}/authentication/reset-password/${resetToken}`;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        html: `
                    <html>
                        <head>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;
                                    padding: 20px;
                                }
                                .email-container {
                                    background-color: #ffffff;
                                    padding: 30px;
                                    border-radius: 8px;
                                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                                    max-width: 600px;
                                    margin: 0 auto;
                                }
                                .email-header {
                                    text-align: center;
                                    margin-bottom: 20px;
                                }
                                .email-header h2 {
                                    color: #333;
                                }
                                .email-body {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    color: #333;
                                }
                                .email-body p {
                                    margin-bottom: 15px;
                                }
                                .email-link {
                                    display: inline-block;
                                    background-color: #0f6;
                                    color: #ffffff;
                                    padding: 12px 25px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-weight: bold;
                                }
                                .footer {
                                    margin-top: 20px;
                                    font-size: 14px;
                                    text-align: center;
                                    color: #888;
                                }
                                .footer a {
                                    color: #4CAF50;
                                    text-decoration: none;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="email-container">
                                <div class="email-header">
                                    <h2>Password Reset Request</h2>
                                </div>
                                <div class="email-body">
                                    <p>Dear User,</p>
                                    <p>We have received a request to reset your password. To proceed, please click the button below:</p>
                                    <p><a href="${resetLink}" class="email-link">Reset My Password</a></p>
                                    <p>If you did not request this, please ignore this email. Your account remains secure.</p>
                                </div>
                                <div class="footer">
                                    <p>Best regards,<br>[The Progress School] Team</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `,
      };

      // Send reset link email
      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ message: "Password reset email sent successfully." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
