import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { CLUSTER_COLORS } from '@/content/clusters'
import type { Article } from '@/content/articles'

interface ArticleCardProps {
  article: Article
  locale: string
  clusterLabel: string
  readMoreLabel: string
}

export function ArticleCard({ article, locale, clusterLabel, readMoreLabel }: ArticleCardProps) {
  const tagClass = CLUSTER_COLORS[article.cluster] ?? 'bg-primary-fixed text-fg'

  return (
    <Link href={`/${locale}/articles/${article.slug}`} className="group flex flex-col gap-3">
      <div className="relative aspect-[364/205] w-full overflow-hidden rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] shrink-0">
        <Image
          src={article.img}
          alt={article.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className={`${tagClass} font-medium text-[12px] px-3 py-1 rounded-[4px] tracking-[0.05em]`}>
          {clusterLabel}
        </span>
        <span className="text-[14px] text-[#717973] leading-[22px]">{article.publishedAt}</span>
      </div>
      <h3 className="font-semibold text-fg text-2xl leading-8 line-clamp-2 pt-1">{article.title}</h3>
      <p className="text-[#414943] text-base leading-6 line-clamp-2">{article.description}</p>
      <div className="flex items-center gap-1 text-primary text-base">
        {readMoreLabel} <ArrowRight size={20} />
      </div>
    </Link>
  )
}
