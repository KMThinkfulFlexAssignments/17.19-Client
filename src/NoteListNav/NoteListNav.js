import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'
import ApiService from '../api-service'

//props is coming up as undefined
const handleDeleteFolder = folderId => {
  ApiService.deleteFolder(folderId)
  .then(this.props.handleUpdateAll())
}
export default function NoteListNav(props) {
  return (
    <div className='NoteListNav'>
      <ul className='NoteListNav__list'>
        {props.folders.map(folder =>
          <li className='FolderList' key={folder.id}>
              <span className='NoteListNav__num-notes'>
                {countNotesForFolder(props.notes, folder.id)}
              </span>
              <NavLink
              className='NoteListNav__folder-link'
              to={`/folder/${folder.id}`}
            >
              {folder.folder_name}
            </NavLink>
            <button onClick = {() => handleDeleteFolder(folder.id)} className='Folder__delete' type='button'>
              <FontAwesomeIcon icon='trash-alt' />
              {' '}
              remove
            </button>
          </li>
        )}
      </ul>
      <div className='NoteListNav__button-wrapper'>
        <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton>
      </div>
    </div>
  )
}

NoteListNav.defaultProps = {
  folders: []
}
