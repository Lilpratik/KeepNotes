import PushPinIcon from '@mui/icons-material/PushPin'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { motion } from 'framer-motion'

const NoteCard = ({ note, onDelete, onEdit, onPin }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='note-card'
      style={{ background: note.color }}
    >
      <div className='note-top'>
        <h3>{note.title}</h3>

        <button onClick={() => onPin(note._id)}>
          <PushPinIcon
            style={{
              color: note.isPinned ? '#ff9800' : '#999'
            }}
          />
        </button>
      </div>

      <p>{note.content}</p>

      <div className='note-actions'>
        <button onClick={() => onEdit(note)}>
          <EditIcon />
        </button>

        <button onClick={() => onDelete(note._id)}>
          <DeleteIcon />
        </button>
      </div>
    </motion.div>
  )
}

export default NoteCard