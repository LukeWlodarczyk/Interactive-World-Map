import React from 'react';
import ReactSVG from 'react-svg';
import Information from './Information.jsx';

class Map extends React.Component{

    constructor(props){
        super(props);
        this.state={
          name: '',
          id: '',
          render: false
        }

    }

    handleNameChange = event =>{

        this.setState({
            name: event.target.value.toLowerCase(),
            render: false
        })

    }

    handleBtnClick = event =>{

        event.preventDefault()

        const path=document.querySelector(`path[title="${this.state.name}"]`);

        if(path !== null){
          const pathId=path.id;
          path.classList.add('colorFill');
          event.target.classList.remove('error');
          this.setState({
              id: pathId,
              render: true
          })
        } else {
          event.target.classList.add('error');
        }


    }

   handleClearBtn = event => {
    event.preventDefault();
    if (this.state.id.length !== 0){
      const pathColor=document.querySelector(`path[id=${this.state.id}]`);
      pathColor.classList.remove('colorFill');
    }


  }

    renamePathIdTitle() {
        const paths = document.querySelectorAll('path');
        paths.forEach( path => {
            path.setAttribute('id', path.getAttribute('id').toLowerCase());
            path.setAttribute('title', path.getAttribute('title').toLowerCase());
        })

        if (this.state.id){
            console.log (this.state.id);
            const path = document.querySelector(`path#${this.state.id}`);
            path.classList.add('colorFill');
        }

    }

    handleMapClick = event => {
        event.preventDefault();

        const countryName = event.target.getAttribute('title');

        if(countryName !== null) {
          const path = document.querySelector(`path[title="${countryName}"]`);
          path.classList.add('colorFill');
          this.setState({
              id: path.id,
              render: true,
          });
        }
    };


    render(){


        return <div className = 'container'>
                  <form className='form'>
                    <input
                      className='findCountry'
                      type='text'
                      placeholder='Type in country name'
                      value={this.state.name}
                      onChange={this.handleNameChange}
                    />
                    <button className='button' onClick={this.handleBtnClick} type='submit' value='Submit'>
                      Find country
                    </button>
                    <button className='button' onClick={this.handleClearBtn}>Clear map</button>
                  </form>
                  <div className='map' onClick={this.handleMapClick}>
                    <ReactSVG
                      path="./src/world-map/worldHigh.svg"
                      callback={svg => this.renamePathIdTitle()}
                      className="svg"
                    />
                  </div>
                  {this.state.render && <Information id={this.state.id}/>}
                </div>
    }
}

module.exports = Map
