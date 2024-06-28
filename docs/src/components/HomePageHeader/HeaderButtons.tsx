import styles from './styles.module.css'
import Link from '@docusaurus/Link'
import clsx from 'clsx'

export default function HeaderButtons() {
  return (
    <div className={styles.buttonsContainer}>
      <Link
        className={clsx(
          'button button--secondary button--lg',
          styles.button,
          styles.buttonReadDocs
        )}
        to="/docs/overview"
      >
        Read docs
      </Link>
      <Link
        className={clsx('button button--secondary button--lg', styles.button, styles.buttonTryIt)}
        to="https://binarapps.online/sign-in"
      >
        Try it
      </Link>
    </div>
  )
}
