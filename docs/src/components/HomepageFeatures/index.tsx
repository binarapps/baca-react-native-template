/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-native/no-raw-text */
import Heading from '@theme/Heading'
import clsx from 'clsx'

import styles from './styles.module.css'

type FeatureItem = {
  title: string
  Svg: React.ComponentType<React.ComponentProps<'svg'>>
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>It&apos;s easy to get started, just prepare your starting data and run our scripts.</>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        We provide all necessary tools to start you building the app, you can just focus on creating
        business logic.
      </>
    ),
  },
  {
    title: 'Powered by React Native and Expo',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>We are using the newest tools to achieve the best performance and developer experience.</>
    ),
  },
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
