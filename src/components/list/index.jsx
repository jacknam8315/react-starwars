import React, { Component } from 'react';
import { fetchData, rootList, createPromises } from './dataService';
import { updateList, getPagination } from './helper';
import List from './listBody';
import ListHeader from './listHeader';
import ListFooter from './listFooter';
import Fade from '@material-ui/core/Fade';
import '../../App.css';
import { isEntity } from './model/Entity';

class SearchColumn extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.deleteChip = this.deleteChip.bind(this);
        this.cache = {};
        this.state = {
            selectedList: rootList,
            selectedItems: [],
            pagination: null,
            showLoader: false,
        }
    }

    handleClick(key, item) {
        key && this.setState({ selectedItems: [...this.state.selectedItems, { name: key, url: item }] })
        this.showLoader(createPromises(item, this.cache), result => {
            this.updateSelectedList(result, item)
        })
    }

    updateSelectedList(result, item) {
        let [list, page] = updateList(result, item, this.cache);
        this.setState({
            selectedList: list,
            pagination: !isEntity(list) ? getPagination(page, item, this.cache) : null,
        })
    }

    showLoader(promise, callback) {
        this.setState({
            showLoader: true,
        });
        promise.then(result => {
            callback(result);
            setTimeout(() => {
                this.setState({
                    showLoader: false,
                });
            }, 300)
        })
    }

    deleteChip(item, index) {
        const length = this.state.selectedItems.length;
        let remaning = this.state.selectedItems.splice(0, length === 1 ? index : index + 1);
        if (!remaning.length) {
            this.setState({
                selectedList: rootList,
                selectedItems: [],
                pagination: null,
            })
        } else {
            const { url } = remaning[remaning.length - 1];
            this.setState({
                selectedItems: remaning
            })
            this.showLoader(createPromises(url, this.cache), result => {
                this.updateSelectedList(result, item)
            })
        }
    }

    render() {
        return (
            <div>
                <ListHeader
                    deleteChip={this.deleteChip}
                    selectedItems={this.state.selectedItems} />
                <List
                    showLoader={this.state.showLoader}
                    selectedList={this.state.selectedList}
                    handleClick={this.handleClick}
                />
                <ListFooter
                    showLoader={this.state.showLoader}
                    handleClick={this.handleClick}
                    pagination={this.state.pagination} />
            </div>
        );
    }
}

export default SearchColumn;