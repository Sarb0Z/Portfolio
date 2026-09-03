import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return <h1 className="display text-4xl leading-[1.05] md:text-6xl">{children}</h1>
}
