import { normalizeCategory } from '@/lib/categories'
import { fetchTaskPosts } from '@/lib/task-data'
import { SocialProfileDirectoryPage } from '@/components/pages/social-profile-directory-page'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('profile', {
    path: '/profile',
    title: taskPageMetadata.profile.title,
    description: taskPageMetadata.profile.description,
  })

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>
}) {
  const resolved = (await searchParams) || {}
  const raw = resolved.category
  const normalizedCategory = raw ? normalizeCategory(raw) : 'all'
  const posts = await fetchTaskPosts('profile', 30)

  return <SocialProfileDirectoryPage initialPosts={posts} normalizedCategory={normalizedCategory} />
}
