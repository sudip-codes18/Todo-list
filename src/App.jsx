import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'todo-list-v1'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'done', label: 'Done' },
]


export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('all')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState('')

  const inputRef = useRef(null)
  const editRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (editingId && editRef.current) {
      editRef.current.focus()
      editRef.current.select()
    }
  }, [editingId])

  function handleAdd(e) {
    e.preventDefault()
    const value = draft.trim()
    if (!value) return
    setTodos([
      { id: crypto.randomUUID(), text: value, done: false, createdAt: Date.now() },
      ...todos,
    ])
    setDraft('')
    inputRef.current?.focus()
  }

  function toggle(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  function beginEdit(todo) {
    setEditingId(todo.id)
    setEditDraft(todo.text)
  }

  function commitEdit() {
    const value = editDraft.trim()
    if (!value) {
      setEditingId(null)
      return
    }
    setTodos(todos.map((t) => (t.id === editingId ? { ...t, text: value } : t)))
    setEditingId(null)
  }

  function handleEditKey(e) {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') setEditingId(null)
  }

  function clearDone() {
    setTodos(todos.filter((t) => !t.done))
  }

  const visible = todos.filter((t) => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    return true
  })

  const left = todos.filter((t) => !t.done).length
  const doneCount = todos.length - left

  return (
    <div className="min-h-screen bg-[#f3efe7] px-4 py-10 text-[#3b382f] sm:py-16">
      <div className="mx-auto w-full max-w-xl">

        <header className="mb-6 px-1">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a49c8a]">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#2f2c25]">
            Today
          </h1>
        </header>

        <div className="overflow-hidden rounded-2xl border border-[#e6dfd0] bg-[#fdfbf6] shadow-[0_1px_2px_rgba(60,50,30,0.04),0_12px_32px_-12px_rgba(60,50,30,0.12)]">

          <form onSubmit={handleAdd} className="flex items-center gap-2 border-b border-[#ece5d7] p-3">
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add a task..."
              className="flex-1 rounded-xl bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-[#b3ab99]"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Add task"
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#c96f4a] text-white transition hover:bg-[#b65f3c] active:scale-95 disabled:cursor-not-allowed disabled:bg-[#e2d9c8] disabled:text-[#b3ab99]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </form>

          <div className="flex items-center justify-between border-b border-[#ece5d7] px-3 py-2">
            <div className="flex gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={
                    'cursor-pointer rounded-lg px-3 py-1.5 text-sm transition ' +
                    (filter === f.id
                      ? 'bg-[#efe7d6] font-medium text-[#5a5344]'
                      : 'text-[#a49c8a] hover:bg-[#f5efe1] hover:text-[#7a7261]')
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="pr-1 text-xs text-[#b3ab99]">{left} left</span>
          </div>

          <ul className="divide-y divide-[#f1ebdd]">
            {visible.length === 0 && (
              <li className="px-6 py-14 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3ecdc] text-[#c9bda0]">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </div>
                <p className="text-sm text-[#a49c8a]">
                  {filter === 'done'
                    ? 'Nothing done yet.'
                    : filter === 'active'
                    ? 'All caught up.'
                    : 'Your list is empty.'}
                </p>
              </li>
            )}

            {visible.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 px-3 py-2 transition hover:bg-[#f8f3e8]"
              >
                <button
                  onClick={() => toggle(todo.id)}
                  aria-label={todo.done ? 'Mark as not done' : 'Mark as done'}
                  className={
                    'flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition active:scale-90 ' +
                    (todo.done
                      ? 'border-[#7c9a7a] bg-[#7c9a7a] text-white'
                      : 'border-[#d8d0bd] text-transparent hover:border-[#7c9a7a]')
                  }
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </button>

                {editingId === todo.id ? (
                  <input
                    ref={editRef}
                    value={editDraft}
                    onChange={(e) => setEditDraft(e.target.value)}
                    onBlur={commitEdit}
                    onKeyDown={handleEditKey}
                    className="flex-1 rounded-lg bg-[#f1ebdd] px-2.5 py-1.5 text-[15px] outline-none ring-1 ring-[#d8cfb8]"
                  />
                ) : (
                  <span
                    onDoubleClick={() => beginEdit(todo)}
                    title="Double-click to edit"
                    className={
                      'flex-1 select-none truncate py-1 text-[15px] transition ' +
                      (todo.done
                        ? 'text-[#b3ab99] line-through decoration-[#c9c0aa]'
                        : 'text-[#3b382f]')
                    }
                  >
                    {todo.text}
                  </span>
                )}

                {editingId !== todo.id && (
                  <div className="flex items-center gap-0.5 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                    <button
                      onClick={() => beginEdit(todo)}
                      aria-label="Edit"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#a49c8a] transition hover:bg-[#ece4d3] hover:text-[#7a7261]"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => remove(todo.id)}
                      aria-label="Delete"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#a49c8a] transition hover:bg-[#f4dcd3] hover:text-[#c0503a]"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {doneCount > 0 && (
            <div className="flex items-center justify-between border-t border-[#ece5d7] px-3 py-2.5">
              <span className="pl-1 text-xs text-[#b3ab99]">
                {doneCount} completed
              </span>
              <button
                onClick={clearDone}
                className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-[#a49c8a] transition hover:bg-[#f4dcd3] hover:text-[#c0503a]"
              >
                Clear completed
              </button>
            </div>
          )}
        </div>

        <p className="mt-4 px-1 text-center text-xs text-[#b3ab99]">
          Double-click a task to edit · Esc to cancel
        </p>
      </div>
    </div>
  )
}