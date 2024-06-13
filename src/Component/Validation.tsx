

import React, { Component } from 'react';

type FormData = {
    username: string;
    email: string;
    password: string;
};

type State = {
    formData: FormData;
    Data: FormData[];
    submitted: boolean;
    error: {
        username: string;
        email: string;
        password: string;
    };
};

const localStorageData = (): FormData[] => {
    const formData = localStorage.getItem('formData');
    if (formData) {
        return JSON.parse(formData);
    }
    return [];
};

class Validation extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formData: { username: '', email: '', password: '' },
            Data: localStorageData(),
            submitted: false,
            error: { username: '', email: '', password: '' },
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            formData: { ...prevState.formData, [name]: value },
            // error: { ...prevState.error, [name]: '' },
        }));
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { formData, Data } = this.state;

        const errors = {

            username: formData.username.trim() === '',
            email: formData.email.trim() === '',
            password: formData.password.trim() === '',
        };

        if (Object.values(errors).some(Boolean)) {
            this.setState({
                error: {
                
                    username: errors.username ? 'Please fill username field' : '',
                    email: errors.email ? 'Please fill email field' : '',
                    password: errors.password ? 'Please fill password field' : '',
                },
            });
            return;
        }

        const Email = Data.some((data) => data.email === formData.email);
        if (Email) {
            this.setState({
                error: {
                    email: 'Email already prsent',
                    password: 'Password already present',
                    username: ''
                },
            });
            // return;
        }

        this.setState(
            (prevState) => ({
                Data: [...prevState.Data, prevState.formData],
                submitted: true,
                formData: { username: '', email: '', password: '' },
                error: { username: '', email: '', password: '' },
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

    componentDidUpdate(prevProps: {}, prevState: State) {
        if (prevState.Data !== this.state.Data) {
            localStorage.setItem('formData', JSON.stringify(this.state.Data));
        }
    }

    render() {
        const { formData, Data, submitted, error } = this.state;
        return (
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <h1>LOGIN FORM</h1>
                <form onSubmit={this.handleSubmit}>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
                        <input
                            name="username"
                            value={formData.username}
                            onChange={this.handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {error.username && <span style={{ color: 'red' }}>{error.username}</span>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={this.handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {error.email && <span style={{ color: 'red' }}>{error.email}</span>}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={this.handleChange}
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                        {error.password && <span style={{ color: 'red' }}>{error.password}</span>}
                    </div>
                    <button type="submit" style={{ padding: '10px 20px' }}>
                        Submit
                    </button>
                </form>
                {submitted && (
                    <div style={{ marginTop: '20px' }}>
                        <h2>Submitted Data</h2>
                        {Data.map((data, index) => (
                            <div key={index} style={{ marginBottom: '10px' }}>
                                <p><strong>Username:</strong> {data.username}</p>
                                <p><strong>Email:</strong> {data.email}</p>
                                <p><strong>Password:</strong> {data.password}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default Validation;
