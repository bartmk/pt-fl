const axios = require('axios');
const { Resend } = require('resend');

async function main() {
  try {
    const apiUrl = process.env.API_URL || 'https://api-test.pte.nu/api/v2/my_profile';
    const apiKey = process.env.API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev';

    if (!apiKey) throw new Error('API_KEY nie jest ustawiony');
    if (!resendApiKey) throw new Error('RESEND_API_KEY nie jest ustawiony');
    if (!emailTo) throw new Error('EMAIL_TO nie jest ustawiony');

    const response = await axios.get(apiUrl, {
      headers: {
        'Api-Key': apiKey
      }
    });
    const { free_leech } = response?.data?.details || {};

    console.log('Odpowiedź z API:', response?.data?.details);
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        subject: 'Free leech available',
        html: `<p>Free leech działa</p>`
    });

    console.log('Mail wysłany przez Resend');
  } catch (error) {
    console.error('Błąd:', error);
  }
}

main();