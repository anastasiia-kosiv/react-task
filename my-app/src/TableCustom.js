import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
// import axios from 'axios';
// import logo from './logo.svg';
// import './App.css';

class TableCustom extends Component{
// function TableCustom() {
  // console.log(jsonFile);
  // load();
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }

    this.handleDeleteRow = this.handleDeleteRow.bind(this);

  }

  componentDidMount() {

          fetch('./MOCK_DATA.json', {
            headers : {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
          .then((response) => response.json())
          .then((findresponse)=> {
            this.setState({
              data:findresponse
            })
          })


  }



    handleDeleteRow(i) {
      let rows = [...this.state.data]
          rows.splice(i, 1);
          this.setState({
            data: rows
      })
    }



  render() {
  return (
    <Table responsive striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>IP Address</th>
          <th>Country</th>
          <th>Last activity</th>
          <th>Frequency</th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((x, i) => <tr key={i}>
            <td>{x.first_name}</td>
            <td>{x.last_name}</td>
            <td>{x.email}</td>
            <td>{x.gender}</td>
            <td>{x.ip_address}</td>
            <td>{x.country}</td>
            <td>{x.last_activity}</td>
            <td>{x.frequency}</td>
            <td><a onClick={i => this.handleDeleteRow(x.id)}>Delete Row</a></td>
          </tr>)}

      </tbody>
    </Table>
  );
}
}

export default TableCustom;
