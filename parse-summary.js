const fs = require('fs');

const result = JSON.parse(fs.readFileSync('results.json', 'utf-8'));

let summary = `
  <h2>Postman Test Summary</h2>
  <p><strong>Collection:</strong> ${result.collection.info.name}</p>
  <p><strong>Total Requests:</strong> ${result.run.stats.requests.total}</p>
  <p><strong>Tests Passed:</strong> ${result.run.stats.tests.total - result.run.stats.tests.failed}</p>
  <p><strong>Tests Failed:</strong> ${result.run.stats.tests.failed}</p>
`;

fs.writeFileSync('email-body.html', summary);