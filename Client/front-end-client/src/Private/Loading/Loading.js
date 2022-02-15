import React from 'react';
import LoadingAnimation from '../../media/Infinity-1s-200px.svg';

const Loading = () => {
    return (
        <img src={LoadingAnimation} style={{ borderRadius: 100, marginLeft: 400 }} alt="Loading" />
    );
}

export default Loading;