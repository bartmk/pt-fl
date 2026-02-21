const axios = require('axios');
const { Resend } = require('resend');

async function main() {
  try {
    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO;
    const emailFrom = process.env.EMAIL_FROM;

    const response = await axios.get(apiUrl, {
      headers: {
        'Api-Key': apiKey
      }
    });
    const { free_leech } = response?.data?.details || {};

    if (!free_leech) {
      console.info('No free leech');
      return;
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
        from: emailFrom,
        to: emailTo,
        subject: 'Free leech available',
        html: `<p>Free leech available</p>`
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

main();
