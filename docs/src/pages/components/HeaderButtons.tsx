import styles from '../index.module.css'
import Link from '@docusaurus/Link'
import clsx from 'clsx'

export const HeaderButtons = () => (
  <div className={styles.buttonsContainer}>
    <Link
      className={clsx('button button--secondary button--lg', styles.buttonReadDocs)}
      to="/docs/overview"
    >
      Read docs
    </Link>
    <Link
      className={clsx('button button--secondary button--lg', styles.buttonTryIt)}
      to="https://binarapps.online/sign-in"
    >
      Try it
    </Link>
  </div>
)
