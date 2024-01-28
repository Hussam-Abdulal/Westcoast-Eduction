
document.addEventListener('DOMContentLoaded', function () {
    const addCourseForm = document.getElementById('addCourseForm');

    addCourseForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('courseTitle').value;
        const number = document.getElementById('courseNumber').value;
        const duration = parseInt(document.getElementById('courseDuration').value);
        const type = document.getElementById('courseType').value;
        const image = document.getElementById('courseImage').value;
        const date = document.getElementById('courseDate').value;
        const bookingOption = document.getElementById('bookingOption').value;

        const newCourse = { title, number, duration, type, image, date, bookingOption };

        try {
            // Skicka  nya kursen till servern //
            const response = await fetch('http://localhost:3000/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });

            if (!response.ok) {
                throw new Error('Failed to add new course.');
            }

            alert('Course added successfully!');
        } catch (error) {
            console.error('Error:', error);
        }
    });
});



document.getElementById('kundlista').addEventListener('click', function() {
    window.location.href = 'my-pages.html';
});
