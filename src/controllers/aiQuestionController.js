const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateQuestions = async (topic, difficulty, count) => {
    const prompt = `Generate ${count} multiple choice questions about ${topic} at ${difficulty} difficulty level. Format as JSON array with structure: 
    {question, options: [], correctAnswer}`;

    console.log('dosloo ovde')

    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
    });

    return JSON.parse(completion.choices[0].message.content);
};

module.exports = { generateQuestions };
