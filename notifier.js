
const sgMail = require('@sendgrid/mail');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const ALERT_EMAIL_TO = process.env.ALERT_EMAIL_TO;
const ALERT_EMAIL_FROM = process.env.ALERT_EMAIL_FROM || ALERT_EMAIL_TO;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn('SENDGRID_API_KEY not set. Email notifications will be disabled.');
}

async function sendAlertEmail({ workflow, status, message, severity, suggestion }) {
  if (!SENDGRID_API_KEY || !ALERT_EMAIL_TO) {
    console.log('Email alert (mock):', { workflow, status, message, severity, suggestion });
    return;
  }

  const subject = `[AI angel Workflow ] ${severity || 'info'} in "${workflow}"`;
  const text = `
Workflow: ${workflow}
Status: ${status}
Severity: ${severity || 'not set'}
Message: ${message || 'No message provided'}

Suggested next step:
${suggestion || 'No suggestion available.'}
  `.trim();

  const msg = {
    to: ALERT_EMAIL_TO,
    from: ALERT_EMAIL_FROM,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log('Alert email sent.');
  } catch (err) {
    console.error('Error sending alert email:', err);
  }
}

module.exports = {
  sendAlertEmail,
};
