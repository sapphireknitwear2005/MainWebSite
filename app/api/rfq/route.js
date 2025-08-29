import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import formidable from "formidable";
import fs from "fs";

// disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const form = formidable({ multiples: true });
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { category, quantity, price, fabric, details, contact } = data.fields;

    // Gmail transporter setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare file attachments
    let attachments = [];
    if (data.files.files) {
      const filesArray = Array.isArray(data.files.files)
        ? data.files.files
        : [data.files.files];

      attachments = filesArray.map((file) => ({
        filename: file.originalFilename,
        path: file.filepath,
      }));
    }

    // Send email
    await transporter.sendMail({
      from: `"RFQ Bot - Sapphire Design" <${process.env.SMTP_USER}>`,
      to: "sapphireknitwear2005@gmail.com",
      subject: "📩 New RFQ Submission",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#2563eb;">🧾 New RFQ Received</h2>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Target Price:</strong> ${price}</p>
          <p><strong>Fabric:</strong> ${fabric}</p>
          <p><strong>Details:</strong> ${details}</p>
          <p><strong>Buyer Email:</strong> ${contact}</p>
          <hr/>
          <p style="font-size: 12px; color: #666;">This RFQ was submitted via Sapphire Design LTD Website</p>
        </div>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("RFQ error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
