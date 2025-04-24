const fs = require('fs');

// Function to get current IST time
const getISTTime = () => {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }) + ' IST';
};

// Read the results.xml file
const xmlData = fs.readFileSync('results.xml', 'utf8');

// Extract statistics using regex
const getAttribute = (xml, attr) => {
  const match = xml.match(new RegExp(`testsuite.*?${attr}="(\\d+)"`));
  return match ? match[1] : '0';
};

const totalTests = getAttribute(xmlData, 'tests');
const failedTests = getAttribute(xmlData, 'failures');
const passedTests = parseInt(totalTests) - parseInt(failedTests);
const timestamp = getISTTime();

// Generate plain text email body
const textBody = `
POSTMAN TEST REPORT
===================

Collection: wms_easy_ecom_intergration
Environment: wms_staging
Run Date: ${timestamp}

Test Summary:
- Total Requests: ${totalTests}
- Tests Passed: ${passedTests}
- Tests Failed: ${failedTests}

View detailed HTML report in attachments.
`;

// Write to output file
fs.writeFileSync(process.env.SUMMARY_OUTPUT_FILE || 'email-body.txt', textBody);