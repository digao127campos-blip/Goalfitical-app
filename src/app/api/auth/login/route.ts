import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Criar cliente Supabase no backend (seguro)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validar entrada
    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: { message: 'Email ou senha inválidos.' } 
        },
        { status: 400 }
      );
    }

    // Autenticar com Supabase
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Retornar mensagem genérica (não expor detalhes técnicos)
      return NextResponse.json(
        { 
          success: false, 
          error: { message: 'Email ou senha inválidos.' } 
        },
        { status: 401 }
      );
    }

    // Sucesso - retornar dados do usuário e tokens
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || '',
        },
        token: data.session.access_token,
        refreshToken: data.session.refresh_token,
      },
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { message: 'Email ou senha inválidos.' } 
      },
      { status: 500 }
    );
  }
}
