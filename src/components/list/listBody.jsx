import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isUrl, getValue } from './helper';

const styles = {
    root: {
        background: '#d1e1e6',
        padding: "6px",
        marginBottom: "5px",
    },
}

const ListBody = ({ showLoader, selectedList, handleClick, classes, pagination }) => {
    let displayFields = selectedList.displayFields ? selectedList.displayFields() : selectedList;
    return (
        <div style={{ minHeight:'400px', padding: "10px" }}>
            {showLoader && <CircularProgress />}
            {!showLoader && <List>
                {
                    Object.keys(displayFields).reduce((acc, nextKey) => {
                        const value = displayFields[nextKey];
                        const shouldBindClick = isUrl(nextKey, value);
                        const classNames = shouldBindClick ? { root: classes.root } : {};
                        acc.push(
                            <ListItem
                                classes={classNames}
                                key={nextKey}
                                button={shouldBindClick}
                                onClick={() => { shouldBindClick && handleClick(nextKey, value) }}>
                                <ListItemText primary={_.startCase(_.toLower(nextKey))} />
                                <ListItemText style={{textAlign:'right'}}>{getValue(value)}</ListItemText>
                            </ListItem>
                        );
                        return acc;
                    }, [])
                }
            </List>}
        </div >
    )
}

export default withStyles(styles)(ListBody);