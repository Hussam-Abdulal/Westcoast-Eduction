//------------------- Course List-------------------------------
const courseList= document.querySelector('#courses');
const inputName= document.querySelector('#name');
const form= document.querySelector('#demoForm');
 
function initPage() {
    listCourses();
}
async function listCourses() {
    const courses= await fetchCourses();
    courses.forEach((course) => {
        console.log(course);
        courseList.innerHTML += `<div>
        <span>${course.number}</span>
        <span>${course.title}</span>
        <span>${course.duration}</span>
        <span>${course.duration}</span>
        

        </div>`;
    });
   
}
 
let x;
 
async function fetchCourses(){
    let x;
    try{
        const response= await fetch('http://localhost:3000/courses');
 
        if (response.ok) {
            const result= await response.json();
            return result;
           
           
        }else{
            console.log(response.status);
        }
    } catch(error){
       
        console.log(error);
    }
}
 
function saveHandler(e){
    let x;
    e.preventDefault();
console.log('Save');
const name= inputName.value;
console.log(name);
 
inputName.value='Nisse';
 
const student= {
    name: inputName.value
}
 
console.log(student);
}
 
document.addEventListener('DOMContentLoaded', initPage);
form.addEventListener('submit', saveHandler);






//-----------------------Register form--------------------------
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = {
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
                    user,
                    
                   
                }),
            });

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
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function () {
        
        window.location.href = 'login.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const adminButton = document.getElementById('adminButton');

    adminButton.addEventListener('click', function () {
       
        window.location.href = 'admin-login.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const hemButton = document.getElementById('hemButton');

    hemButton.addEventListener('click', function () {
        
        window.location.href = 'westcoast.html';
    });
});




const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint för att hämta kurser //
app.get('/courses', async (req, res) => {
    try {
        const coursesData = await fs.readFile('courses.json', 'utf8');
        const courses = JSON.parse(coursesData);
        res.json(courses);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});








// Endpoint för att logga in användarev//
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Hämta registrerade användare //
        const usersData = await fs.readFile('users.json', 'utf8');
        const users = JSON.parse(usersData);

        // Kontrollera om användaren finnd //
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
            return;
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});



// Spara userList i localStorage //
localStorage.setItem('userList', JSON.stringify(userList));



async function listCourses() {
    const courses = await fetchCourses();
    courses.forEach((course) => {
        console.log(course);
        courseList.innerHTML += `<div>
        <span>${course.title}</span>
        <span>Kursnummer ${course.number}</span>
        <span><i class="far fa-clock"></i> ${course.duration} dagar</span>
        <span><i class="fas fa-chalkboard"></i> ${course.type}</span>
        <span><i class="far fa-image"></i> ${course.image}</span>
        <span>Datum: ${course.date}</span>
        <span><i class="far fa-calendar-check"></i> Boka: ${course.bookingOption}</span>
        
        <button class="bokaKnapp" data-kurs-id="${course.id}">Boka</button>
        </div>`;
    });

    //  händelselyssnare för bokningsknapparna //
    document.querySelectorAll('.bokaKnapp').forEach(knapp => {
        knapp.addEventListener('click', bokaHanterare);
    });
}



//  bokaHanterare-funktionen //
function bokaHanterare(event) {
    const kursId = event.target.getAttribute('data-kurs-id');
    const kurs = hittaKursMedId(kursId);

    if (kurs) {
        // Hämta användarlistan från localStorage //
        const userList = JSON.parse(localStorage.getItem('userList')) || [];

      
        const formContainer = document.createElement('div');
        formContainer.innerHTML = `
            <form id="bookingForm" style="max-width: 300px; margin: 0 auto; padding: 20px; background-color: #fff; box-shadow: 0 8px 8px rgba(0, 0, 0, 0.8); border-radius: 8px;">
                <label for="firstName">Förnamn:</label>
                <input type="text" id="firstName" name="firstName" style="width: 100%; margin-bottom: 10px;" required>
                <label for="lastName">Efternamn:</label>
                <input type="text" id="lastName" name="lastName" style="width: 100%; margin-bottom: 10px;" required>
                <label for="mobilnummer">Mobilnummer:</label>
                <input type="text" id="mobilnummer" name="mobilnummer" style="width: 100%; margin-bottom: 10px;" required>
                <label for="faktureringsadress">Faktureringsadress:</label>
                <input type="text" id="faktureringsadress" name="faktureringsadress" style="width: 100%; margin-bottom: 10px;" required>
                <label for="email">E-post:</label>
                <input type="email" id="email" name="email" style="width: 100%; margin-bottom: 10px;" required>
                
                <!-- ... (Lägg till övriga input-fält här) ... -->
                
                <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer;">Bekräfta</button>
                <button type="button" id="avbrytButton" style="background-color: #d9534f; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Avbryt</button>
            </form>
        `;

        formContainer.style.position = 'fixed';
        formContainer.style.top = '50%';
        formContainer.style.left = '50%';
        formContainer.style.transform = 'translate(-50%, -50%)';
        
        
        document.body.appendChild(formContainer);

      
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const mobilnummer = document.getElementById('mobilnummer').value;
    const faktureringsadress = document.getElementById('faktureringsadress').value;

    // Validera e-post mot userList //
    const isValidEmail = userList.some(user => user.email === email);

    if (firstName && lastName && isValidEmail) {
       
        alert(`Bokar ${kurs.title} för ${firstName} ${lastName}`);

        // Skicka bokningsinformationen till servern //
        const bokningsInfo = {
            kursId: kursId,
            kursTitel: kurs.title, 
            fornamn: firstName,
            efternamn: lastName,
            userEmail: email,
            mobilnummer: mobilnummer,
            faktureringsadress: faktureringsadress,
        };

        
        fetch('http://localhost:3000/userCourses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...bokningsInfo,
                selectedCourse: "JavaScript for Experts" // Ersätt detta med det verkliga valet av kurs
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Något gick fel vid bokningen.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Bokning lyckades:', data);

           
            console.log('Skickad data:', {
                ...bokningsInfo,
                selectedCourse
            });
        })
        .catch(error => {
            console.error('Fel vid bokning:', error.message);
        });

        // Ta bort formuläret efter att bokningen //
        document.body.removeChild(formContainer);
    } else {
      
        alert('Felaktig e-postadress. Vänligen ange en giltig e-postadress.');
    }
});


        // avbrytningsknappen //
        const avbrytButton = document.getElementById('avbrytButton');
        avbrytButton.addEventListener('click', function () {
           
            document.body.removeChild(formContainer);
        });

    } else {
        console.error(`Kurs med ID ${kursId} hittades inte.`);
    }
}


function hittaKursMedId(kursId) {
    const kurser = document.querySelectorAll('.bokaKnapp');
    for (const kurs of kurser) {
        if (kurs.getAttribute('data-kurs-id') === kursId) {
            return kurs;
        }
    }
    return null;
}
