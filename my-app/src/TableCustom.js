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
      selected: {},
      selectAll: 0,
      data:[]
    }

  }


  toggleRow(first_name) {
      const newSelected = Object.assign({}, this.state.selected);
      newSelected[first_name] = !this.state.selected[first_name];
      this.setState({
        selected: newSelected,
        selectAll: 2,
      });
    }



    toggleSelectAll() {
      let newSelected = {};

      if (this.state.selectAll === 0) {
        this.state.data.forEach(x => {
          newSelected[x.first_name] = true;
        });
      }

      this.setState({
        selected: newSelected,
        selectAll: this.state.selectAll === 0 ? 1 : 0,
        style: {
            background: newSelected.index === this.state.selected ? '#00afec' : 'red',
            color: newSelected.index === this.state.selected ? 'red' : 'black'
        }
      });
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

  changeColor = selectedRow => e => {
      if (selectedRow !== undefined) {
        this.setState({ selectedRow  });
      }
    };


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
          <th>

          <label className="container-check">
          <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selectAll === 1}
                ref={input => {
                  if (input) {
                    input.indeterminate = this.state.selectAll === 2;
                  }
                }}
                onChange={() => this.toggleSelectAll()}
              />
           <span className="checkmark"></span>
           </label>
           </th>
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
        {this.state.data.map((x, i) => <tr key={i}  className={[(this.state.selected[x.first_name] === true ? "tableSelected" : "" ), lastCell].join(' ')}>
            <td>
            <label className="container-check">
            <input
                type="checkbox"
                className="checkbox"
                checked={this.state.selected[x.first_name] === true}
                onChange={(() => this.toggleRow(x.first_name))}
                onClick={this.changeColor(i)}
              />
            <span className="checkmark"></span>
            </label>
            </td>
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
