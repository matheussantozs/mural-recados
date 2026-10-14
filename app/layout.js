import './globals.css';

export const metadata = {
  title: 'Mural de Recados',
  description: 'Projeto simples com Next.js, Vercel e Neon',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}