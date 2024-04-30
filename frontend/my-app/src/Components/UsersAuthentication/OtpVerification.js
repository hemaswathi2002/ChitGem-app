import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthrorizeContext'

export default function OtpVerificationForm() {
  const [otp, setOTP] = useState('')
  const [error, setError] = useState('')

  const auth = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put('http://localhost:3009/api/verify/email', { otp })
      console.log(response.data)
      auth.handleLogin(response.data.user)
      alert('email verified')
      // navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Verify Email</button>
      </form>
    </div>
  )
}
