import React from "react"
import PropTypes from "prop-types"

const Datalist = (props) => {
  return (
    <datalist id={"item_"+props.data_key+"_datalist_options"}>
    {props.data.map((value) => (
      <option key={value}>{value}</option>
    ))}
  </datalist>
  );
};

class PreviousDatalists extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Datalist key="name" data_key="name" data={this.props.previous_item_data.names} />
        <Datalist key="person" data_key="person" data={this.props.previous_item_data.people} />
        <Datalist key="department" data_key="department" data={this.props.previous_item_data.departments} />
      </React.Fragment>
    );
  }
}

export default PreviousDatalists
