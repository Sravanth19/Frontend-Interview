import { useBlog } from '../hooks/useBlogs'

type BlogDetailsProps = {
  selectedBlogId?: string
}

function formatBlogDate(isoDate: string) {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

export function BlogDetails({ selectedBlogId }: BlogDetailsProps) {
  if (!selectedBlogId) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-800/80 bg-slate-900/40 px-4 py-8 text-center">
        <p className="text-sm text-slate-500">
          Select a blog from the list on the left to see full details here.
        </p>
      </div>
    )
  }

  const { data, isLoading, isError, error } = useBlog(selectedBlogId)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-40 w-full animate-pulse rounded-lg bg-slate-800/60" />
        <div className="space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-slate-800/60" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800/60" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-800/60" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-slate-800/60" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-slate-800/60" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/40 bg-red-950/30 p-3 text-sm text-red-200">
        Failed to load blog details
        {error?.message ? `: ${error.message}` : '.'}
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-sm text-slate-500">
        Blog not found. Please select another blog from the list.
      </div>
    )
  }

  const { title, category, date, description, content, coverImage } = data

  return (
    <article className="flex h-full flex-col space-y-4">
      {coverImage ? (
        <div className="overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/60">
          <img
            src={coverImage}
            alt={title}
            className="h-48 w-full object-cover sm:h-56 md:h-64"
          />
        </div>
      ) : null}

      <header className="space-y-2">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 sm:text-sm">
          <span className="rounded-full bg-slate-800/80 px-2 py-0.5 text-[11px] font-medium tracking-wide text-slate-200 sm:text-xs">
            {category.join(' • ')}
          </span>
          <span className="text-slate-500">·</span>
          <span>{formatBlogDate(date)}</span>
        </div>
        <p className="text-sm text-slate-300">{description}</p>
      </header>

      <section className="flex-1 overflow-y-auto pr-1 text-sm leading-relaxed text-slate-200">
        <p className="whitespace-pre-line">
          {content}
        </p>
      </section>
    </article>
  )
}

