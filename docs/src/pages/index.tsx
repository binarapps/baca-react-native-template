import React from 'react'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import HomepageFeatures from '@site/src/components/HomepageFeatures'
import Heading from '@theme/Heading'
import Layout from '@theme/Layout'
import clsx from 'clsx'
import Slider from 'react-slick'
import styles from './index.module.css'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // centerPadding: '100px',
    arrows: true,
    centerMode: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <header className={clsx('hero hero--primary padding-vert--xl', styles.heroBanner)}>
      <div className="container padding-vert--xl">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/overview">
            See docs
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

// import React from 'react'
// import Link from '@docusaurus/Link'
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
// import HomepageFeatures from '@site/src/components/HomepageFeatures'
// import Heading from '@theme/Heading'
// import Layout from '@theme/Layout'
// import clsx from 'clsx'
// import Slider from 'react-slick'
// import styles from './index.module.css'

// function HomepageHeader() {
//   const { siteConfig } = useDocusaurusContext()

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     centerMode: true,
//     slidesToScroll: 1,
//     centerPadding: '400px',
//     autoplay: true,
//     draggable: true,
//     autoplaySpeed: 2500,
//     responsive: [
//       {
//         breakpoint: 996, //996
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   }

//   return (
//     <header className={clsx('hero hero--primary padding-vert--xl', styles.heroBanner)}>
//       <div className="container padding-vert--xl">
//         <Heading as="h1" className="hero__title">
//           {siteConfig.title}
//         </Heading>
//         <p className="hero__subtitle">{siteConfig.tagline}</p>
//         <div className={styles.buttons}>
//           <Link className="button button--secondary button--lg" to="/docs/overview">
//             See docs
//           </Link>
//         </div>
//         <div className={styles.sliderContainer}>
//           <Slider {...settings}>
//             <div>
//               <img
//                 src="/img/iphone_signup_draft_light.png"
//                 alt="First iPhone draft"
//                 className={styles.image}
//               />
//             </div>
//             <div>
//               <img
//                 src="/img/iphone_signup_draft_dark.png"
//                 alt="Second iPhone draft"
//                 className={styles.image}
//               />
//             </div>
//             <div>
//               <img
//                 src="/img/iphone_settings_draft_light.png"
//                 alt="Third iPhone draft"
//                 className={styles.image}
//               />
//             </div>
//             <div>
//               <img
//                 src="/img/iphone_settings_draft_dark.png"
//                 alt="Fourth iPhone draft"
//                 className={styles.image}
//               />
//             </div>
//           </Slider>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default function Home(): JSX.Element {
//   const { siteConfig } = useDocusaurusContext()
//   return (
//     <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
//       <HomepageHeader />
//       <main>
//         <HomepageFeatures />
//       </main>
//     </Layout>
//   )
// }
