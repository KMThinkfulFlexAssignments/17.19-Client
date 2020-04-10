import React from 'react'
import './AddFolderForm.css'

export default class AddFolderForm extends React.Component {
    state = {
        folder_name: '',
    }

    setFolderName = (name) => {
        this.setState({ folder_name: name })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let name = this.state.folder_name
        if (name.length === 0) {
            alert("Please enter a Folder name")
        } else {
            this.props.handlePostFolder(this.state.folder_name)
        }
    }

    render() {
        return (
            <div className='AddFolder'>
                <h2 className='FormHeader'>Add a Folder</h2>
                <form className='AddFolderForm'>
                    <label htmlFor="folder-name">
                        Folder name
                    </label>
                    <input
                        type="text"
                        placeholder="example folder name"
                        name="folder-name"
                        id="folder-name"
                        onChange={event => {
                            this.setFolderName(event.target.value)
                        }}
                    />
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