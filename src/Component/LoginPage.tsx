
import React, { Component } from 'react';
import { TextField, Button, Typography } from '@mui/material';

type FormData = {
    username: string;
    email: string;
    password: string;
};
type State = {
    formData: FormData;
    Data: FormData[];
    submitted: boolean;
    error: string;
};
const localStorageData = (): FormData[] => {
    const formData = localStorage.getItem('formData');
    if (formData) {
        return JSON.parse(formData);
    }
    return [];
};

class LoginPage extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formData: { username: '', email: '', password: '' },
            Data: localStorageData(),
            submitted: false,
            error: '',
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
            error: '',
        }));
    };

    
    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { formData, Data } = this.state;
    
        if (formData.username.trim() === '') {
            this.setState({ error: 'please fill the field' });
            return;
        }
        if (formData.username.trim() === '') {
            this.setState({ error: 'Username is required' });
            return;
        }
    
        if (formData.email.trim() === '') {
            this.setState({ error: 'Email is required' });
            return;
        }
    
        if (formData.password.trim() === '') {
            this.setState({ error: 'Password is required' });
            return;
        }
    
        const Email = Data.some((data) => data.email === formData.email);
        if (Email) {
            this.setState({ error: 'Email already exists' });
            return;
        }
    
        this.setState(
            (prevState) => ({
                Data: [...prevState.Data, prevState.formData],
                submitted: true,
                formData: { username: '', email: '', password: '' },
                error: '', // Resetting error message
            }),
            () => localStorage.setItem('formData', JSON.stringify(this.state.Data))
        );
    };
    

    componentDidMount() {
        const data = localStorageData();
        if (data) {
            this.setState({ Data: data, submitted: true });
        }
    }

    componentDidUpdate(prevState: State) {
        if (prevState.Data !== this.state.Data) {
            localStorage.setItem('formData', JSON.stringify(this.state.Data));
        }
    }

    render() {
        const { formData, Data, submitted, error } = this.state;
        return (
            <div>
            <h1>LOGIN FORM</h1>
            <form onSubmit={this.handleSubmit}>
                <TextField
                    sx={{ width: '30%' }}
                    label="Username"
                    name="username"
                    variant="outlined"
                    margin="normal"
                    value={formData.username}
                    onChange={this.handleChange}
                  
                    
                    helperText={error && formData.username.trim() === '' ? error : ''}
                />
                <TextField
                    sx={{ width: '30%' }}
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={this.handleChange}
                    // error={error && formData.email.trim() === ''}
                    helperText={error && formData.email.trim() === '' ? error : ''}
                />
                <TextField
                    sx={{ width: '30%' }}
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formData.password}
                    onChange={this.handleChange}
                    // error={error && formData.password.trim() === ''}
                    helperText={error && formData.password.trim() === '' ? error : ''}
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
            {submitted && (
                <div>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Submitted Data
                    </Typography>
                    {Data.map((data, index) => (
                        <div key={index}>
                            <Typography>Username: {data.username}</Typography>
                            <Typography>Email: {data.email}</Typography>
                            <Typography>Password: {data.password}</Typography>
                        </div>
                    ))}
                </div>
            )}
        </div>
        );
    }
}

export default LoginPage;


