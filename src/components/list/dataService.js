import Films from './model/Entity/Films';
const getCachedData = (url, cache) => {
    if (cache[url]) {
        return Promise.resolve(cache[url])
    } else {
        return fetchData(url);
    }
}

export const fetchData = url => {
    return new Promise((resolve, reject) => {
        fetch(url).then(response => {
            response.json().then((result) => {
                resolve(result)
            })
        })
    })
}

export const createPromises = (item, cache) => {
    let promises = [];
    if (Array.isArray(item)) {
        promises = item.map(url => getCachedData(url, cache));
    } else {
        promises = [getCachedData(item, cache)]
    }
    return Promise.all(promises);
}

export const rootList = {
    "films": "https://swapi.co/api/films/",
    "people": "https://swapi.co/api/people/",
    "planets": "https://swapi.co/api/planets/",
    "species": "https://swapi.co/api/species/",
    "starships": "https://swapi.co/api/starships/",
    "vehicles": "https://swapi.co/api/vehicles/"
}

