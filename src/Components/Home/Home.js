import React, { Component } from 'react';
import styles from './styles.css';

class Home extends Component {
    clickHandler = () => {
        this.props.history.push('/aboutus');
    }

    render() {
        return (
            <div>
                <h1>Front end performance </h1>
                <b>Home Page</b>

                <div onClick={this.clickHandler} className={styles['link-style']}>Click to know more!</div>
            </div>
        )
    }
}

export default Home;