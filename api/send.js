import FormData from 'form-data';
 
 export default async function handler(req, res) {
   if (req.method !== 'POST') {
     return res.status(405).json({ error: 'Méthode non autorisée' });
   }
 
   const { chat_id, image } = req.body;
 
   if (!chat_id || !image) {
     return res.status(400).json({ error: 'chat_id ou image manquant' });
   }
 
   const buffer = Buffer.from(image.split(',')[1], 'base64');
 
   const form = new FormData();
   form.append('chat_id', chat_id);
   form.append('photo', buffer, { filename: 'photo.jpg', contentType: 'image/jpeg' });
 
   try {
     const response = await fetch(`https://api.telegram.org/bot${process.env.7663074591:AAHoX9sZMBzD4u--r3aGr3nNdWGHOg8dmLk}/sendPhoto`, {
       method: 'POST',
       body: form,
       headers: form.getHeaders()
     });
 
     const data = await response.json();
     res.status(200).json(data);
   } catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Erreur Telegram' });
   }
 }
