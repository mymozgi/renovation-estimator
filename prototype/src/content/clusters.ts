export const CLUSTER_LABELS: Record<string, string> = {
  budget:      'Budżet',
  contractors: 'Wykonawcy',
  rooms:       'Pomieszczenia',
  regional:    'Regiony',
  materials:   'Materiały',
  property:    'Nieruchomości',
}

/**
 * One colour per cluster, so a category is recognisable before the label is
 * read. Every pair is dark text on a light tint of the same hue, which keeps
 * contrast near 7:1 — comfortably past WCAG AA at this text size.
 */
export const CLUSTER_COLORS: Record<string, string> = {
  budget:      'bg-[#F5E4C3] text-[#6B4A12]',
  contractors: 'bg-[#B9EFCF] text-[#1D5039]',
  rooms:       'bg-[#D3E4F5] text-[#1B4568]',
  regional:    'bg-[#F6DCD2] text-[#7A3520]',
  materials:   'bg-[#E3DCF3] text-[#4A3A75]',
  property:    'bg-[#CFE8E6] text-[#1F5551]',
}

export function clusterColor(cluster: string): string {
  return CLUSTER_COLORS[cluster] ?? 'bg-[#B9EFCF] text-[#1D5039]'
}
