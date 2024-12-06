import { EmailTemplate } from '../components/EmailTemplate';
import { Resend } from 'resend';
import verificationEmail from './verificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string,verifyCode: string): Promise<any>{
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'verification Email',
      react: verificationEmail({otp:verifyCode }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
