import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

let colorHsl = ('Math.floor(Math.random() * 360)', '100%', '50%');

const sendRequest = (setData, setLoading, setError) => {

    axios.get('https://type.fit/api/quotes')
        .then(result => {
            setData(result.data)
            console.log(result.data)
            setLoading(false)
        })
        .catch(error => {
            error = error.message
            setError('error')
        })
}

const RandomQuotes = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [color, setColor] = useState(`hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`);

    const [index, setIndex] = useState(Math.floor(Math.random() * 1643));

    const requestQuotes = () => {
        setLoading(true);

        sendRequest(setData, setLoading, setError);
    }

    const change = () => {
        setIndex(Math.floor(Math.random() * 1643))
        setColor(`hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`)
    }

    useEffect(() => {
        requestQuotes()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{ error }</div>
    }

    let currentQuote = data?.[index] ?? {};
    console.log(currentQuote);

    return (
        <div id="quote-box"
            style={ { backgroundColor: color } }
            className='vh-100 d-flex flex-column align-items-center'>
            <Alert variant="success"
                    className="my-auto alert-box container">
                <div className='d-flex flex-column m-3'>
                    <div id="text"
                            style={ { color: color } }>
                        <FontAwesomeIcon icon={ faQuoteLeft } 
                            className='pe-3'/>
                        {currentQuote?.text}</div>
                    <div id="author" 
                            className='align-self-end'
                            style={ { color: color } }>
                        {currentQuote?.author}
                    </div>
                    <hr />
                </div>
                
                <div className='d-flex justify-content-between m-3'>
                    <div className='d-flex'>
                        <Button as="a" id="tweet-quote"
                                href="https://twitter.com/intent/tweet"
                                target="_blank"
                                className="mx-2"
                                style={ { backgroundColor: color } }>
                            <FontAwesomeIcon icon={ faTwitter } />
                        </Button>
                        <Button className="mx-2"
                                href="https://tumblr.com/"
                                style={ { backgroundColor: color } }>
                            <FontAwesomeIcon icon={ faTumblr } />
                        </Button>
                    </div>

                    <div className='d-flex'>
                        <Button id="new-quote"
                            variant={'success'}
                            onClick={change} 
                            style={ { backgroundColor: color } }>
                            New qoute
                        </Button>
                    </div>
                </div>

            </Alert>
        </div>
    )
}
export default RandomQuotes;