/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: { // 기존과 별도로 새로운 유틸리티 클래스 추가
        primary: '#ffc107',
        secondary: '#2979ff',
        success: '00c07f',
        failure: 'ff6562',
      },
    },
  },
  plugins: [],
}

