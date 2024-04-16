import React, { useState } from 'react'
import axios from 'axios'

export default function OtpVerificationForm() {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/verify/email', { email, otp });
      console.log(response.data);
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.error || 'Failed to verify email');
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOTP(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Verify Email</button>
      </form>
    </div>
  );
}
