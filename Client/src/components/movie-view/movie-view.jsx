import React from 'react';
import { MainView } from '../main-view/main-view';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';

import { Link } from 'react-router-dom';

import Axios from 'axios';

export class MovieView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <div className='movie-view'>
                <div className='movie-title'>
                    <h4 className='label'>Title</h4>
                    <p className='value'>{movie.Title}</p>
                </div>

                <div className='movie-description'>
                    <h4 className='label'>Description</h4>
                    <p className='value'>{movie.Description}</p>
                </div>

                <img className='movie-poster' src={movie.ImagePath} />

                <div className='movie-genre'>
                    <h4 className='label'>Genre</h4>
                    <p className='value'>{movie.Genre.Name}</p>
                </div>
                <div className='movie-director'>
                    <h4 className='label'>Director</h4>
                    <p className='value'>{movie.Director.Name}</p>
                </div>
                <button onClick={() => onClick()}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};