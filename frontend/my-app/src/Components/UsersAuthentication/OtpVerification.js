import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthrorizeContext';
import { Button } from 'react-bootstrap';
export default function OtpVerificationForm() {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3009/api/verify/email', { otp });
      console.log(response.data);
      auth.handleLogin(response.data.user);
      alert('Email verified');
      navigate('/customers');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="verification-box-container">

    <div className="verification-box" style={{ width: '25%' }}>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Verify Otp"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            style={{ borderColor: '#ffb6c1' }} // Light pink border for the input field
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit" style={{ backgroundColor: '#ffb6c1' }}>Submit</Button>
      </form>
    </div>
    </div>
  );
}