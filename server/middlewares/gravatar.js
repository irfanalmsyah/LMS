const md5 = require('md5')

const gravatar = email => {
    const hash = md5(email)
    return `https://gravatar.com/avatar/${hash}?d=retro`
}

module.exports = gravatar