import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map.jsx';

class App extends React.Component{
    render(){
        return <Map/>
    }
}

document.addEventListener('DOMContentLoaded', function() {

  ReactDOM.render(
    <App/>,
    document.querySelector('#app'));
});
