import { useEffect, useState } from 'react'
import API from '../api/axios'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import NoteModal from '../components/NoteModal'
import AddIcon from '@mui/icons-material/Add'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  const fetchNotes = async () => {
    try {
      const { data } = await API.get('notes')

      setNotes(data)
    } catch (error) {
      toast.error('Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const createNote = async (noteData) => {
    try {
      const { data } = await API.post('notes', noteData)

      setNotes([data, ...notes])

      toast.success('Note created')

      setOpenModal(false)
    } catch (error) {
      toast.error('Failed to create note')
    }
  }

  const updateNote = async (noteData) => {
    try {
      const { data } = await API.put(
        `notes/${editingNote._id}`,
        noteData
      )

      setNotes(
        notes.map((note) =>
          note._id === data._id ? data : note
        )
      )

      toast.success('Note updated')

      setEditingNote(null)
      setOpenModal(false)
    } catch (error) {
      toast.error('Failed to update note')
    }
  }

  const deleteNote = async (id) => {
    try {
      await API.delete(`notes/${id}`)

      setNotes(
        notes.filter((note) => note._id !== id)
      )

      toast.success('Note deleted')
    } catch (error) {
      toast.error('Delete failed')
    }
  }

  const togglePin = async (id) => {
    try {
      const { data } = await API.patch(`notes/${id}`)

      setNotes(
        notes.map((note) =>
          note._id === data._id ? data : note
        )
      )
    } catch (error) {
      toast.error('Failed to pin note')
    }
  }

  return (
    <div>
      <Navbar />

      <div className='dashboard'>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div className='notes-grid'>
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={deleteNote}
                onEdit={(note) => {
                  setEditingNote(note)
                  setOpenModal(true)
                }}
                onPin={togglePin}
              />
            ))}
          </div>
        )}
      </div>

      <button
        className='floating-btn'
        onClick={() => {
          setEditingNote(null)
          setOpenModal(true)
        }}
      >
        <AddIcon />
      </button>

      {openModal && (
        <NoteModal
          editingNote={editingNote}
          onClose={() => setOpenModal(false)}
          onSave={
            editingNote
              ? updateNote
              : createNote
          }
        />
      )}
    </div>
  )
}

export default Dashboard