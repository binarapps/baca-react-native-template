import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

import styles from './styles.module.css'
import Heading from '@theme/Heading'
import clsx from 'clsx'
import HeaderButtons from './HeaderButtons'
import ImageSlider from './ImageSlider'

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <header className={clsx('hero hero--primary padding-vert--xl', styles.heroBanner)}>
      <div className="container padding-vert--xl">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <HeaderButtons />
        <ImageSlider />
      </div>
    </header>
  )
}
