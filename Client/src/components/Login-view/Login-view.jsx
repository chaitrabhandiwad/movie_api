import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };
    // https://react-bootstrap.github.io/components/forms/
    // React-bootstrap components form
    return (
        <Form.Group>
            <Form.Group controlId='formBasicEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type='text'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder='Enter username'
                />
                <Form.Text className='text-muted'></Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Enter Password'
                />
                <Form.Text className='text-muted'></Form.Text>
            </Form.Group>
            <Button variant='primary' type='submit' onClick={handleSubmit}>
                Submit
      </Button>
            <Form.Group controlId='formNewUser'>
                <Form.Text className='newUsers'>
                    New user? click <span onClick={() => props.onClick()}>Here</span> to
          sign up{' '}
                </Form.Text>
            </Form.Group>
        </Form.Group>
    );
}