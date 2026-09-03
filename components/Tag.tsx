import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
