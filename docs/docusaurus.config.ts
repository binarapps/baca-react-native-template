import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

const repoLink = 'https://github.com/binarapps/baca-react-native-template'
const docsLink = '/docs/overview'
const demoLink = 'https://binarapps.online/sign-in'

const config: Config = {
  title: 'BACA - react native starter',
  tagline: 'Start your react native project and boost your productivity',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'https://github.com/binarapps', // Usually your GitHub org/user name.
  projectName: 'BACA-RN', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: repoLink + '/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo-light.png',
    navbar: {
      title: 'BACA - RN Starter',
      logo: {
        alt: 'BACA - RN Starter',
        src: 'img/logo-light.png',
        srcDark: 'img/logo-dark.png',
      },
      hideOnScroll: true,
      items: [
        {
          href: repoLink,
          label: 'GitHub',
          position: 'right',
        },
        {
          to: docsLink,
          label: 'Docs',
          position: 'left',
        },
        {
          to: demoLink,
          label: 'Demo',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview',
            },
            {
              label: 'Intro',
              to: '/docs/bootstrap/create-new-app',
            },
          ],
        },
        {
          title: 'Binarapps',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/binarapps',
            },
            {
              label: 'Website',
              href: 'https://binarapps.com/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: repoLink,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Binarapps, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'ruby', 'json', 'ejs', 'diff', 'markup-templating'],
      magicComments: [
        // Remember to extend the default highlight class name as well!
        {
          className: 'theme-code-block-highlighted-line',
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line',
          line: 'error-line',
          block: { start: 'error-line-start', end: 'error-line-end' },
        },
        {
          className: 'code-block-success-line',
          line: 'success-line',
          block: { start: 'success-line-start', end: 'success-line-end' },
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
