import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Limpar tokens do cliente (o logout real acontece no frontend)
    return NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso',
    });
  } catch (error) {
    console.error('Erro no logout:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { message: 'Erro ao fazer logout.' } 
      },
      { status: 500 }
    );
  }
}
