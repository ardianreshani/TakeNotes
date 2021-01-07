import React, { Component } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Sidebar from "./components/SideBar";
import firebase from "./firebase";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }
  render() {
    return (
      <div className="app-container">
        <Sidebar
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
        />

        {
          this.state.selectedNote ?
          <Editor
          selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}
        /> : null
        }
      </div>
    );
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  };
  selectNote = (note, index) =>
    this.setState({ selectedNoteIndex: index, selectedNote: note });
    noteUpdate = (id, noteObj) => {
      firebase.firestore().collection('notes').doc(id).update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
    newNote = async (title) => {
      const note = {
        title: title,
        body: ''
      }
      const newFormDB = await 
      firebase.firestore()
      .collection('notes')
      .add({
        title:note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      const newId = newFormDB.id;
      await this.setState({
        notes:[...this.state.notes, note]
      })
      const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newId)[0])
      this.setState({
        selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex
      })
    }
    deleteNote = async (note) => {
      const noteIndex = this.state.notes.indexOf(note);
      await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
      if(this.state.selectedNoteIndex === noteIndex) {
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      } else {
        this.state.notes.length > 1 ?
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) :
        this.setState({ selectedNoteIndex: null, selectedNote: null });
      }
  
      firebase
        .firestore()
        .collection('notes')
        .doc(note.id)
        .delete();
    }
}
