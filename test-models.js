require('dotenv').config({ path: '.env.local' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const models = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + process.env.GEMINI_API_KEY);
    const data = await models.json();
    console.log("Modelos Disponiveis:");
    data.models.forEach(m => console.log(m.name, m.supportedGenerationMethods));
  } catch (error) {
    console.error("Erro:", error);
  }
}

checkModels();
