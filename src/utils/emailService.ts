
export const sendEmail = async (to: string, subject: string, content: string) => {
  try {
    console.log('Attempting to send email to:', to);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_Av8t2UWA_8A87YrNyzyqQ8hLoHXnxfaim',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The Black Card <noreply@theblack-card.com>',
        to: [to],
        subject: subject,
        html: `<div style="font-family: Arial, sans-serif; direction: rtl; text-align: right;">
          <h2 style="color: #f59e0b;">The Black Card</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <pre style="white-space: pre-wrap; font-family: inherit;">${content}</pre>
          </div>
          <p style="color: #666; font-size: 12px;">
            تم الإرسال من موقع The Black Card<br>
            ${new Date().toLocaleString('ar-EG')}
          </p>
        </div>`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', response.status, errorData);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
