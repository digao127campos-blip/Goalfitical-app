import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Criar cliente Supabase no backend (seguro)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, goal_type, activity_level } = await request.json();

    // Validar entrada
    if (!name || !email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: { message: 'Todos os campos são obrigatórios.' } 
        },
        { status: 400 }
      );
    }

    // Criar usuário no Supabase
    const { data, error } = await supabaseAdmin.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          goal_type: goal_type || 'lose_weight',
          activity_level: activity_level || 'moderate',
        },
      },
    });

    if (error) {
      // Retornar mensagem amigável
      if (error.message.includes('already registered')) {
        return NextResponse.json(
          { 
            success: false, 
            error: { message: 'Este email já está cadastrado.' } 
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { 
          success: false, 
          error: { message: 'Erro ao criar conta. Tente novamente.' } 
        },
        { status: 400 }
      );
    }

    // Sucesso - retornar dados do usuário
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: data.user?.id,
          email: data.user?.email,
          name,
        },
        token: data.session?.access_token || '',
        refreshToken: data.session?.refresh_token || '',
      },
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: { message: 'Erro ao criar conta. Tente novamente.' } 
      },
      { status: 500 }
    );
  }
}
