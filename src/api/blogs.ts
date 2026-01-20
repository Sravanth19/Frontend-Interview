import type { Blog } from '../types/blog'

const API_BASE_URL = 'http://localhost:3001'

export type CreateBlogPayload = Omit<Blog, 'id'>

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs`)

  if (!response.ok) {
    throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`)
  }

  const data: Blog[] = await response.json()
  return data
}

export async function getBlogById(id: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${encodeURIComponent(id)}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch blog with id ${id}: ${response.status} ${response.statusText}`)
  }

  const data: Blog = await response.json()
  return data
}

export async function createBlog(blog: CreateBlogPayload): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blog),
  })

  if (!response.ok) {
    throw new Error(`Failed to create blog: ${response.status} ${response.statusText}`)
  }

  const data: Blog = await response.json()
  return data
}

