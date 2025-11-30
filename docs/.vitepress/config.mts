import { defineConfig } from 'vitepress'
import { 
  InlineLinkPreviewElementTransform 
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import { 
  GitChangelog, 
  GitChangelogMarkdownSection, 
} from '@nolebase/vitepress-plugin-git-changelog/vite'
import { calculateSidebar } from '@nolebase/vitepress-plugin-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "OpenBioCard-Docs",
  description: "OpenBioCard's docs",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: calculateSidebar([ 
      'Notes', 
      { folderName: 'Articles', separate: true }, 
    ]),
    

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: { 
    config(md) { 
      // other markdown-it configurations...
      md.use(InlineLinkPreviewElementTransform) 
    } 
  },
  vite: {
    plugins: [ 
      GitChangelog({ 
        // Fill in your repository URL here
        repoURL: () => 'https://github.com/OpenBioCard/OpenBioCard-Docs', 
      }), 
      GitChangelogMarkdownSection(), 
    ],
    optimizeDeps: { 
      exclude: [ 
        '@nolebase/vitepress-plugin-inline-link-preview/client', 
        '@nolebase/vitepress-plugin-enhanced-readabilities/client', 
        'vitepress', 
        '@nolebase/ui', 
      ], 
    }, 
    ssr: { 
      noExternal: [ 
        // If there are other packages that need to be processed by Vite, you can add them here.
        '@nolebase/vitepress-plugin-inline-link-preview', 
        '@nolebase/vitepress-plugin-enhanced-readabilities', 
        '@nolebase/ui', 
      ], 
    }, 
  }, 
})
