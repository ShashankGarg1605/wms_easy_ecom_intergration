const fs = require('fs');
const path = require('path');

// Read the results.xml file
const xmlData = fs.readFileSync('results.xml', 'utf8');

// Extract basic statistics using regex
const getAttribute = (xml, attr) => {
  const match = xml.match(new RegExp(`testsuite.*?${attr}="(\\d+)"`));
  return match ? match[1] : '0';
};

const totalTests = getAttribute(xmlData, 'tests');
const failedTests = getAttribute(xmlData, 'failures');
const passedTests = parseInt(totalTests) - parseInt(failedTests);

// Generate HTML email body
const htmlBody = `
<html>
<body>
  <h2>Postman Test Summary</h2>
  <p><strong>Collection:</strong> wms_easy_ecom_intergration</p>
  <p><strong>Environment:</strong> wms_staging</p>
  <p><strong>Total Requests:</strong> ${totalTests}</p>
  <p><strong>Tests Passed:</strong> ${passedTests}</p>
  <p><strong>Tests Failed:</strong> ${failedTests}</p>
  <p><strong>Run Date:</strong> ${new Date().toLocaleString()}</p>
</body>
</html>
`;

// Write to output file
fs.writeFileSync(process.env.SUMMARY_OUTPUT_FILE || 'email-body.html', htmlBody);