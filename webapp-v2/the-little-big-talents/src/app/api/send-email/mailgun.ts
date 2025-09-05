import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export async function sendLessonRequestConfirmation(name: string, email: string): Promise<boolean> {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: 'api',
    key: process.env.NEXT_PUBLIC_MAILGUN_API_KEY!,
    url: 'https://api.eu.mailgun.net',
  });

  try {
    const data = await mg.messages.create('thelittlebigtalents.bg', {
      from: 'Малките Големи Таланти <no-reply@thelittlebigtalents.bg>',
      to: [`${name} <${email}>`],
      bcc: process.env.NEXT_PUBLIC_MAILGUN_BCC!,
      subject: 'Потвърждение за заявка на урок',
      template: 'Lesson Request Confirmation',
      't:variables': {
        name: name,
      },
    });

    console.log('Mailgun response:', data);
    return true;
  } catch (error) {
    console.error('Mailgun error:', error);
    return false;
  }
}
