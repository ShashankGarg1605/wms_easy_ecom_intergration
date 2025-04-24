const fs = require('fs');
const xml2js = require('xml2js');

const xml = fs.readFileSync('results.xml', 'utf8');

xml2js.parseString(xml, (err, result) => {
  if (err) throw err;

  const testsuite = result.testsuites.testsuite[0]['$'];
  const htmlBody = `
    <h2>Postman Test Summary</h2>
    <p><strong>Collection:</strong> wms_easy_ecom_intergration</p>
    <p><strong>Total Requests:</strong> ${testsuite.tests}</p>
    <p><strong>Tests Passed:</strong> ${testsuite.tests - testsuite.failures}</p>
    <p><strong>Tests Failed:</strong> ${testsuite.failures}</p>
  `;

  fs.writeFileSync(process.env.SUMMARY_OUTPUT_FILE || 'email-body.html', htmlBody);
});
