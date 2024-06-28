import HomepageFeatures from '@site/src/components/HomepageFeatures'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import HomepageHeader from '@site/src/components/HomePageHeader'
import Layout from '@theme/Layout'

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
