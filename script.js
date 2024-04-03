let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const message = document.querySelector('textarea[name="message"]');

    // Validate the user input
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Please fill in all fields');
        e.preventDefault();
        return;
    }

    if (!validateEmail(email.value)) {
        alert('Please enter a valid email address');
        e.preventDefault();
        return;
    }

    // Sanitize the user input
    const sanitizedName = DOMPurify.sanitize(name.value);
    const sanitizedEmail = DOMPurify.sanitize(email.value);
    const sanitizedMessage = DOMPurify.sanitize(message.value);

    // Update the form data
    name.value = sanitizedName;
    email.value = sanitizedEmail;
    message.value = sanitizedMessage;
});

// Validate email address
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
