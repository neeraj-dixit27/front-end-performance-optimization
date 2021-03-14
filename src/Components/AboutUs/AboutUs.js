import React, { Component } from 'react';
import styles from './styles.css';

class AboutUs extends Component {
    render() {
        return (
            <div>
                <h1>Front end performance </h1>
                <b className={styles['aboutus-label']}>About Us Page</b>
            </div>
        )
    }
}

export default AboutUs;