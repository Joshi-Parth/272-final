// pages/api/login.js
import openDatabase from '../../../db';
import bcrypt from 'bcrypt';

export async function POST(req, res){
  // return new Response('Hello, Next.js!')
  if (req.method === 'POST') {
    const { username, password } = req.body;

    const db = await openDatabase();
    const user = await db.get('SELECT * FROM users WHERE username = ?', username);

    if (user) {
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Add your logic to generate a unique user_tracking value
        const userId = user.id || uuidv4();

        // Set a cookie with user_tracking and an empty array for page_visits
        res.setHeader('Set-Cookie', [
          `user_tracking=${userId}`,
          'page_visits=[]',
        ]);

        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
