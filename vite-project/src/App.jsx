// importing all the requried modules
import React from "react"
import Sidebar from "../components/Sidebar"
import Editor from "../components/Editor"
import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { notesCollection, db } from "../firebase"

// exporting the App function
export default function App() {
  // using the useState hook to set the notes and currentNoteId
  const [notes, setNotes] = React.useState([])

  // using the usestate hook to set the id of the note
  const [currentNoteId, setCurrentNoteId] = React.useState("")
  // using usestate hook to store the temporary notes
  const [tempNoteText, setTempNoteText] = React.useState("")
  // storing the current note
  const currentNote =
    notes.find(note => note.id === currentNoteId)
    || notes[0]

  // using useEffect to update the notes
  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      // Sync up our local notes array with the snapshot data
      const notesArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setNotes(notesArr)
    })
    return unsubscribe
  }, [])

  // sorting the notes
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)

  // using the useEffect to set the currentnote
  React.useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body)
    }
  }, [currentNote])

  // send the current note's text to the database at a delay of 1s
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentNoteId) {
        updateNote(tempNoteText)
      }
    }, 1000)
    return () => clearTimeout(timeout)
  }, [tempNoteText])

  // creating a new note using the async function
  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

  // updating the note
  async function updateNote(text) {
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    )
  }

  // deleting the note
  async function deleteNote(noteId) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
  }

  // returning the data
  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={sortedNotes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                tempNoteText={tempNoteText}
                setTempNoteText={setTempNoteText}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>
      }
    </main>
  )
}