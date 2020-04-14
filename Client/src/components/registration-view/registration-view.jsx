// client/src/components/main-view/registration-view.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './registration-view.scss';

const URL = 'http://localhost:3000';

export function RegistrationView(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = e => {

        e.preventDefault();
        const data = {

            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }

        axios.post(`${URL}/users`, data)

            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self'); // with '_self' page will open in current tab    
            })

            .catch(error => {
                console.log('error registering user')
                return alert('Oops. Please try again');
            });
    };

    return (
        <div className="registration-view">
            <Row className="justify-content-center">
                <Col xs={11} sm={6} md={3}>
                    <Container className="container register-container border border-light shadow p-3 mb-5 rounded py-3 px-3">
                        <h3 className="pb-2">Sign up for myFlix</h3>
                        <Form>
                            <Form.Group controlId='formBasicUsername'>
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type='username'
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    placeholder='Enter Username' />
                            </Form.Group>

                            <Form.Group controlId='formBasicPassword'>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Enter Password'
                                />

                            </Form.Group>

                            <Form.Group controlId='formBasicEmail'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder='Enter Email'
                                />
                            </Form.Group>

                            <Form.Group controlId='formBasicBirthday'>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type='birthday'
                                    value={birthday}
                                    onChange={e => setBirthday(e.target.value)}
                                    placeholder='Enter Birthday'
                                />
                            </Form.Group>
                            <Button variant='outline-dark' type='submit' onClick={handleSubmit}>
                                Submit
      </Button>
                        </Form>
                    </Container>
                    <Container className="mt-4">
                        <Row className="d-flex align-items-center justify-content-center">
                            <span>Already have an account?</span>
                            <Button variant="link" className="login-link btn-lg" type="submit" onClick={() => props.onClick()}>Login</Button>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div >
    );
}



RegistrationView.propTypes = {

};