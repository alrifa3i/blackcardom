
import { sendEmail } from '../utils/emailService';

export async function POST(request: Request) {
  try {
    const { to, subject, content } = await request.json();
    
    const result = await sendEmail(to, subject, content);
    
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in send-email API:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to send email' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
