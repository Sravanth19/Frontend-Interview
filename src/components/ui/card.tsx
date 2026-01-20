import type { HTMLAttributes } from 'react'

function cx(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        'rounded-xl border border-slate-800 bg-slate-900/60 text-slate-50 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('p-4 pb-2', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx('text-base font-semibold leading-tight', className)} {...props} />
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('text-sm text-slate-400', className)} {...props} />
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('p-4 pt-2', className)} {...props} />
}

