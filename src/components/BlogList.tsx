import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { useBlogs } from '../hooks/useBlogs'

type BlogListProps = {
  selectedBlogId?: string
  onSelectBlogId: (id: string) => void
}

function formatBlogDate(isoDate: string) {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })
}

export function BlogList({ selectedBlogId, onSelectBlogId }: BlogListProps) {
  const { data, isLoading, isError, error } = useBlogs()

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="animate-pulse">
            <CardHeader>
              <div className="h-4 w-2/3 rounded bg-slate-800/60" />
              <div className="mt-2 h-3 w-1/3 rounded bg-slate-800/60" />
            </CardHeader>
            <CardContent>
              <div className="h-3 w-full rounded bg-slate-800/60" />
              <div className="mt-2 h-3 w-5/6 rounded bg-slate-800/60" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-900/40 bg-red-950/30 p-3 text-sm text-red-200">
        Failed to load blogs{error?.message ? `: ${error.message}` : '.'}
      </div>
    )
  }

  const blogs = data ?? []

  if (blogs.length === 0) {
    return <div className="text-sm text-slate-400">No blogs found.</div>
  }

  return (
    <div className="space-y-3">
      {blogs.map((blog) => {
        const isSelected = blog.id === selectedBlogId

        return (
          <button
            key={blog.id}
            type="button"
            onClick={() => onSelectBlogId(blog.id)}
            className="block w-full text-left"
          >
            <Card
              className={[
                'transition-colors hover:border-slate-700',
                isSelected ? 'ring-2 ring-slate-200/30' : '',
              ].join(' ')}
            >
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  <span className="text-slate-300">{blog.category.join(' • ')}</span>
                  <span className="mx-2 text-slate-600">·</span>
                  <span>{formatBlogDate(blog.date)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-300">{blog.description}</p>
              </CardContent>
            </Card>
          </button>
        )
      })}
    </div>
  )
}

