import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

const URL = 'http://localhost:3000';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            Username: username,
            Password: password
        }

        axios.post(`${URL}/login`, data)
            .then(response => {
                return props.onLoggedIn(response.data);
            })
            .catch(e => {

                return alert('Invalid username or password. Please try again');
            });
    };
    // https://react-bootstrap.github.io/components/forms/
    // React-bootstrap components form
    return (
        <div className="login-view">
            <Row className="justify-content-center">
                <Col xs={11} sm={8} md={6} className="form-container">
                    <Form.Group>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type='username'
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
                        <Button
                            variant="btn-lg btn-dark btn-block"
                            type="submit" onClick={handleSubmit}>Login
      </Button>
                        <Form.Group controlId='formNewUser'>
                            <Form.Text className='newUsers'>
                                New user? click <span onClick={() => props.onClick()}>Here</span> to
          sign up{' '}
                            </Form.Text>
                        </Form.Group>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
}

LoginView.propTypes = {

    onLoggedIn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired

};