import type { CSSOptions } from 'vite';

export function createViteCSS(): CSSOptions {
  const viteCSS: CSSOptions = {
    preprocessorOptions: {
      // 配置scss全局样式以及变量
      scss: {
        charset: false,
        additionalData: `
          @use "./src/styles/var/element/theme/index.scss" as *; 
          @use "./src/styles/var/index.scss" as *;
        `,
        javascriptEnabled: true,
      },
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule: { name: string; remove: () => void }) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  };
  return viteCSS;
}
