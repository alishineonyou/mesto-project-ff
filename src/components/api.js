const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
        authorization: 'f9ecad61-7f54-4d90-ad76-4b40caca3a23',
        'Content-Type': 'application/json',
    },
};

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return res.text().then(text => {
        throw new Error(`Ошибка ${res.status}: ${text || res.statusText}`);
    });
};

const sendRequest = async (method, path, body = null) => {
    const requestOptions = {
        method: method,
        headers: apiConfig.headers,
    };
    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(`${apiConfig.baseUrl}${path}`, requestOptions);
        return checkResponse(res);
    } catch (error) {
        console.error(`Ошибка при выполнении запроса ${method} ${path}:`, error);
        throw error;
    }
};

export const getCards = () => sendRequest('GET', '/cards');

export const getProfile = () => sendRequest('GET', '/users/me');

export const editProfile = (name, about) => sendRequest('PATCH', '/users/me', {name, about});

export const postCard = (name, link) => sendRequest('POST', '/cards', {name, link});

export const deleteCard = (cardId) => sendRequest('DELETE', `/cards/${cardId}`);

export const deleteLike = (cardId) => sendRequest('DELETE', `/cards/likes/${cardId}`);

export const addLike = (cardId) => sendRequest('PUT', `/cards/likes/${cardId}`);

export const editProfileImg = (avatar) => sendRequest('PATCH', '/users/me/avatar', {avatar});

