import React from 'react'
import './AddNoteForm.css'

export default class AddNoteForm extends React.Component {
    state = {
        note_name: '',
        content: '',
        folderId: 1
    }

    setNoteName = (name) => {
        this.setState({ note_name: name })
    }

    setContent = (content) => {
        this.setState({ content: content })
    }

    setFolderId = (folderId) => {
        this.setState({ folderId: folderId })
    }

    setFolderOptions = () => {
        return this.props.folders.map(folder => {
            return <option key={folder.id} value={folder.id}>{folder.folder_name}</option>
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let name = this.state.note_name
        let text = this.state.content
        if (name.length === 0 || text.length === 0) {
            alert("Please enter a Name and some Content for your note")
        } else {
            this.props.handlePostNote(this.state.note_name, this.state.content, this.state.folderId)  
        }
    }

    render() {
        return (
            <div className='AddNote'>
                <h2 className='FormHeader'>Add a Note</h2>
                <form className='AddNoteForm'>
                    <label htmlFor="note-name">
                        Note name
                    </label>
                    <input
                        type="text"
                        placeholder="example note name"
                        name="note-name"
                        id="note-name"
                        onChange={event => {
                            this.setNoteName(event.target.value)
                        }}
                    />
                    <label htmlFor="note-content">
                        Content
                    </label>
                    <input
                        type="text"
                        placeholder="something you want to take note of"
                        name="note-content"
                        id="note-content"
                        onChange={event => {
                            this.setContent(event.target.value)
                        }}
                    />
                    <label htmlFor="note-folder">
                        Folder
                    </label>
                    <select name="note-folder" id="note-folder" onChange={event => {
                        this.setFolderId(event.target.value)
                    }}>
                        {this.setFolderOptions()}
                    </select>
                    <button
                        className="submit"
                        onClick={this.handleSubmit}
                    >
                    Submit
                    </button>
                </form>
            </div>
        )
    }
}