import React, { Component } from 'react';
import { TextField, Button, Typography,} from '@mui/material';


type FormData = {
    username: string;
    email: string;
    password: string;
};

type State = {
    formData: FormData;
    Data: FormData[];
    submitted: boolean;
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
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
        }));
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.setState(
            (prevState) => ({
                Data: [...prevState.Data, prevState.formData],
                submitted: true,
                formData: { username: '', email: '', password: '' },
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
        const { formData, Data, submitted } = this.state;
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
                        required
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
                        required
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
                        required
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
                summited Data
                {submitted && (
                    <div>
                        <Typography variant="h6" component="h2" gutterBottom>

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