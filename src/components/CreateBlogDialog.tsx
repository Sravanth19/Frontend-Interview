import { FormEvent, useState } from 'react'
import { useCreateBlog } from '../hooks/useBlogs'
import type { BlogCategory } from '../types/blog'

type CreateBlogDialogProps = {
  // Reserved for future extensibility (e.g. callbacks), currently unused
}

export function CreateBlogDialog(_props: CreateBlogDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [categoryInput, setCategoryInput] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const createBlogMutation = useCreateBlog()

  const isSubmitting = createBlogMutation.isPending

  function resetForm() {
    setTitle('')
    setCategoryInput('')
    setDescription('')
    setContent('')
    setCoverImage('')
    setFormError(null)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetForm()
    }
    setIsOpen(nextOpen)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const trimmedTitle = title.trim()
    const trimmedContent = content.trim()

    if (!trimmedTitle || !trimmedContent) {
      setFormError('Title and content are required.')
      return
    }

    const categories = categoryInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean) as BlogCategory[]

    createBlogMutation.mutate(
      {
        title: trimmedTitle,
        content: trimmedContent,
        description: description.trim() || trimmedTitle,
        coverImage: coverImage.trim(),
        category: categories.length ? categories : (['FINANCE'] as BlogCategory[]),
        date: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          handleOpenChange(false)
        },
        onError: (error) => {
          setFormError(error.message || 'Failed to create blog.')
        },
      },
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm transition-colors hover:border-slate-500 hover:bg-slate-800"
      >
        <span className="inline-block h-4 w-4 rounded-full bg-slate-100 text-center text-[13px] font-bold text-slate-900">
          +
        </span>
        New blog
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-950/95 p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-50">Create new blog</h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  Add a new article to the CA Monk blog.
                </p>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleOpenChange(false)}
                className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 disabled:opacity-60"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {formError ? (
              <div className="mb-3 rounded-md border border-red-900/40 bg-red-950/40 px-3 py-2 text-xs text-red-200">
                {formError}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-slate-400"
                  placeholder="Future of Fintech"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Category
                  <span className="ml-1 text-[11px] font-normal text-slate-400">
                    (comma separated, e.g. FINANCE, TECH)
                  </span>
                </label>
                <input
                  type="text"
                  value={categoryInput}
                  onChange={(event) => setCategoryInput(event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-slate-400"
                  placeholder="FINANCE, TECH"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  className="min-h-[60px] w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-slate-400"
                  placeholder="Short summary shown in the list."
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  className="min-h-[120px] w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-slate-400"
                  placeholder="Write the full blog content here (plain text)."
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-medium text-slate-200">
                  Cover image URL
                </label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(event) => setCoverImage(event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-sm text-slate-50 outline-none ring-0 transition focus:border-slate-400"
                  placeholder="https://images.pexels.com/..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleOpenChange(false)}
                  className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 transition-colors hover:border-slate-500 hover:bg-slate-800 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-900 transition-colors hover:bg-white disabled:opacity-60"
                >
                  {isSubmitting ? 'Creating…' : 'Create blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

