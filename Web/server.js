const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const session = require('express-session');
const passport = require('passport');

require('./passport');

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'healthcare-db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Promisify
const query = (sql, args) => {
    return new Promise((resolve, reject) => {
        db.query(sql, args, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('You are not authenticated');
    }
    res.send(`Hello ${req.user.displayName}`);
});
// Change password endpoint
app.post('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).send('Missing email, old password, or new password.');
    }

    try {
        console.log(email);
        // Get the user's current password
        const results = await query('SELECT password FROM LoginInformation WHERE email = ?', [email]);
        if (results.length === 0) {
            return res.status(404).send('User not found.');
        }

        const currentPassword = results[0].password;

        // Compare the old password with the current password directly
        if (oldPassword !== currentPassword) {
            return res.status(401).send('Old password is incorrect.');
        }

        // Hash the new password
        

        // Update the password in the database
        await query('UPDATE LoginInformation SET password = ? WHERE email = ?', [newPassword, email]);
        res.send('Password changed successfully.');
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).send('Server error.');
    }
});

app.post('/update-profile', async (req, res) => {
    const { name, id, email, department } = req.body;

    if (!name || !id || !email || !department) {
        return res.status(400).send('Missing required fields.');
    }

    try {
        const result = await query('UPDATE UserProfile SET name = ?, department = ? WHERE id = ? AND email = ?', [name, department, id, email]);
        if (result.affectedRows === 0) {
            return res.status(404).send('User not found or no changes made.');
        }
        res.send('Profile updated successfully.');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Server error.');
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const results = await query('SELECT name, user_id, email, department FROM users');
        res.json(results);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send('Server error.');
    }
});

app.get('/users', (req, res) => {
    db.query('SELECT password FROM LoginInformation', (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Database query error.');
        }
        res.json(results);
    });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
``