const fs = require('fs');

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
const timestamp = new Date().toLocaleString();

// Generate plain text email body
const textBody = `
POSTMAN TEST REPORT
===================

Collection: wms_easy_ecom_integration
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