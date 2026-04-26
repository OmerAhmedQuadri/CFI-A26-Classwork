localStorage.removeItem('token')
document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm')
    const errorContainer = document.getElementById('errorContainer')
    const errorMessage = document.getElementById('error-message')
    console.log(errorMessage);
    const app = axios.create({
        baseURL: 'http://localhost:3000',
        validateStatus: (status) => status < 500
    })
    loginForm.addEventListener('submit', submitHandler)

    async function submitHandler(e) {
        e.preventDefault()
        const formdata = new FormData(loginForm)
        const data = Object.fromEntries(formdata.entries())
        // console.log(data);
        
        try {
            const response = await app.post('/api/users/login', { email: data.email, password: data.password })

            if (!response.data.success) {
                errorContainer.classList.remove('hidden')
                errorMessage.textContent = response.data.message
                return
            }
            errorContainer.classList.add('hidden')
            const token = response.data.data.token
            localStorage.setItem('token', token)
            window.location.href = '../home'

        } catch (error) {
            errorContainer.classList.remove('hidden')
        }
        
    }
})
