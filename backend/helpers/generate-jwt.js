import jwt from 'jsonwebtoken'

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if(error) {
                console.log(error)
                reject('Token could not be generated')
            } else resolve(token)
        })
    })
}