import React from 'react'

class Information extends React.Component{
  constructor(props){
    super(props);
    this.state={
        name:'',
        capital:'',
        flag:'',
        id: '',
        capital: '',
        region: '',
        subregion: '',
        borders: '',
        language: '',
        currencies: '',
        population: '',
    }

  }



  componentDidMount(){
      this.getInfo(this.props.id);
  }


  componentWillReceiveProps(nextProps) {
      if(this.state.id !== nextProps.id) {
        this.getInfo(nextProps.id);
      }
  }


  getInfo = name => {
    const baseUrl = 'https://restcountries.eu/rest/v2/alpha/' + name.toLowerCase();
    fetch(baseUrl)
    .then(data => {
      if (data.ok) {
        return data.json();
      } else {
        throw new Error('Error getting data');
      }
    }).then(data => {
      this.setState({
        name: data.name,
        flag: data.flag,
        capital: data.capital,
        id: this.props.id,
        region: data.region,
        subregion: data.subregion,
        borders: data.borders.join(', '),
        language: data.languages[0].name,
        currencies: data.currencies[0].name,
        population: data.population,
      })
    }).catch(error => {
      console.log(error);
    });
  }


  render(){

      return <table className='information'>
                    <thead>
                        <tr>
                            <th colSpan={4}>{this.state.name}</th>
                            <th colSpan={3}><img className='flag' src={this.state.flag} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Capital</th>
                            <th>Official language</th>
                            <th>Population</th>
                            <th>Currency</th>
                            <th>Region</th>
                            <th>Subregion</th>
                            <th>Borders</th>
                        </tr>
                        <tr>
                            <td>{this.state.capital}</td>
                            <td>{this.state.language}</td>
                            <td>{this.state.population}</td>
                            <td>{this.state.currencies}</td>
                            <td>{this.state.region}</td>
                            <td>{this.state.subregion}</td>
                            <td>{this.state.borders}</td>
                        </tr>
                    </tbody>
                </table>
  }

}

module.exports = Information;
