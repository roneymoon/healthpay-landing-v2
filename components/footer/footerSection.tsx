import { type FC } from 'react'
import { type FooterSection } from '@/lib/constant'
import Link from 'next/link'

const FooterSection: FC<FooterSection> = ({ items, title }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-sm font-medium text-white mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map(({ id, item, link }) => (
          <li key={id}>
            <Link 
              href={link}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterSection
