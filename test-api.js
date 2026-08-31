const fetch = require('node-fetch');

async function testApi() {
  try {
    const res = await fetch('http://localhost:3000/api/parse-food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: '2 pao de forma' })
    });
    const text = await res.text();
    console.log('STATUS:', res.status);
    console.log('RESPONSE:', text);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

testApi();
