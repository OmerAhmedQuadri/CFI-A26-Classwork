const token = localStorage.getItem("token") || window.location.replace("../login");

// html tags
const logoutBtn = document.getElementById('logout-btn')
const editProfileBtn = document.getElementById('edit-profile-btn')
const cancelEditBtn = document.getElementById('cancel-profile-btn')
const saveProfileBtn = document.getElementById('save-profile-btn')

// event listeners
editProfileBtn.addEventListener('click', editProfile)

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    window.location.href = '../login'
})

const app = axios.create({
    baseURL: 'http://localhost:3000/api/users',
    headers: {
        'auth-token': token
    },
    validateStatus: (status) => status < 500
})
fetchProfile()

// functions
function editProfile (e) {
    e.preventDefault()
    editProfileBtn.classList.add('hidden')
    cancelEditBtn.classList.remove('hidden')
    saveProfileBtn.classList.remove('hidden')
    
}


async function fetchProfile(params) {
    try {
        const response = await app.get('/profile')
        console.log(response);
        viewProfile(response.data.data)
    } catch (error) {
        console.log(error);
    }
}

function viewProfile(profile){
    console.log(profile);
    document.querySelector('#name').value = profile.fullname
    document.querySelector('#email').value = profile.email
    document.querySelector('#phone').value = profile.phone
    document.querySelector('#role').value = profile.role
}