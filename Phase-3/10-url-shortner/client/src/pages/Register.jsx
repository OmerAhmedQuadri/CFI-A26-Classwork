import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios.js'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)
  const [error, seterror] = useState('')
  const [success, setsuccess] = useState('')
  const [step, setstep] = useState('form') // form, otp, success
  const [formData, setformData] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  const onChangeHandler = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const [otp, setotp] = useState('')
  const registerHandler = async (e) => {
    e.preventDefault()
    setloading(true)
    seterror('')
    setsuccess('')
    try {
      const response = await api.post('/auth/register', formData)
      console.log('hello');
      setsuccess(response.data.message)
      setloading(false)
      setstep('otp')
    } catch (error) {
      console.log(error);
      seterror(error.response.data.message)
      setloading(false)
    }
  }
  const verifyOTPHandler = async () => {
    setloading(true)
    seterror('')
    setsuccess('')
    try {
      const response = await api.post('/auth/register/verify-otp', { email: formData.email, otp: otp })
      setsuccess(response.data.message)
      setloading(false)
      setstep('success')
      if(response.data.success){
        navigate('/login')
      }
    } catch (error) {
      seterror(error.response.data.message)
      setloading(false)
    }
  }

  const resendOTPHandler = async () => {
    setloading(true)
    seterror('')
    setsuccess('')
    try {
      console.log(formData.email);
      const response = await api.post('/auth/register/resend-otp', { email: formData.email })
      setsuccess(response.data.message)
      setloading(false)
    } catch (error) {
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

        {
          step === 'form' ?
            <div>
              <form onChange={onChangeHandler} className=''>
                <input type="text" name='fullname' placeholder='Name' className='border p-2 rounded-lg mb-4 w-full' />
                <input type="email" name='email' placeholder='Email' className='border p-2 rounded-lg mb-4 w-full' />
                <input type="password" name='password' placeholder='Password' className='border p-2 rounded-lg mb-4 w-full' />
                <p>
                  Already have an account? 
                  <Link to="/login" className='text-blue-500'>Login</Link>
                </p>
                <button type='submit' onClick={registerHandler} className='bg-blue-500 text-white p-2 rounded-lg w-full'>{ !loading ? 'Register' : 'Please wait...' }</button>
              </form>
            </div>
            :
            <div>
              <input type="number" placeholder='123456' value={otp} onChange={(e) => setotp(e.target.value)} className='border p-2 rounded-lg mb-4 w-full' />
              <button onClick={resendOTPHandler} className='bg-white text-blue-500 '>Resend Otp</button>
              <button onClick={verifyOTPHandler} className='bg-blue-500 text-white p-2 rounded-lg w-full'>{ loading ? 'Verify' : 'Verifying...'}</button>
            </div>

        }
      </div>

    </div>
  )
}

export default Register