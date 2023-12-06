// pages/api/register.js
import openDatabase from '../../../db';
import bcrypt from 'bcrypt';


export async function POST(req, res){
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);


    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);

    // // Hash the password before storing it in the database
    // const hashedPassword = await bcrypt.hashSync(password, salt);
    const userId = 123;

    const db = await openDatabase();
    
    // await db.run('INSERT INTO users (username, email, password, userId) VALUES (?, ?, ?, ?)', username, email, hashedPassword, userId);

    

    // Set a cookie with user_tracking and an empty array for page_visits
    res.setHeader('Set-Cookie', [
      `user_tracking=${userId}`,
      'page_visits=[]',
    ]);

    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

