document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault(); 
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Skapa ett objekt med användarinformation
        const user = {
            firstName,
            lastName,
            email,
            password
        };

        try {
            // Skicka användardata till servern //
           

            if (!response.ok) {
                throw new Error('Failed to register user.');
            }

            
            alert('Registration successful!');

            
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

       
        const newUser = {
            firstName,
            lastName,
            email,
            password
        };

        try {
            // Skicka användardata till servern //
            const response = await fetch('http://localhost:3000/userList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: newUser,
                  
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to register user.');
            }

            
            const userList = JSON.parse(localStorage.getItem('userList')) || [];

            // Lägg till den nya användaren i användarlistan//
            userList.push(newUser);

            // Spara användarlistan i localStorage//
            localStorage.setItem('userList', JSON.stringify(userList));

           
            alert('Registration successful!');

            
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error:', error);
        }
    });
});


