// client/src/main-view/main-view.jsx
import React from 'react';
import axios from 'axios';

// views imports
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
import { RouterLink } from 'react-router-dom';
import { LoginView } from '../Login-view/Login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateView } from '../profile-view/update-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// react-bootstrap imports
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './main-view.scss';


export class MainView extends React.Component {

    constructor() {
        //Call the superclass constructor
        // so React can initialize it
        super();

        // Initialize the state to an empty object so we can destructure it later

        this.state = {
            movie: [],
            selectedMovie: [],
            users: [],
            newUser: false
        };
    }

    getMovies(token) {
        axios.get('http://localhost:3000/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getAllUsers(token) {

        axios.get('http://localhost:3000/users', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    users: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //One fot the "hooks" available in a react component

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);

        }

    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    handleRegistration() {

        this.setState({
            newUser: true
        });
    }

    alreadyRegistered() {
        this.setState({
            newUser: false
        });
    }

    handleLogout() {

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {
        // If the state isn't initialized, this will throw on runtime
        // before the data is initially loaded
        const { movies, user, newUser } = this.state;

        if (!user && newUser === false)
            return (
                <LoginView
                    onClick={() => this.handleRegistration()}
                    onLoggedIn={user => this.onLoggedIn(user)}
                />
            );

        if (newUser)
            return (
                <RegistrationView
                    onClick={() => this.alreadyRegistered()}
                    onLoggedIn={user => this.onLoggedIn(user)}
                />
            );

        // Before the movies have been loaded //change the class to avoid confusion
        // if (!movies) return <div className='main-view' />;

        if (!movies) return <div className='main-view' />;

        return (

            <Router>
                <div className="main-view">
                    <Navbar sticky="top" bg="light" expand="lg" className="mb-3 shadow-sm p-3 mb-5">
                        <Navbar.Brand href="http://localhost:1234/" className="navbar-brand">myFlix</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                            <Button variant="outline-secondary mr-1" className="profile-button" onClick={() => { return <ProfileView /> }}>{user}'s Profile</Button>
                            <Button variant="outline-primary ml-1" className="logout-button" onClick={() => this.handleLogout()}>Log out</Button>
                        </Navbar.Collapse>
                    </Navbar>

                    <Container className="container-fluid">
                        <Row>
                            <Route exact path="/" render={() => {
                                if (!user && !newUser) return <LoginView onClick={() => this.handleRegistration()} onLoggedIn={user => this.onLoggedIn(user)} />;
                                return movies.map(m =>
                                    <Col key={m._id} xs={12} sm={6} md={4} lg={3} className="card-margin">
                                        <MovieCard key={m._id} movie={m} />
                                    </Col>)
                            }} />

                            <Route path="/register" render={() => <RegistrationView />} />
                            <Route path="/movies/:movieId" render={({ match }) =>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                            <Route exact path="/genres/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                            }
                            } />
                            <Route exact path="/directors/:name" render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                            }
                            } />
                            <Route exact path="/users/:Username" render={() => <ProfileView />} />
                            <Route exact path="/update/:Username" render={() => <UpdateView user={users.find(user => user.Username === match.params.Username)} />} />
                        </Row>
                    </Container>
                </div>
            </Router>
        );
    }
}