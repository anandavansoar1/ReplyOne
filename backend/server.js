const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Temp Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin' && password === '1234') {
    return res.json({
      success: true,
      message: 'Login successful',
      token: 'fake-jwt-token-admin-1234',
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password'
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
