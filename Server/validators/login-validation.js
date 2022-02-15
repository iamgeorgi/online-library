const loginSchema = {
    username: value => {
        if (!value || typeof value !== 'string') {
            return 'Invalid username!';
        }        
        return null;
    },
    password: value => {
        if (!value || typeof value !== 'string') {
            return 'Invalid password!';
        }        
        return null;
    }
}

export default loginSchema;