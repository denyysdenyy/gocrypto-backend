import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();
const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email } = req.body;
  console.log("Пришел запрос с фронта:", { name, email }); // <--- тут
  if (!email) return res.status(400).json({ error: "Email is required" });
  try {
    const data = await resend.emails.send({
      from: "GoCrypto <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to GoCrypto!",
      html: `<p>Hey ${name}. <br/> Thanks for subscribe!</p>`,
    });
     console.log("Письмо отправлено:", data); // <--- и тут
    res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
