import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { HeaderButtons } from './components/HeaderButtons'
import { ImageSlider } from './components/ImageSlider'
import styles from './index.module.css'
import Heading from '@theme/Heading'
import clsx from 'clsx'

export function HomepageHeader() {
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
