import React from 'react'

/* Render inline: **bold**, *italic* */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-[#002113]">{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        return <React.Fragment key={i}>{part}</React.Fragment>
      })}
    </>
  )
}

function isSeparator(line: string) {
  return /^\|[\s\-:|]+\|$/.test(line.trim())
}

type Block =
  | { type: 'paragraph'; lines: string[] }
  | { type: 'table'; rows: string[][] }

function parse(text: string): Block[] {
  const lines = text.split('\n')
  const blocks: Block[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (line.trim().startsWith('|')) {
      // Collect table
      const tableLines: string[] = []
      while (i < lines.length && (lines[i].trim().startsWith('|') || lines[i].trim() === '')) {
        if (lines[i].trim().startsWith('|')) tableLines.push(lines[i])
        else if (tableLines.length > 0) break
        i++
      }
      const rows = tableLines
        .filter(l => !isSeparator(l))
        .map(l => l.trim().slice(1, -1).split('|').map(s => s.trim()))
      if (rows.length > 0) blocks.push({ type: 'table', rows })
    } else {
      const paraLines: string[] = []
      while (i < lines.length && !lines[i].trim().startsWith('|')) {
        paraLines.push(lines[i])
        i++
      }
      if (paraLines.some(l => l.trim())) {
        blocks.push({ type: 'paragraph', lines: paraLines })
      }
    }
  }

  return blocks
}

export function MarkdownContent({ text, className = '' }: { text: string; className?: string }) {
  const blocks = parse(text)

  return (
    <div className={`space-y-4 ${className}`}>
      {blocks.map((block, bi) => {
        if (block.type === 'table') {
          const [head, ...body] = block.rows
          return (
            <div key={bi} className="overflow-x-auto rounded-[8px] border border-[#e5e2e1]">
              <table className="w-full text-sm min-w-[320px]">
                <thead className="bg-[#f6f3f2]">
                  <tr>
                    {head.map((cell, ci) => (
                      <th
                        key={ci}
                        className="text-left px-4 py-2.5 font-semibold text-[#002113] border-b border-[#e5e2e1] whitespace-nowrap"
                      >
                        {renderInline(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {body.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 1 ? 'bg-[#faf8f7]' : ''}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="px-4 py-2.5 text-[#414943] border-b border-[#f0eded] last:border-b-0"
                        >
                          {renderInline(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }

        // Paragraph block — preserve line breaks, render inline markdown
        const content = block.lines.join('\n').trim()
        if (!content) return null
        const subParagraphs = content.split(/\n{2,}/)
        return (
          <div key={bi} className="space-y-3">
            {subParagraphs.map((para, pi) => {
              const isHeading = para.trim().startsWith('**') && para.trim().endsWith('**') && !para.includes('\n')
              if (isHeading) {
                return (
                  <p key={pi} className="font-semibold text-[#002113] text-base leading-6">
                    {renderInline(para.trim())}
                  </p>
                )
              }
              return (
                <p key={pi} className="text-base text-[#414943] leading-6 whitespace-pre-line">
                  {renderInline(para)}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
