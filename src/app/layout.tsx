import '@/styles/globals.css'

export const metadata = {
  title: 'Anticitera',
  description:
    'Anticitera - A chatbot that generates agents based on user input.'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      {children}
    </html>
  )
}
