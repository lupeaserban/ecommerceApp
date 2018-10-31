//TO DO: re-write component using <Table />
import React from "react";
import dateFns from "date-fns";
import DatePicker from "./DatePicker";
import "./Calendar.css";

export default class Calendar extends React.Component {
  state = {
    currentDay: new Date()
  };

  renderHeader() {
    return <div />;
  }

  renderDay() {
    const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
    const listItems = hours.map((hours, index) => (
      <li key={index}>
        <b>
          {hours}
          :00
        </b>
      </li>
    ));
    return <ul>{listItems}</ul>;
  }

  nextDay = () => {
    this.setState({
      currentDay: dateFns.addDays(this.state.currentDay, 1)
    });
    this.renderDay();
  };

  prevDay = () => {
    this.setState({
      currentDay: dateFns.subDays(this.state.currentDay, 1)
    });
    this.renderDay();
  };

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDay()}
      </div>
    );
  }
}
