import nodemailer from "nodemailer";

export async function POST(req) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: data.email,
    to: "sapphireknitwear2005@gmail.com",
    subject: `New RFQ from ${data.buyerName}`,
    text: `
New RFQ Request:

👤 Buyer: ${data.buyerName}
🏢 Company: ${data.company}
📧 Email: ${data.email}
👕 Style: ${data.style}
🧵 Fabric: ${data.fabric}
🔗 Trims: ${data.trims}
📦 Quantity: ${data.quantity}
💲 Target Price: ${data.targetPrice}
🚢 Incoterm: ${data.incoterm}
⏰ Deadline: ${data.deadline}

📝 Notes:
${data.notes}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Email Error:", err);
    return new Response(JSON.stringify({ error: "Email failed" }), {
      status: 500,
    });
  }
}
