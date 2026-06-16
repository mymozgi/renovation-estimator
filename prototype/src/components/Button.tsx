import { forwardRef, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'destructive' | 'inverse'
type Size = 'xs' | 'sm' | 'md'

export interface ButtonVariantProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors disabled:cursor-not-allowed'

const VARIANTS: Record<Variant, string> = {
  primary:     'bg-primary text-white hover:bg-primary/90 disabled:opacity-70',
  secondary:   'border border-border text-fg hover:border-primary/40 disabled:opacity-50',
  destructive: 'bg-destructive text-white hover:bg-destructive/90 disabled:opacity-70',
  inverse:     'bg-white text-primary hover:bg-white/90 disabled:opacity-70',
}

const SIZES: Record<Size, string> = {
  xs: 'py-2 px-4 text-sm',
  sm: 'py-3 px-5 text-sm',
  md: 'py-4 px-6 text-base',
}

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonVariantProps & { className?: string } = {}): string {
  return [BASE, VARIANTS[variant], SIZES[size], fullWidth ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ')
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth = false, className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, fullWidth, className })}
      {...props}
    />
  )
)
Button.displayName = 'Button'
