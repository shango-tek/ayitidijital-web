import type { ReactNode } from 'react'

/**
 * 1:1 port of Radiant's PlusGrid: each row draws a double hairline (two lines
 * 8px apart) along its top edge, and the last row also along its bottom edge.
 * PlusGridItems drop small plus-cross marks at their corners, which land on the
 * lower rule line — the signature Radiant "cells with plus marks" look.
 */

export function PlusGrid({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={className}>{children}</div>
}

export function PlusGridRow({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`pg-row ${className}`.trim()}>
      <div aria-hidden="true" className="pg-rules">
        <div className="pg-rule pg-rule-t1" />
        <div className="pg-rule pg-rule-t2" />
        <div className="pg-rule pg-rule-b1" />
        <div className="pg-rule pg-rule-b2" />
      </div>
      {children}
    </div>
  )
}

export function PlusGridItem({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`pg-item ${className}`.trim()}>
      <PlusGridIcon placement="top left" className="pg-ico-first" />
      <PlusGridIcon placement="top right" />
      <PlusGridIcon placement="bottom left" className="pg-ico-firstlast" />
      <PlusGridIcon placement="bottom right" className="pg-ico-last" />
      {children}
    </div>
  )
}

export function PlusGridIcon({
  className = '',
  placement,
}: {
  className?: string
  placement: `${'top' | 'bottom'} ${'right' | 'left'}`
}) {
  const [yAxis, xAxis] = placement.split(' ')
  const yClass = yAxis === 'top' ? 'pg-ico-top' : 'pg-ico-bottom'
  const xClass = xAxis === 'left' ? 'pg-ico-left' : 'pg-ico-right'
  return (
    <svg viewBox="0 0 15 15" aria-hidden="true" className={`pg-ico ${yClass} ${xClass} ${className}`.trim()}>
      <path d="M8 0H7V7H0V8H7V15H8V8H15V7H8V0Z" />
    </svg>
  )
}
