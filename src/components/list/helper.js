import _ from 'lodash';
import { Entity } from './model/Entity';

const getNextPage = str => {
    return (str.indexOf("page=")!==-1 && str.substring(str.indexOf("page=") + 5)) || 1;
}

const getCurrentEntityUrl = item => {
   return item && typeof item === 'string' && item.replace(/\?page=\d+/,'');
}

export const isUrl = (key, value) => {
    if (Array.isArray(value)) return true;
    const reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    return reg.test(value);
}

export const getPagination = (page, item, cache) => {
    let pagination = null;
    let range = null;
    let nextPage = null;
    let pageNum = null;
    let nextNum = null;
    let currentEntityUrl = getCurrentEntityUrl(item)
    let pages = [];
    if (!cache['page']) cache['page'] = {};    
    if (page && (page.next || page.previous)) {
        if (page.next) {
            nextPage = getNextPage(page.next);
            pageNum = (nextPage - 1) * 10;
            nextNum = pageNum + 10;
            nextNum = page.count < nextNum ? page.count - pageNum : 10;
            range = `Show Next ${nextNum} Result`;
        }

        if(currentEntityUrl && page.count > 10){
            for(let i=0;i<Math.ceil(page.count/10);i++){
                pages.push({
                    link: `${currentEntityUrl}?page=${i+1}`,
                    index: i+1,
                })
            }
        }
        pagination = {
            range,
            pages,
            current: Number(getNextPage(item)),
            next: page.next,
            previous: page.previous,
        }
        cache['page'][item] = pagination;
    }

    if (!page) {
        let url = item && item.url;
        if (!Array.isArray(url)) {
            if (url) {
                url = url.replace(/\d+\/?/, '');
                if (cache.page[url]) {
                    pagination = { ...cache.page[url], range: 'Show Next 10 Result' };
                }
            } else {
                if (cache['page'][item]) {
                    pagination = cache['page'][item];
                }
            }
        }
    }
    return pagination;
}

export const getValue = value => {
    if (Array.isArray(value)) {
        if (value.length) {
            return value.length;
        } else {
            return false;
        }
    }
    else if (isUrl(null, value)) return '';
    return value;
}

export const updateList = (result, list, cache) => {
    let page = null;
    if (!cache['page']) cache['page'] = {};    
    const listMap = _.flatMap(result, (item => {
        let name;
        if (item.results) {
            let result = item.results.map(listItem => {
                name = listItem.name || listItem.title;
                cache[listItem.url] = Entity(listItem);
                return { [name]: listItem.url };
            })
            if (item.next || item.previous) {
                page = {
                    next: item.next,
                    previous: item.previous,
                    count: item.count,
                }
                cache['page'][list] = page;
            }
            cache[list] = result;
            return result;
        } else {
            if (result.length === 1) {
                cache[item.url] = item;
                return cache[item.url];
            } else {
                name = item.name || item.title;
                cache[item.url] = item;
                return { [name]: item.url }
            }
        }
    }));
    return [listMap.reduce((acc, next) => {
        const keys = Object.keys(next);
        keys && keys.length && keys.forEach(key => {
            acc[key] = next[key];
        })
        return Entity(acc);
    }, {}), page]
}