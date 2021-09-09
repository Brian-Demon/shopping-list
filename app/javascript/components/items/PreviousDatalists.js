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
        <Datalist key="name" data_key="name" data={this.props.previousItemData.names} />
        <Datalist key="person" data_key="person" data={this.props.previousItemData.people} />
        <Datalist key="location" data_key="location" data={this.props.previousItemData.locations} />
      </React.Fragment>
    );
  }
}

export default PreviousDatalists
