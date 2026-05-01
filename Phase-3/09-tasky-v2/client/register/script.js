document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm')
    const errorContainer = document.getElementById('errorContainer')
    const errorMessage = document.getElementById('error-message')

    console.log(errorMessage);
    const app = axios.create({
        baseURL: '/api/users',
        validateStatus: (status) => status < 500
    })
    registerForm.addEventListener('submit', submitHandler)

    async function submitHandler(e) {
        e.preventDefault()
        const formdata = new FormData(registerForm)
        const data = Object.fromEntries(formdata.entries())
        console.log(data.phone);
        if (data.password !== data.confirmPassword) {
            errorContainer.classList.remove('hidden')
            errorMessage.textContent = 'Passwords do not match'
            return
        }
        // console.log(data);
        
        try {
            errorContainer.classList.add('hidden')
            const res = await app.post('/register', {
                fullname: data.fullname,
                phone: data.phone,
                email: data.email,
                password: data.password
            })
            if (!res.data.success) {
                errorContainer.classList.remove('hidden')
                errorMessage.textContent = res.data.message
                console.log(res.data);
                return
            }
            window.location.href = '/login'
        } catch (error) {
            errorContainer.classList.remove('hidden')
            errorMessage.textContent = error.message
        }
        
    }
})
