import React, { useState } from 'react';
import { Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthrorizeContext';

export default function OtpVerificationForm() {
  const [otp, setOTP] = useState('');
  const [error, setError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3009/api/verify/email', { otp });
      console.log(response.data);
      auth.handleLogin(response.data.user);
      setAlertVisible(true);
      navigate('/login');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75vh' }}>
            <div style={{ border: '2px solid pink', padding: '20px', borderRadius: '5px', width: '30%' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Verify-Otp</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="otp">OTP:</Label>
          <Input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
        </FormGroup>
        {error && <Alert color="danger">{error}</Alert>}
        <Button type="submit" color="primary">Verify Email</Button>
      </Form>
      </div>
      </div>
    </Container>
  );
}
