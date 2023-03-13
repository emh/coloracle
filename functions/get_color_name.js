export async function onRequest(context) {
    const request = context.request;
    const body = await request.json();

    const { value } = body;

    console.log(context.env);

    const response = await (await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'you are an expert designer' },
                { role: 'user', content: '#F08080' },
                { role: 'assistant', content: '{ "name": "light coral" }' },
                { role: 'user', content: '#EEE8AA' },
                { role: 'assistant', content: '{ "name": "pale goldenrod" }' },
                { role: 'user', content: `#${value}` }
            ]
        })
    })).json();

    console.log(response);

    const data = response.choices[0].message.content;

    return new Response(data, {
        headers: {
            "content-type": "application/json"
        }
    });
}



// curl https://api.openai.com/v1/chat/completions \
//   -H 'Content-Type: application/json' \
//   -H 'Authorization: Bearer YOUR_API_KEY' \
//   -d '{
//   "model": "gpt-3.5-turbo",
//   "messages": [{"role": "user", "content": "Hello!"}]
// }'
