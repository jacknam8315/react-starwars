import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

const buttonWrapperStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
}

const getLinks = (pages, current, handleClick, showLoader) => {
    const listWrapper = {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
    };
    let links = pages.map((page) => {
        const color = (page.index === current && !showLoader) ? "primary" : "default";
        return <Button key={page.link} color={color} size="small" variant="contained" onClick={() => handleClick(null, page.link)}>{page.index}</Button>
    })
    return (
        <div style={listWrapper}>
            {links}
        </div>
    )
}

const ListFooter = ({ showLoader, handleClick, pagination }) => {
    return (
        <div>
            { pagination &&
                <div style={buttonWrapperStyle}>
                    <div style={{ width: '100%' }}>{pagination.next && <Button variant="contained" color="primary" onClick={() => { handleClick(null, pagination.next) }}>{pagination.range}</Button>}</div>
                    {pagination.pages && pagination.pages.length && getLinks(pagination.pages, pagination.current ,handleClick, showLoader)}
                    <div style={{ width: '100%', textAlign: 'right' }}>{pagination.previous && <Button variant="contained" color="primary" onClick={() => { handleClick(null, pagination.previous) }}>Show Previous 10 results</Button>}</div>
                </div>
            }
        </div>
    );
}

export default ListFooter;