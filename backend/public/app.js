function handleCredentialResponse(response) {
    const body = { id_token: response.credential } // Google Token: ID_TOKEN

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
    .then(response => {
        localStorage.setItem('email', response.user.email)
        location.reload()
    })
    .catch(console.warn())
}

const button = document.getElementById('google_signout')
button.onclick = () => {
    google.accounts.id.disableAutoSelect()
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear()
        location.reload()
    })
}