import React from 'react';
import './PrivateContainer.css';
import Navigation from './Navigation/Navigation.js';

const PrivateContainer = (props) => {
    return (
        <div className="main">
            <main>
                <Navigation />
                {props.children}
            </main>
        </div>
    );
};

export default PrivateContainer;