import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

// Tạo một plugin nội bộ để ép oxc dịch cú pháp JSX trong file .js
const transformJsxInJs = () => ({
  name: 'transform-jsx-in-js',
  enforce: 'pre', // Chạy trước các plugin khác để đón đầu lỗi
  async transform(code, id) {
    // Nếu không phải file trong thư mục src hoặc không phải đuôi .js thì bỏ qua
    if (!id.match(/src\/.*\.js$/)) {
      return null
    }
    // Ép ngôn ngữ xử lý là jsx
    return await transformWithOxc(code, id, {
      lang: 'jsx',
    })
  },
})

export default defineConfig({
  plugins: [
    react(),
    transformJsxInJs() // Bỏ plugin này vào cấu hình
  ],
})