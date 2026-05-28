import { useEffect, useState } from 'react'

const colors = [
  '#ffffff',
  '#ffd6d6',
  '#d6ffd9',
  '#d6e4ff',
  '#fff0d6',
  '#f2d6ff'
]

const NoteModal = ({ onClose, onSave, editingNote }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState('#ffffff')

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content)
      setColor(editingNote.color)
    }
  }, [editingNote])

  const handleSubmit = () => {
    onSave({
      title,
      content,
      color
    })
  }

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder='Write your note...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className='color-picker'>
          {colors.map((clr) => (
            <div
              key={clr}
              className='color-circle'
              style={{ background: clr }}
              onClick={() => setColor(clr)}
            />
          ))}
        </div>

        <div className='modal-actions'>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default NoteModal