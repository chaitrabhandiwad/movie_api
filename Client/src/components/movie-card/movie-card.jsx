import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { StarButton } from '../star-button/star-button';
import { Link } from "react-router-dom";

const MAX_CHARS_IN_A_DESCRIPTION = 100;

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        let movieDescription = movie.Description;
        if (movieDescription.length > MAX_CHARS_IN_A_DESCRIPTION) {
            movieDescription = `${movieDescription.substring(0, MAX_CHARS_IN_A_DESCRIPTION)}...`;
        }
        return (
            <Card style={{ minWidth: '12rem' }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{movie.Genre.Name}</Card.Subtitle>
                    <Card.Text>{movieDescription}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button className="outline-primary" variant="info">Open</Button>
                    </Link>
                </Card.Body>
            </Card >
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        ImagePath: PropTypes.string,
        Genre: PropTypes.exact({
            _id: PropTypes.string,
            Name: PropTypes.string,
            Description: PropTypes.string
        })
    }).isRequired,
};