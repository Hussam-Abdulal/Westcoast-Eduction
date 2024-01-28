// login.js

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Hämta användarlistan från localStorage //
        const userList = JSON.parse(localStorage.getItem('userList')) || [];

        // Kolla användarnamn och lösenord i användarlistan//
        const user = userList.find(user => user.email === username && user.password === password);

        if (user) {
            alert('Inloggning lyckades!');
           
            window.location.href = 'index.html';
        } else {
            alert('Fel användarnamn eller lösenord. Försök igen.');
        }
    });
});

// login.js

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        
    });

    
});



// Login-funktion
async function login(email, password) {
    try {
        // Skicka användardata till servern med Fetch API
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to log in.');
        }

        const data = await response.json();

        if (data.success) {
            alert('Login successful!');
            
            console.log(data.user);
            
            
        } else {
            alert('Invalid email or password.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}



localStorage.setItem('userList', JSON.stringify(userList));


