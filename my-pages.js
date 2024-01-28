document.addEventListener('DOMContentLoaded', async function () {
    
    const urlParams = new URLSearchParams(window.location.search);
    const userEmail = urlParams.get('email');

    try {
        // Hämta användarens bokade kurser från servern//
        const userCourses = await fetchUserCourses(userEmail);

        // Visa användarens bokade kurser
        const userCoursesListContainer = document.getElementById('userCoursesList');
        userCourses.forEach((course) => {
            const courseElement = document.createElement('div');
            courseElement.innerHTML = `
                <span>${course.fornamn}</span>
                <span>${course.efternamn}</span>
                <span>${course.userEmail}</span>
                <span>${course.kurstitle}</span>
              

            `;

            // Consollogga de nya egenskaperna//
            console.log('Förnamn:', course.fornamn);
            console.log('Efternamn:', course.efternamn);
            console.log('E-post:', course.userEmail);
            console.log('Mobilnummer:', course.mobilnummer);
            console.log('Mobilnummer:', course.mobilnummer);
            console.log('Faktureringsadress:', course.kurstitle);

            userCoursesListContainer.appendChild(courseElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchUserCourses(email) {
    try {
        const response = await fetch(`http://localhost:3000/userCourses`);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.log(response.status);
        }
    } catch (error) {
        console.log(error);
    }
}
