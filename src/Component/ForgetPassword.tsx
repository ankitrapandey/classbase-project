

import React, { Component } from 'react';
import { TextField, Button, Typography } from '@mui/material';

type FormData = {
  email: string;
};

type State = {
  formData: FormData;
  Data: FormData[];
  match: boolean;
  OTP: string;
  password: string;
  confirmPassword: string;
  submitted: boolean;
};

const localStorageData = (): FormData[] => {
  const formData = localStorage.getItem('formdata');
  if (formData) {
    return JSON.parse(formData);
  }
  return [];
};

class ForgetPassword extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      formData: { email: '' },
      Data: localStorageData(),
      match: false,
      OTP: '',
      password: '',
      confirmPassword: '',
      submitted: false,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
    if (name === 'OTP') {
      this.setState({ OTP: value });
    } else if (name === 'password') {
      this.setState({ password: value });
    } else if (name === 'confirmPassword') {
      this.setState({ confirmPassword: value });
    }
  };

  generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    const len = digits.length;
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    console.log(OTP);
   
    this.setState({ OTP });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { formData, Data } = this.state;
    const matchemail = Data.some((data) => data.email === formData.email);
    if (matchemail) {
      this.setState({
        match: true,
      });
      alert('Email matched. ');
      this.generateOTP();
    } else {
      alert('Email not found');
    }
  };

  handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword, OTP } = this.state;
    
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
    } else if (OTP === '') {
      alert('Please fill OTP first.');
    } else {
      alert('Password match!');
      // You can add logic to update password in localStorage or backend here
      this.setState({
        password: '',
        confirmPassword: '',
        OTP: '',
        match: false,
      });
    }
  };

  render() {
    const { formData, match, OTP, password, confirmPassword } = this.state;
    return (
      <div className='h-auto w-[40vw] bg-orange-300 mt-6'>
        <h1>SIGNUP PAGE</h1>
        <form onSubmit={match ? this.handlePasswordSubmit : this.handleSubmit}>
          <TextField
            sx={{ width: '30%' }}
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={this.handleChange}
          />

          <Button
            sx={{ width: '15vw' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {/* {match ? 'Submit OTP' : 'Submit' }
             */}
            submit
          </Button>

          {match && (
            <div>
              <Typography variant="h6" component="h2" gutterBottom>
                Enter OTP
              </Typography>
              <TextField
                sx={{ width: '30%' }}
                label="OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                name="OTP"
                value={OTP}
                onChange={this.handleChange}
              />
              <Button
                variant="contained"
                color="secondary"
              // onClick={this.generateOTP}
              
              >
                Match OTP
              </Button>
            </div>
          )}

          <Typography variant="h6" component="h2" gutterBottom>
            Enter New Password
          </Typography>
          <TextField
            sx={{ width: '30%' }}
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />
          <Typography variant="h6" component="h2" gutterBottom>
            Enter Confirm Password
          </Typography>
          <TextField
            sx={{ width: '30%' }}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={this.handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Match Password
          </Button>
        </form>
      </div>
    );
  }
}

export default ForgetPassword;






