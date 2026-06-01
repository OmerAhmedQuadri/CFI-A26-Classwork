import { useState } from 'react'
import api from '../api/axios.js'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState('')
    const [success, setsuccess] = useState('')
    const [step, setstep] = useState('form')
    const [formData, setformData] = useState({
        email: '',
        password: ''
    })

    const onChangeHandler = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        setloading(true)
        seterror('')
        setsuccess('')
        try {
            const response = await api.post('/auth/login', formData)
            setsuccess(response.data.message)
            setloading(false)
            console.log(response.data.message);
            if(response.data.success){ 
                navigate('/home', { replace: true })
            }
        } catch (error) {
            console.log(error);
            seterror(error.response.data.message)
            setloading(false)
        }
    }
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <div className=' p-4 border rounded-2xl flex flex-col items-center max-w-md'>

                {error && <div className='bg-red-500 text-white p-2 mb-4'>
                    {error}
                </div>}

                <div>
                    <form onChange={onChangeHandler} className=''>
                        <input type="email" name='email' placeholder='Email' className='border p-2 rounded-lg mb-4 w-full' />
                        <input type="password" name='password' placeholder='Password' className='border p-2 rounded-lg mb-4 w-full' />
                        <p>
                            Don't have an account? 
                            <Link to="/register" className='text-blue-500'>Register</Link>
                        </p>
                        <button type='submit' onClick={loginHandler} className='bg-blue-500 text-white p-2 rounded-lg w-full'>{!loading ? 'Login' : 'Please wait...'}</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Login