import { createSlice } from "@reduxjs/toolkit";

const notesKeyLS = 'notesKeyLS'

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const initialState = {
    blocks: JSON.parse(localStorage.getItem(notesKeyLS) ?? '[]')
    // blocks: [
    //     { id: 1, title: 'Personal Notes', notes: [] },
    //     { id: 2, title: 'Work Notes', notes: []},
    // ]
}

const notesSlice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {
        addNote: (state, action) => {
            const { blockId, noteContent } = action.payload;
            const block = state.blocks.find((block) => block.id === blockId)
            if (block) {
                block.notes.push({id: Date.now(), content: noteContent})
                // console.log('new note in block', state.blocks[0].notes.length)
                saveToLocalStorage(notesKeyLS, [...state.blocks])
            }
        },
        updateNote: (state, action) => {
            const { blockId, noteId, newContent } = action.payload;
            const block = state.blocks.find((block) => block.id === blockId)
            if (block) {
                const note = block.notes.find((note) => note.id === noteId)
                if (note) {
                    note.content = newContent;
                }
            }
        },
        removeNote: (state, action) => {
            const { blockId, noteId } = action.payload;
            const block = state.blocks.find((block) => block.id === blockId);
            if (block) {
                block.notes = block.notes.filter((note) => note.id !== noteId)
            }
        },
        addBlock: (state, action) => {
            const newBlock = {
                id: Date.now(),
                title: action.payload,
                notes: []
            }
            state.blocks.push(newBlock)
            // console.log('state.blocks', state.blocks.length)
            saveToLocalStorage(notesKeyLS, [...state.blocks])
        }
    }
})

export const { addNote, addBlock, updateNote, removeNote } = notesSlice.actions

export default notesSlice.reducer