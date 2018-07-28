import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import List from './components/list';

const wrapperStyle = {
  marginTop:"100px",
}

class App extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid style={wrapperStyle} item xs={10}>
           <List/>
        </Grid>
      </Grid>
    );
  }
}

export default App;
