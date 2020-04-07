import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddNoteForm from '../AddNoteForm/AddNoteForm';
import AddFolderForm from '../AddFolderForm/AddFolderForm';
import config from '../config';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    handleUpdateAll = () => {
        console.log('handleUpdateAll ran')
        Promise.all([
            fetch(`${config.API_Endpoint}notes`),
            fetch(`${config.API_Endpoint}folders`)
        ])
        .then(([notesRes, foldersRes]) => {
            if (!notesRes.ok)
              return notesRes.json().then(e => Promise.reject(e))
            if (!foldersRes.ok)
              return foldersRes.json().then(e => Promise.reject(e))
    
            return Promise.all([
              notesRes.json(),
              foldersRes.json(),
            ])
          })
          .then(([notes, folders]) => {
            this.setState({ notes, folders })
          })
          .catch(error => {
            console.error({ error })
          })  
    }

    componentDidMount() {
        this.handleUpdateAll()
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                handleUpdateAll={this.handleUpdateAll}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                parseInt(folderId)
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, parseInt(noteId));
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
                <Route
                    exact
                    path='/add-note'
                    render={routeProps => {
                        return <AddNoteForm {...routeProps} handleUpdateAll={this.handleUpdateAll} folders={folders} />;
                    }}
                />
                <Route
                    exact
                    path='/add-folder'
                    render={routeProps => {
                        return <AddFolderForm {...routeProps} handleUpdateAll={this.handleUpdateAll}/>;
                    }}
                />
            </>
        );
    }

    render() {

        return (
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
        );
    }
}

export default App;
