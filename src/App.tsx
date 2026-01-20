import { useState } from 'react'
import { BlogList } from './components/BlogList'
import { BlogDetails } from './components/BlogDetails'
import { CreateBlogDialog } from './components/CreateBlogDialog'

function App() {
  const [selectedBlogId, setSelectedBlogId] = useState<string | undefined>(undefined)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              CA Monk Blog
            </h1>
            <div className="mt-1 hidden sm:block">
              <CreateBlogDialog />
            </div>
          </div>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Insights, guidance, and stories for modern finance and accounting professionals.
          </p>
          <div className="mt-2 sm:hidden">
            <CreateBlogDialog />
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:py-6 lg:flex-row lg:gap-6">
        {/* Left panel: blog list */}
        <section className="w-full lg:w-5/12">
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
              Blog posts
            </h2>
            <div className="mt-4">
              <BlogList selectedBlogId={selectedBlogId} onSelectBlogId={setSelectedBlogId} />
            </div>
          </div>
        </section>

        {/* Right panel: blog details */}
        <section className="w-full lg:w-7/12">
          <div className="flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-4">
            <h2 className="text-sm font-medium uppercase tracking-wide text-slate-400">
              Blog details
            </h2>
            <div className="mt-4 flex-1">
              <BlogDetails selectedBlogId={selectedBlogId} />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
