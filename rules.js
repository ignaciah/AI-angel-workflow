
const { sendAlertEmail } = require('./notifier');
const { generateSummaryAndSuggestion } = require('./aiSummaries');

function classifySeverity(event) {
  if (event.status === 'error') return 'high';
  if (event.status === 'warning') return 'medium';
  return 'low';
}

async function processEvent(event) {
  const severity = classifySeverity(event);
  event.severity = severity;

  // For now: if it's an error or warning, send an alert
  if (severity === 'high' || severity === 'medium') {
    const aiHelp = await generateSummaryAndSuggestion(event);

    await sendAlertEmail({
      workflow: event.workflow,
      status: event.status,
      message: event.message,
      severity,
      suggestion: aiHelp?.suggestion,
    });
  }

  console.log('Processed event:', event);
}

module.exports = {
  processEvent,
};
