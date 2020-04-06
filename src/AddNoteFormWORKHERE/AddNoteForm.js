import React from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../api-service'

export default class AddNoteForm extends React.Component {
    state = {
        note_name: '',
        content: '',
        folderId: null
    }

    setNoteName = (name) => {
        this.setState({ note_name: name })
    }

    setContent = (content) => {
        this.setState({ content: content })
    }

    render() {
        return (
            <div className='AddNote'>
                <h2>Add a Note</h2>
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
                </form>
            </div>
        )
    }
}