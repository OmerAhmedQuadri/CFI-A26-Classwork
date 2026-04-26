const params = new URLSearchParams(window.location.search)
const email = params.get('user')
const verify = params.get('verify') // email or phone
const token = params.get('token')

if (!email || !verify || !token || !['email', 'phone'].includes(verify)) {
    window.location.href = '../'
}

const app = axios.create({
    baseURL: 'http://localhost:3000',
    validateStatus: (status) => status < 500
})

const primaryContainer = document.getElementById('primary-container')
const secondaryContainer = document.getElementById('secondary-container')
const errorContainer = document.getElementById('error-container')
const errorMessage = document.getElementById('error-message')
const verifyBtn = document.getElementById('verify-btn')
const visitBtn = document.getElementById('visit-btn')

visitBtn.addEventListener('click', () => {
    window.location.href = '../login'
})

verifyBtn.addEventListener('click', verifyHandler)

async function verifyHandler () {
    try {
        const response = await app.get(`/api/auth/verify/${verify}/${email}/${token}`)
        console.log(response.data);
        if (!response.data.success) {
            errorContainer.classList.remove('hidden')
            errorMessage.textContent = response.data.message
            if(response.status === 409) {
                verifyBtn.textContent = 'Login now'
                verifyBtn.removeEventListener('click', verifyHandler)
                verifyBtn.addEventListener('click', () => {
                    window.location.href = '../login'
                })
            }
            return
        }

        primaryContainer.classList.add('hidden')
        secondaryContainer.classList.remove('hidden')
    } catch (error) {
        errorContainer.classList.remove('hidden')
    }

}