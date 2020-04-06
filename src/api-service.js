import config from './config'

const ApiService = {
    getNotes() {
        return fetch(`${config.API_Endpoint}notes`)
        .then(res => {
            return(
            (!res.ok)? res.json().then(e => Promise.reject(e)): res.json()
            )
        })
    },
    getNoteById(noteId) {
        return fetch(`${config.API_Endpoint}notes/${noteId}`)
        .then(res => {
            return(
            (!res.ok)? res.json().then(e => Promise.reject(e)): res.json()
            )
        })
    },
    postNote(note_name, content, folder_id) {
        return fetch(`${config.API_Endpoint}notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                note_name, content, folder_id
            })
        })
    },
    deleteNote(noteId) {
        return fetch(`${config.API_Endpoint}notes/${noteId}`, {
            method: 'DELETE',
        })
    },
    patchNote(noteId, note_name, content, folder_id) {
        return fetch(`${config.API_Endpoint}notes/${noteId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                note_name, content, folder_id
            })
        })
    },
    getFolderss() {
        return fetch(`${config.API_Endpoint}folders`)
        .then(res => {
            return(
            (!res.ok)? res.json().then(e => Promise.reject(e)): res.json()
            )
        })
    },
    getFolderById(folderId) {
        return fetch(`${config.API_Endpoint}folders/${folderId}`)
        .then(res => {
            return(
            (!res.ok)? res.json().then(e => Promise.reject(e)): res.json()
            )
        })
    },
    postFolder(folder_name) {
        return fetch(`${config.API_Endpoint}folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                folder_name
            })
        })
    },
    deleteFolder(folderId) {
        return fetch(`${config.API_Endpoint}folders/${folderId}`, {
            method: 'DELETE',
        })
    },
    patchFolder(folderId, folder_name) {
        return fetch(`${config.API_Endpoint}folders/${folderId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                folder_name
            })
        })
    }
}

export default ApiService