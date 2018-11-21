import React from "react";
import { withRouter } from "react-router";
import Meeting from "components/myComponents/Meeting.jsx";
import Task from "components/myComponents/Task.jsx";
import SimpleDialog from "components/myComponents/Dialog.jsx";
import Milestone from "components/myComponents/Milestone.jsx";

import AddEventModal from "views/Projects/AddEventModal.jsx";
import {
  Button,
  TableCell,
  TableRow,
  Paper,
  Table,
  TableBody,
  Grid
} from "@material-ui/core";
import CardBody from "components/Card/CardBody.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

const eventType = ["TASK", "MEETING", "MILESTONE"];

const styles = {
  paperblock: {
    backgroundColor: "#60d4ee",
    margin: "2%",
    padding: "1%",
    textAlign: "center",
    color: "black",
    width: "20%",
    height: "auto"
  },
  ribbon: {
    width: "auto"
  }
};

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
      open: false,
      selectedValue: "",
      events: [],
      apiEvents: []
    };
  }

  getProject = id => {
    this.req = fetch(
      "https://im-project-manager.appspot.com/api/projects/" + id
    )
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          project: myJson,
          apiEvents: myJson.events
        });
      });
  };

  //display the events coming from the API
  displayApiEvents = () => {
    //loop through the array and identify the type
    //based on the type render a component passing down props
    return (
      <div>
        <ul style={{ listStyle: "none", paddingLeft: "0px" }}>
          {this.state.apiEvents.map((item, i) => {
            if (item.type === "task") {
              return (
                <li key={i}>
                  {" "}
                  <Task
                    name={item.title}
                    priority={item.priority}
                    dueDate={item.dueDate}
                  />
                </li>
              );
            } else if (item.type === "meeting") {
              return (
                <li key={i}>
                  {" "}
                  <Meeting name={item.title} dueDate={item.dueDate} />{" "}
                </li>
              );
            } else if (item.type === "milestone") {
              return (
                <li key={i}>
                  {" "}
                  <Milestone name={item.title} dueDate={item.dueDate} />{" "}
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  };

  getStatus = () => {
    return this.state.client.status === "active";
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.getProject(id);
  }
  displayEvent = () => {
    return (
      <Table>
        <TableBody>
          {this.state.events.map((item, i) => (
            <TableRow key={i}>{item}</TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  addItem = () => {
    this.setState(prevState => {
      let events = [];
      if (prevState.selectedValue === "TASK") {
        this.doPost({
          id: 1,
          type: "task",
          createdById: 1,
          dueDate: "2018-11-05",
          priority: "medium",
          title: "new task",
          pmFeedback: null,
          created_at: null,
          updated_at: null,
          projectId: this.state.project.id,
          statuses: []
        });
        events = prevState.events.concat(<Task />);
      } else if (prevState.selectedValue === "MEETING") {
        this.doPost({
          id: 2,
          type: "meeting",
          createdById: 1,
          dueDate: "2018-11-05",
          priority: "medium",
          title: "new meeting",
          pmFeedback: null,
          created_at: null,
          updated_at: null,
          projectId: this.state.project.id,
          statuses: []
        });
        events = prevState.events.concat(<Meeting />);
      } else if (prevState.selectedValue === "MILESTONE") {
        this.doPost({
          id: 3,
          type: "milestone",
          createdById: 1,
          dueDate: "2018-11-05",
          priority: "medium",
          title: "new task",
          pmFeedback: null,
          created_at: null,
          updated_at: null,
          projectId: this.state.project.id,
          statuses: []
        });
        events = prevState.events.concat(<Milestone />);
      }
      return {
        events,
        counter: prevState.counter + 1
      };
    });
  };

  doPost = event => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(event)
    };

    const request = new Request(
      "https://im-project-manager.appspot.com/api/events",
      options
    );
    const response = fetch(request);
    console.log(request);
    console.log(response);
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
    this.addItem();
  };

  render() {
    if (this.state.project === null) {
      return <div>Loading..</div>;
    } else {
      const { project } = this.state;

      console.log(this.props);
      return (
        <Card>
          <CardHeader>
            <Paper>
              <Grid container>
                <Grid item xs={11}>
                  <Button variant="flat" color="primary" size="small">
                    {project.name}
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <AddEventModal events={project.events} />
                </Grid>
              </Grid>
            </Paper>
          </CardHeader>
          <Table>
            <TableBody>
              <TableRow justify="space-evenly">
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.company.name}</TableCell>
                <TableCell>{project.pm.name}</TableCell>
                <TableCell>{project.pm.company.name}</TableCell>
                <TableCell>{project.startDate}</TableCell>
                <TableCell>{project.endDate}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <SimpleDialog
            events={eventType}
            selectedValue={this.state.selectedValue}
            open={this.state.open}
            onClose={this.handleClose}
          />

          <CardBody>
            <div>{this.displayEvent()}</div>
            <div>{this.displayApiEvents()}</div>
          </CardBody>
        </Card>
      );
    }
  }
}
const Project = withStyles(styles)(ProjectPage);

export default withRouter(Project);
