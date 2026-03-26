import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#0A0D12',
          surface: '#111520',
          elevated: '#181D2B',
        },
        border: {
          subtle: '#1F2740',
          active: '#2E3D5C',
        },
        fg: {
          primary: '#F0F2F7',
          muted: '#8A94AA',
          dimmed: '#4A5270',
        },
        teal: {
          DEFAULT: '#1ED4B0',
          dim: '#0F6B59',
        },
        amber: {
          DEFAULT: '#E8A030',
        },
        blue: {
          accent: '#3D72F5',
        },
      },
    },
  },
  plugins: [],
}
export default config