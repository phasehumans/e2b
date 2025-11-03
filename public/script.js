// Base URL for API endpoints
const API_BASE_URL = 'http://localhost:3000';

// Utility function to set authentication token
function setAuthToken(token) {
    if (token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    }
}

// Check if user is already logged in
function checkAuthStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
        document.getElementById('logoutBtn').style.display = 'inline-block';
        showSection('courses');
        loadCourses();
    } else {
        showSection('login');
    }
}

// Show/hide sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, {
            email,
            password
        });

        setAuthToken(response.data.token);
        document.getElementById('logoutBtn').style.display = 'inline-block';
        showSection('courses');
        loadCourses();
    } catch (error) {
        alert(error.response?.data?.message || 'Login failed');
    }
}

// Handle registration
async function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, {
            name,
            email,
            password
        });

        alert('Registration successful! Please login.');
        showSection('login');
    } catch (error) {
        alert(error.response?.data?.message || 'Registration failed');
    }
}

// Load courses
async function loadCourses() {
    try {
        const response = await axios.get(`${API_BASE_URL}/courses`);
        const coursesList = document.getElementById('coursesList');
        coursesList.innerHTML = '';

        response.data.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-card';
            courseElement.innerHTML = `
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <p class="price">$${course.price}</p>
                <button onclick="enrollCourse('${course._id}')">Enroll</button>
            `;
            coursesList.appendChild(courseElement);
        });
    } catch (error) {
        alert('Failed to load courses');
    }
}

// Enroll in a course
async function enrollCourse(courseId) {
    try {
        await axios.post(`${API_BASE_URL}/courses/${courseId}/enroll`);
        alert('Successfully enrolled in the course!');
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to enroll in the course');
    }
}

// Handle logout
function logout() {
    setAuthToken(null);
    document.getElementById('logoutBtn').style.display = 'none';
    showSection('login');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});