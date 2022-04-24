import { ReactNode } from 'react'
import Head from 'next/head'

interface HeadTitleProps {
  title?: string
  children: ReactNode
}

export function LayoutTitle({ title, children }: HeadTitleProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{title ?? 'platziPunks'}</title>
      </Head>
      {children}
    </>
  )
}
