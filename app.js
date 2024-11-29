document.addEventListener("DOMContentLoaded", function () {
    const ws = new WebSocket('ws://localhost:8080');

    const form = document.querySelector('#studentForm');
    const table = document.querySelector('#studentTable tbody');

    // WebSocket connection events
    ws.onopen = () => console.log('WebSocket connection established.');
    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = () => console.log('WebSocket connection closed.');

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect form data
        const studentData = {
            fullName: form.fullName.value.trim(),
            age: form.studentAge.value.trim(),
            major: form.major.value.trim(),
            section: form.section.value.trim(),
        };

        // Send data to server
        ws.send(JSON.stringify({ type: 'add_student', data: studentData }));

        // Reset form
        form.reset();
    });

    // Update table with data received from WebSocket
    ws.onmessage = (e) => {
        const { type, data } = JSON.parse(e.data);

        if (type === 'update_table') {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.fullName}</td>
                <td>${data.age}</td>
                <td>${data.major}</td>
                <td>${data.section}</td>
            `;
            table.appendChild(row);
        }
    };
});
