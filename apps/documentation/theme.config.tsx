import type { DocsThemeConfig } from 'nextra-theme-docs';
import { useConfig } from 'nextra-theme-docs';

const themeConfig: DocsThemeConfig = {
  logo: <span>SecureSign Docs</span>,
  head: function useHead() {
    const config = useConfig();

    const title = `${config.frontMatter.title} | SecureSign Docs` || 'SecureSign Docs';
    const description =
      config.frontMatter.description || 'The official SecureSign documentation';

    return (
      <>
        <meta httpEquiv="Content-Language" content="en" />
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="og:title" content={title} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </>
    );
  },
  project: {
    link: 'https://github.com/documenso/documenso',
  },
  docsRepositoryBase: 'https://github.com/documenso/documenso/tree/main/apps/documentation',
  footer: {
    content: (
      <span>
        {new Date().getFullYear()} © Alder Creek Digital.
      </span>
    ),
  },
  color: {
    hue: 100,
    saturation: 48.47,
  },
};

export default themeConfig;
