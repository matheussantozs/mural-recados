import { NextResponse } from 'next/server';
import sql from '../../../lib/db';

// GET: Busca todos os recados salvos
export async function GET() {
  try {
    const recados = await sql`SELECT id, nome, mensagem, criado_em FROM recados ORDER BY id DESC`;
    return NextResponse.json(recados);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar recados' }, { status: 500 });
  }
}

// POST: Salva um novo recado
export async function POST(request) {
  try {
    const { nome, mensagem } = await request.json();

    if (!nome || !mensagem) {
      return NextResponse.json({ error: 'Nome e mensagem são obrigatórios' }, { status: 400 });
    }

    await sql`INSERT INTO recados (nome, mensagem) VALUES (${nome}, ${mensagem})`;
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar recado' }, { status: 500 });
  }
}