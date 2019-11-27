const jwt = require('jsonwebtoken')

// use environment variable primarily to set key, the other key is for testing only
const jwtKey = process.env.JWTKEY || 'rGIX7EYIt4cE/Shj94RLNh8v3kE33sodCIdiT0b0VwQp4KA/rpCfTPne2EQiu1npeHS4vZhFwtPqRZ0WHcNBDw=='
const jwtExpirySeconds = 3600;

const create = sub => {
    const token = jwt.sign(
        { sub },
        jwtKey,
        {
            algorithm: 'HS256',
            expiresIn: jwtExpirySeconds
        }
    )
    console.log('token:', token);
    return token;
}

const verify = token => {
    try {
        // Parse the JWT string and store the result in `payload`.
        // Note that we are passing the key in this method as well. This method will throw an error
        // if the token is invalid (if it has expired according to the expiry time we set on sign in),
        // or if the signature does not match
        const payload = jwt.verify(token, jwtKey)
        return payload;
    } catch (e) {
        console.log("Verification failed");
        return;
    }

}

module.exports = { create, verify };