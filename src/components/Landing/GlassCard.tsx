import React from 'react'

type Props = React.PropsWithChildren<{ className?: string }>

export default function GlassCard({ children, className = '' }: Props) {
  return (
    <div className={"rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-lg " + className}>
      {children}
    </div>
  )
}
