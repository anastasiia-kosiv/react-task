import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import FaTrash from 'react-icons/lib/fa/trash';
import FaEdit from 'react-icons/lib/fa/edit';
// import axios from 'axios';
// import logo from './logo.svg';
import './TableCustom.css';

class TableCustom extends Component{
  constructor(props){
    super(props);
    this.state = {
      data:[]
    }

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

  deleteRow(index) {
      var data = [...this.state.data];
      // console.log(data.splice(index, 1));
      data.splice(index, 1);
      this.setState({data});
  }

  render() {

    let lastCell = 'last-cell-style';
    let iconStyles = 'menu';
      // if (this.props.mouseOver) {
      //   iconStyles += ' menu-active';
      // }


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
          <th> - </th>
        </tr>
      </thead>
      <tbody>
        {this.state.data.map((x, i) => <tr className={lastCell} key={i}>
            <td>{x.first_name}</td>
            <td>{x.last_name}</td>
            <td>{x.email}</td>
            <td>{x.gender}</td>
            <td>{x.ip_address}</td>
            <td>{x.country}</td>
            <td>{x.last_activity}</td>
            <td>{x.frequency}</td>
            <td>
              <a className={iconStyles} onClick ={index => this.deleteRow(i)}><FaTrash /></a>
              <a className={iconStyles}><FaEdit /></a>
            </td>
          </tr>)}

      </tbody>
    </Table>
  );
}
}

export default TableCustom;
