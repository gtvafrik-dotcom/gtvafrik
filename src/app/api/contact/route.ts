import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, organization, subject, message } = data;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const { data: resendData, error } = await resend.emails.send({
      from: 'GTV Afrik Contact <onboarding@resend.dev>',
      to: ['gtvafrik@gmail.com'], // Temporarily using the verified onboarding email for testing
      subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
      html: `
        <h2>New Message from GTV Afrik Website</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Organization:</strong> ${organization || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: resendData });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'An error occurred while sending the message.' }, { status: 500 });
  }
}
