'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { Article } from '@/content/articles'
import { ArticleCard } from './ArticleCard'

const PAGE_SIZE = 9

type Props = {
  articles: Article[]
  locale: string
}

export function ArticlesClient({ articles, locale }: Props) {
  const t = useTranslations('articles')
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
          className={`px-4 py-[10px] rounded-full text-sm font-medium tracking-[0.07em] transition-colors ${
            active === null
              ? 'bg-[#002113] text-[#f3f0ef]'
              : 'bg-[#f0edec] text-[#414943]'
          }`}
        >
          {t('filterAll')}
        </button>
        {clusters.map((c) => (
          <button
            key={c}
            onClick={() => handleCategory(c)}
            className={`px-4 py-[10px] rounded-full text-sm font-medium tracking-[0.07em] transition-colors ${
              active === c
                ? 'bg-[#002113] text-[#f3f0ef]'
                : 'bg-[#f0edec] text-[#414943]'
            }`}
          >
            {t(`clusters.${c}`)}
          </button>
        ))}
      </div>

      {/* Article grid */}
      {paged.length === 0 ? (
        <div className="py-20 text-center text-muted text-sm">
          {t('noArticles')}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {paged.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              clusterLabel={t(`clusters.${article.cluster}`)}
              readMoreLabel={t('readMore')}
            />
          ))}
        </div>
      )}

      {/* Pagination — only if more than 9 articles */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0edec] transition-colors text-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                n === page ? 'bg-[#002113] text-[#f3f0ef]' : 'text-muted hover:bg-[#f0edec]'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f0edec] transition-colors text-muted disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </>
  )
}
