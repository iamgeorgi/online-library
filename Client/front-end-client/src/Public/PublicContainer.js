import React from 'react';
import Header from './Header/Header.js'

const PublicContainer = (props) => {

    return (
        <>
            <Header />
            {props.children}
        </>
    );
}

export default PublicContainer;