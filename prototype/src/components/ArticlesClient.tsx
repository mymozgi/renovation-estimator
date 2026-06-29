'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Article } from '@/content/articles'
import { CLUSTER_LABELS, CLUSTER_COLORS } from '@/content/clusters'

export { CLUSTER_LABELS, CLUSTER_COLORS }

const PAGE_SIZE = 9

type Props = {
  articles: Article[]
  locale: string
}

export function ArticlesClient({ articles, locale }: Props) {
  const clusters = Array.from(new Set(articles.map(a => a.cluster)))
  const [active, setActive] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const filtered = active === null ? articles : articles.filter(a => a.cluster === active)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function handleCategory(c: string | null) {
    setActive(c)
    setPage(1)
  }

  return (
    <>
      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        <button
          onClick={() => handleCategory(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === null
              ? 'bg-primary text-white'
              : 'border border-border text-fg hover:border-primary/40'
          }`}
        >
          Wszystkie
        </button>
        {clusters.map((c) => (
          <button
            key={c}
            onClick={() => handleCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              active === c
                ? 'bg-primary text-white'
                : 'border border-border text-fg hover:border-primary/40'
            }`}
          >
            {CLUSTER_LABELS[c] ?? c}
          </button>
        ))}
      </div>

      {/* Article grid */}
      {paged.length === 0 ? (
        <div className="py-20 text-center text-muted text-sm">
          Brak artykułów w tej kategorii.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paged.map((article) => {
            const tagClass = CLUSTER_COLORS[article.cluster] ?? 'bg-primary-fixed text-primary'
            return (
              <Link
                key={article.slug}
                href={`/${locale}/articles/${article.slug}`}
                className="group flex flex-col bg-surface rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0 bg-border">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`${tagClass} text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide`}>
                      {CLUSTER_LABELS[article.cluster] ?? article.cluster}
                    </span>
                    <span className="text-xs text-muted">{article.publishedAt}</span>
                  </div>
                  <h2 className="font-bold text-fg text-base leading-snug line-clamp-2">{article.title}</h2>
                  <p className="text-muted text-sm leading-relaxed line-clamp-2">{article.description}</p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium mt-1">
                    Czytaj dalej <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Pagination — only if more than 9 articles */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg transition-colors text-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                n === page ? 'bg-primary text-white' : 'text-muted hover:bg-bg'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg transition-colors text-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </>
  )
}
