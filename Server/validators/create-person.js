const createPersonSchema = {
    username: value => {
        if (!value) {
            return 'Name is required';
        }        
        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return 'Name should be a string in range [3..25]';
        }
        return null;
    },
    password: value => {
        if (!value) {
            return 'Password is required';
        }        
        if (typeof value !== 'string' || value.length < 3 || value.length > 25) {
            return 'Password should be a string in range [3..25]';
        }
        return null;
    }
}

export default createPersonSchema;