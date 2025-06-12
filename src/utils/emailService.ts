
export const sendEmail = async (to: string, subject: string, content: string) => {
  try {
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
        html: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap;">${content}</pre>`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
