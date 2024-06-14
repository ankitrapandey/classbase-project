
// import React, { Component } from 'react';
// import { TextField, Button, Typography } from '@mui/material';

// type ForgetData = {
//   email: string;
// };

// type State = {
//   forgetData: ForgetData;
//   Data: ForgetData[];
//   match: boolean;
//   OTP: string;
//   // submitted: boolean;
// };

// const localStorageData = (): ForgetData[] => {
//   const formData = localStorage.getItem('formdata');
//   if (formData) {
//     return JSON.parse(formData);
//   }
//   return [];
// };

// class ForgetPassword extends Component<{}, State> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       forgetData: { email: '' },
//       Data: localStorageData(),
//       OTP: '',
//       match: false,
//       // submitted: false,
//     };
//   }

//   generateOTP = () => {
//     const digits = '0123456789';
//     let OTP = '';
//     const len = digits.length;
//     for (let i = 0; i < 4; i++) {
//       OTP += digits[Math.floor(Math.random() * len)];
//     }
//     console.log(OTP)
//     // return OTP;
//   }


//   handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       forgetData: { ...prevState.forgetData, [name]: value },
//     }));
//       this.setState({ OTP: value });

//   };

//   handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { forgetData, Data } = this.state;

//     const matchemail = Data.some((data) => data.email === forgetData.email);
//     if (matchemail) {
//       this.setState({
//         match: true,

//       });
//       alert('matched')
//       this.generateOTP();
//     }
//     else {
//       this.setState({
//         match: false,
//         OTP: '',
//       });
//       alert('Email not found');
//     }
//     this.setState({
//       // forgetData: { email: '' },

//     });
//   };
//   render() {
//     const { forgetData, match, OTP } = this.state;
//     return (
//       <div className='h-auto w-[40vw] bg-orange-300 mt-6'>
//         <h1>Forget Password</h1>

//         <form onSubmit={this.handleSubmit}>
//           <TextField
//             sx={{ width: '30%' }}
//             label="Email"
//             name="email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={forgetData.email}
//             onChange={this.handleChange}
//           />
//           <Button
//             sx={{ width: '15vw' }}
//             type="submit"
//             variant="contained"
//             color="primary"
//           >
//             Submit
//           </Button>
//         </form>

//         {match && (
//           <div>
//             <Typography variant="h6" component="h2" gutterBottom>
//               Enter OTP
//             </Typography>
//             <TextField
//               sx={{ width: '30%' }}
//               label="OTP"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={OTP}
//               onChange={this.handleChange}

//             />
//             <Button
//               variant="contained"
//               color="secondary"
//               // onClick={this.generateOTP}
//             >
//               Match otp
//             </Button>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default ForgetPassword;







import React, { Component } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { timeStamp } from 'console';

type ForgetData = {
  email: string;
};

type State = {
  forgetData: ForgetData;
  Data: ForgetData[];
  match: boolean;
  OTP: string;
};

const localStorageData = (): ForgetData[] => {
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
      forgetData: { email: '' },
      Data: localStorageData(),
      OTP: '',
      match: false,
    };
  }

  generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    const len = digits.length;
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * len)];
    }
    console.log(OTP)
    // Save OTP to state
    this.setState({ OTP });
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      forgetData: { ...prevState.forgetData, [name]: value },
    }));
    this.setState({OTP:value})
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { forgetData, Data } = this.state;

    const matchemail = Data.filter((data) => data.email === forgetData.email);
    console.log(matchemail);
    if (matchemail) {
      // Save matched state
      console.log(matchemail);
      this.setState({
        match: true,
      });
      alert('matched')
      this.generateOTP();
    } else {
      
      this.setState({
        match: false,
        OTP: '',
      });
      alert('Email not found');
    }
  };

  render() {
    const { forgetData, match, OTP } = this.state;
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
            value={forgetData.email}
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
              value={OTP}
              onChange={(e) => this.setState({ OTP: e.target.value })}
              // onChange={this.handleChange}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={()=>alert("OTP Matched")}
            >
              Match OTP
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ForgetPassword;

