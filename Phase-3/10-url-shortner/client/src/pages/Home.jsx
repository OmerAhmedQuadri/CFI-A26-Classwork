import React from 'react'
import api from '../api/axios.js'
import { useState } from 'react'

const Home = () => {
    const [longUrl, setlongUrl] = useState('')
    const [shortUrl, setshortUrl] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [copy, setcopy] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setshortUrl('')
        try {
            const response = await api.post('/urls/create', { url: longUrl })
            setshortUrl(response.data.data.shortUrl)
            setLoading(false)
            console.log(response.data);
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
            setLoading(false)
        }
    }

    const copyHandler = () => {
        navigator.clipboard.writeText(shortUrl)
        setcopy(true)
        setTimeout(() => {
            setcopy(false)
        }, 2000);
    }


    return (
        <div className='w-full h-screen flex flex-col items-center justify-center'>
            <div className=' p-4 py-6 border rounded-2xl flex flex-col items-center w-md gap-4'>
                <h1 className='text-2xl font-bold mb-4 text-blue-500'>Url Shortner</h1>
                <div className='w-full flex flex-col items-center justify-center gap-2'>
                    <input value={longUrl} onChange={e => setlongUrl(e.target.value)} type="text" className='border p-2 rounded-lg w-full' placeholder='https://example.com/sjdfgbsa/ergergerg' />
                    <button onClick={handleSubmit} className='bg-blue-500 text-white px-1 py-2 rounded-lg w-full'>{!loading ? 'Shorten' : 'Shortening'}</button>
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-4 mt-4'>
                    {shortUrl && (
                        <div className='w-full flex flex-col items-center justify-center'>
                            <h5 className='font-bold text-blue-500'>Short url:</h5>
                            <div className='w-full flex flex-row items-center justify-center mt-2'>
                                <input type="text" className='outline-0 border p-2 rounded-l-lg w-full' placeholder='https://example.com/sjdfgbsa/ergergerg' value={shortUrl} readOnly />
                                <button onClick={copyHandler} className={`${copy ? 'bg-green-400 border-green-500' : 'bg-blue-500 border-blue-500'} border text-white py-2 rounded-r-lg px-2`}>{ !copy ? 'Copy' : 'Copied'}</button>
                            </div>
                        </div>)}
                </div>
            </div>

        </div>
    )
}

export default Home