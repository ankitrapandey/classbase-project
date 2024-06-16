
import React, { Component, FormEvent, ChangeEvent } from 'react';
import { TextField, Button, Typography } from '@mui/material';

type FormData = {
  email: string;
  OTP: string;
  password: string;
  confirmPassword: string;
};

type State = {
  formData: FormData;
  Data: FormData[];
  matchOtp: boolean;
  matchPass: boolean;
  generatedOTP: string; // Add state to store generated OTP
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
      formData: { email: '', OTP: '', password: '', confirmPassword: '' },
      Data: localStorageData(),
      matchOtp: false,
      matchPass: false,
      generatedOTP: '', // Initialize generatedOTP
    };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
   
  };

  generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    const len = digits.length;
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    console.log(`this is otp: ${OTP}`);

    this.setState({ generatedOTP: OTP }); 
    
    // Store generated OTP in state
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { formData, Data } = this.state;
    const matchemail = Data.some((data) => data.email === formData.email);
    if (matchemail) {
      this.setState({
        matchOtp: true,
      });
      alert('Email matched.');
      this.generateOTP();
    } else {
      alert('Email not found.');
    }
  };

  handleOtp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { OTP } = this.state.formData;
    const { generatedOTP } = this.state;

    if (OTP === generatedOTP) {
      alert('OTP matched.');
      this.setState({
        matchPass: true,
        matchOtp: false,
      });
    } else {
      alert('OTP does not match.');
    }
  };

  handlePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state.formData;

    if (password === confirmPassword) {
      alert('Passwords match.');
     
      
    } else {
      alert('Passwords do not match.');
  
    }
  };

  render() {
    const { formData, matchOtp, matchPass } = this.state;
    return (
      <div className='h-auto w-[40vw] bg-orange-300 mt-6'>
        <h1>Forget Password</h1>
        <form onSubmit={this.handleSubmit}>
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
            Submit
          </Button>
        </form>

        {matchOtp && (
          <form onSubmit={this.handleOtp}>
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
              value={formData.OTP}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ marginTop: '10px' }}
            >
              Match OTP
            </Button>
          </form>
        )}

        {matchPass && (
          <form onSubmit={this.handlePassword}>
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
              value={formData.password}
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
              value={formData.confirmPassword}
              onChange={this.handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: '10px' }}
            >
              Match Password
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default ForgetPassword;