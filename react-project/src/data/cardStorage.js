const BASE_URL = 'http://localhost:5000/cards';

export async function getCards() {
    return fetch(BASE_URL).then((res) => res.json());
}

export async function getMyCards(token, id) {
    const response = await fetch(BASE_URL + '/getmycards?userId=' + id, {
        method: 'GET',
        headers: {
            token: token,
        },
    });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the your cards');
    }
    const cards = await response.json();

    return cards;
}

export async function getMyCardById(id, token) {
    const response = fetch(BASE_URL + '/getmycardbyid?cardid=' + id, {
        method: 'GET',
        headers: {
            token: token,
        },
    });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the your card');
    }
    const card = await res.json();

    return card;
}

export async function CreateCardDb(formData, token) {
    const response = await fetch(BASE_URL + '/create', {
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

export async function updateCard(formData, token, id) {
    const response = await fetch(BASE_URL + '/updatecard?cardid=' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: token,
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error('An error occurred while fetching the your card');
    }
    const cards = await response.json();

    return cards;
}

export async function deleteCard(id, token) {
    return fetch(BASE_URL + '/deletecard?cardid=' + id, {
        method: 'DELETE',
        headers: {
            token: token,
        },
    });
}
