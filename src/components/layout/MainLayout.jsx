import { Gabarito } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const gabarito = Gabarito({ subsets: ['latin'] })

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body className={gabarito.className}>
        <Toaster position="bottom-right" />
        {children}
      </body>
    </html>
  )
}