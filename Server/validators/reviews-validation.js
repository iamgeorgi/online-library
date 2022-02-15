const reviewsValidation = {
    text: value => {
        if (!value) {
            return 'Text is required';
        }        
        if (typeof value !== 'string' || value.length < 3 || value.length > 200) {
            return 'Text should be a string in range [3-200]';
        }
        return null;
    },
    user: value => {
        if (!value) {
            return 'User is required';
        }        
        if (typeof value !== 'string') {
            return 'User Id should be a string';
        }
        return null;
    }
}

export default reviewsValidation;