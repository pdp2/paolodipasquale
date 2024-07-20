import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="px-4 py-2">
        <header className="mb-8">
          <h1 className="text-sm text-zinc-500">Paolo Di Pasquale's blog</h1>
        </header>
        {children}
      </body>
    </html>
  )
}