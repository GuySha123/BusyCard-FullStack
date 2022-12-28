const BASE_URL = 'http://localhost:5000';

export async function signinUser(email, password) {
    const response = await fetch(BASE_URL + '/customers/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the user');
    }
    const user = await response.json();
    console.log('Logged In');
    return user;
}

export async function getUserByToken(token) {
    const response = await fetch(BASE_URL + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            token,
        },
    });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the user');
    }
    const user = await response.json();
    return user;
}

export async function registerUser(formData) {
    const response = await fetch(BASE_URL + '/customers/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the user');
    }
    const user = await response.json();
    console.log(user);
}

export async function getUsers() {
    return fetch(BASE_URL + '/customers').then((res) => res.json());
}

export async function deleteUser(id) {
    return fetch(BASE_URL + '/customers/deletecustomer?userid=' + id, {
        method: 'delete',
    });
}

export async function getCards() {
    return fetch(BASE_URL + '/cards').then((res) => res.json());
}

export async function CreateCardDb(formData, token) {
    const response = await fetch(BASE_URL + '/cards/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the user');
    }
    const card = await response.json();
    console.log(card);
}
