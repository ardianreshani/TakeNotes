import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import sideBarItemStyles from "./SideBarItemStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helper";


class SideBaritem extends Component {
  render() {
    console.log(this.props)
    const {
        classes ,
      note,
      _index,
      selectedNoteIndex,
    } = this.props;
    return (
      <div key={_index}>
        <ListItem className={classes.ListItem}
        selected={selectedNoteIndex === _index}
        alignItems='flex-start'
        >
            <div 
            className={classes.textSection}
            onClick={() => this.selectNote(note, _index)}
            >
            <ListItemText
            primary={note.title}
            secondary={removeHTMLTags(note.body.substring(0,30)) + '...'}
            ></ListItemText>
            </div>
            <DeleteIcon
             onClick={() => this.deleteNote(note)}
             className={classes.deleteIcon}
             ></DeleteIcon>
        </ListItem>
      </div>
    );
  }
  selectNote = (n, i) => {
      this.props.selectNote(n, i);
  }
  deleteNote = (note) => {
      if(window.confirm(`Are you sure you want to delete: ${note.title}`)){   
      this.props.deleteNote(note);
    }
  }
}
export default withStyles(sideBarItemStyles)(SideBaritem);
