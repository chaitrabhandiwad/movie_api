import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './login-view.scss';
import Carousel from 'react-bootstrap/Carousel'

const URL = 'http://localhost:3000';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
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
            <Carousel classname="col-md-8">
                <Carousel.Item>
                    <Container className="container login-container border border-light shadow p-3 mb-5 rounded py-3 px-3">
                        <h3 className="pb-2">Log in to myFlix</h3>
                        <Form className="login-form">
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" required value={username} onChange={e => setUsername(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" required value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Row className="justify-content-end">
                                <Button className="login-button mr-3 ml-3" variant="primary" type="submit" block onClick={handleLogin}>Login</Button>
                            </Row>
                        </Form>
                    </Container>
                    <Container className="mt-4">
                        <Row className="d-flex align-items-center justify-content-center">
                            <span>Don't have an account?</span>
                            <Link to={`/register`}>
                                <Button variant="link" className="sign-up-link btn-lg" type="submit">Sign up</Button>
                            </Link>

                        </Row>
                    </Container>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.wallpaperup.com/uploads/wallpapers/2015/12/12/859126/5b431ce5733d1553d3b7bf0efc11412e-1000.jpg"
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://www.wallpapers13.com/wp-content/uploads/2017/03/Avengers-Tony-Stark-Iron-Man-Movie-HD-Wallpaper-2880x1800-915x515.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div >
    );
}

LoginView.propTypes = {

    onLoggedIn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired

};