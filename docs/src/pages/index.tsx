import HomepageFeatures from '@site/src/components/HomepageFeatures'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import Heading from '@theme/Heading'
import Link from '@docusaurus/Link'
import Layout from '@theme/Layout'
import Slider from 'react-slick'
import React from 'react'
import clsx from 'clsx'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  const settings = {
    adaptiveHeight: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    slidesToScroll: 1,
    slidesToShow: 3,
    speed: 500,
  }

  return (
    <header className={clsx('hero hero--primary padding-vert--xl', styles.heroBanner)}>
      <div className="container padding-vert--xl">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttonsContainer}>
          <Link
            className={clsx('button button--secondary button--lg', styles.buttonReadDocs)}
            to="/docs/overview"
          >
            Read docs
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.buttonTryIt)}
            to="/docs/overview"
          >
            Try it
          </Link>
        </div>
        <div className={styles.sliderContainer}>
          <Slider {...settings}>
            <div className={styles.imageWrapper}>
              <img
                src="/img/iphone_signup_draft_light.png"
                alt="First iPhone draft"
                className={styles.image}
              />
            </div>
            <div className={styles.imageWrapper}>
              <img
                src="/img/iphone_signup_draft_dark.png"
                alt="Second iPhone draft"
                className={styles.image}
              />
            </div>
            <div className={styles.imageWrapper}>
              <img
                src="/img/iphone_settings_draft_light.png"
                alt="Third iPhone draft"
                className={styles.image}
              />
            </div>
            <div className={styles.imageWrapper}>
              <img
                src="/img/iphone_settings_draft_dark.png"
                alt="Fourth iPhone draft"
                className={styles.image}
              />
            </div>
          </Slider>
        </div>
      </div>
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  )
}
