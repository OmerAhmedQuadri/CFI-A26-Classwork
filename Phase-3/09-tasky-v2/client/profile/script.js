// document.addEventListener('DOMContentLoaded', () => {
const token = localStorage.getItem("token") || window.location.replace("/login");

// html tags
const logoutBtn = document.getElementById('logout-btn')
const editProfileBtn = document.getElementById('edit-profile-btn')
const cancelEditBtn = document.getElementById('cancel-profile-btn')
const saveProfileBtn = document.getElementById('save-profile-btn')
const messageBox = document.getElementById('message-box')
const title = document.getElementById('title')
const verifyEmailBtn = document.getElementById('verify-email-btn')
const emailInputBox = document.getElementById('email')
const otpContainer = document.getElementById('otp-container')
const validateOtpBtn = document.getElementById('validate-otp-btn')

// other global declarations
let profile = {}

// event listeners

verifyEmailBtn.addEventListener('click', requestEmailUpdate)
saveProfileBtn.addEventListener('click', updateProfile)
editProfileBtn.addEventListener('click', editProfile)
validateOtpBtn.addEventListener('click', validateOTP)

emailInputBox.addEventListener('input', (e) => {
    e.preventDefault()

    if (emailInputBox.value === profile.email) {
        verifyEmailBtn.classList.add('hidden')
        emailInputBox.classList.remove('border-red-600')
        return
    }
    emailInputBox.classList.add('border-red-600')
    verifyEmailBtn.classList.remove('hidden')
})

title.addEventListener('click', () => {
    console.log('title clicked')
    window.location.href = '/home'
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
})


// axios instance initialixation
const app = axios.create({
    baseURL: '/api',
    headers: {
        'auth-token': token
    },
    validateStatus: (status) => status < 500
})
fetchProfile()

// functions
function editProfile(e) {
    e.preventDefault()
    editProfileBtn.classList.add('hidden')
    cancelEditBtn.classList.remove('hidden')
    saveProfileBtn.classList.remove('hidden')
    emailInputBox.removeAttribute('readonly')
    document.querySelector('#phone').removeAttribute('readonly')
    document.querySelector('#name').removeAttribute('readonly')
}


async function fetchProfile(params) {
    try {
        const response = await app.get('/users/profile')
        // console.log(response);
        profile = response.data.data
        viewProfile(profile)
    } catch (error) {
        console.log(error);
    }
}

function viewProfile(profile) {
    // console.log(profile);
    document.querySelector('#name').value = profile.fullname
    document.querySelector('#email').value = profile.email
    document.querySelector('#phone').value = profile.phone
    document.querySelector('#role').value = profile.role
}


async function updateProfile(e) {
    e.preventDefault()
    const fullname = document.querySelector('#name').value
    const phone = document.querySelector('#phone').value

    try {
        const response = await app.put('/users/profile', { fullname, phone })
        console.log(response);
        if (response.data.success) {
            displayMessage(response.data.message, 'success')
            console.log('not executed');
            editProfileBtn.classList.remove('hidden')
            cancelEditBtn.classList.add('hidden')
            saveProfileBtn.classList.add('hidden')
            document.querySelector('#phone').readOnly = true
            document.querySelector('#name').readOnly = true
            await fetchProfile()
        }
        else {
            displayMessage(response.data.message, 'error')
        }
    } catch (error) {
        console.log('executed');
        console.log(error);
        displayMessage(error.message, 'error')
    }

}

function displayMessage(message, type = 'success') {
    if (type === 'success') {
        messageBox.classList.remove('bg-red-300', 'text-red-700')
        messageBox.classList.add('bg-green-300', 'text-green-800')
    } else {
        messageBox.classList.remove('bg-green-300', 'text-green-800')
        messageBox.classList.add('bg-red-300', 'text-red-700')
    }
    messageBox.textContent = message
    messageBox.classList.remove('hidden')
    setTimeout(() => {
        messageBox.classList.add('hidden')
    }, 3000);
}


async function requestEmailUpdate(e) {
    console.log(e);
    e.preventDefault()
    const email = emailInputBox.value
    profile.updateEmail = email
    console.log(email);

    try {
        const response = await app.post('/auth/request/update/email', { email })
        console.log(response);
        if (response.data.success) {
            displayMessage(response.data.message, 'success')
            verifyEmailBtn.classList.add('hidden')
            otpContainer.classList.remove('hidden')
            otpContainer.children[1].focus()
        }
        else {
            displayMessage(response.data.message, 'error')
        }
    } catch (error) {
        console.log('executed');
        console.log(error);
        displayMessage(error.message, 'error')
    }
}
// })


async function validateOTP(e) {
    e.preventDefault()
    const otp = document.querySelector('#otp').value
    console.log(otp);
    try {
        const response = await app.post('/auth/update/email', { email: profile.updateEmail, otp })
        console.log(response);
        if (response.data.success) {
            displayMessage(response.data.message, 'success')
            otpContainer.classList.add('hidden')
            // cancelEditBtn.click()
        }
        else {
            displayMessage(response.data.message, 'error')
        }
    } catch (error) {
        console.log('executed');
        console.log(error);
        displayMessage(error.message, 'error')
    }
}