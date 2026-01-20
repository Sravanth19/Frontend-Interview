import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Blog } from '../types/blog'
import { createBlog, getBlogById, getBlogs, type CreateBlogPayload } from '../api/blogs'

const blogsKeys = {
  all: ['blogs'] as const,
  detail: (id: string) => [...blogsKeys.all, id] as const,
}

export function useBlogs() {
  return useQuery<Blog[], Error>({
    queryKey: blogsKeys.all,
    queryFn: getBlogs,
  })
}

export function useBlog(id: string | undefined) {
  return useQuery<Blog, Error>({
    queryKey: id ? blogsKeys.detail(id) : blogsKeys.all,
    queryFn: () => {
      if (!id) {
        throw new Error('Blog id is required')
      }
      return getBlogById(id)
    },
    enabled: Boolean(id),
  })
}

export function useCreateBlog() {
  const queryClient = useQueryClient()

  return useMutation<Blog, Error, CreateBlogPayload>({
    mutationFn: createBlog,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: blogsKeys.all })
    },
  })
}

