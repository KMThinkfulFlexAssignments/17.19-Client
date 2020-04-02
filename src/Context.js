import React from 'react';

export default React.createContext({
    notes: [],
    addNote: () => {},
    deleteNote: () => {},
    editNote: () => {},
    fodlers: [],
    addFolder: () => {},
    deleteFolder: () => {},
    editFolder: () => {}
})