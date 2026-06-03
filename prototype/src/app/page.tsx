import { redirect } from 'next/navigation'

// Root redirect: /  →  /pl  (handled by middleware, this is a fallback)
export default function RootPage() {
  redirect('/pl')
}
