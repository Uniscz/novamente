// src/lib/auth.ts
import { supabase } from "./supabase";

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function requireAuth(): Promise<boolean> {
  const session = await getSession();
  if (!session) {
    window.location.hash = "#/login";
    return false;
  }
  return true;
}

export async function signInWithEmail(email: string) {
  try {
    // Magic link
    const { error } = await supabase.auth.signInWithOtp({ 
      email, 
      options: { 
        emailRedirectTo: window.location.origin + "/#/aluno" 
      } 
    });
    
    if (error) {
      console.error("Supabase auth error:", error);
      throw new Error(`Erro de autenticação: ${error.message}`);
    }
    
    return true;
  } catch (error) {
    console.error("Auth function error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Erro desconhecido ao enviar link de autenticação");
  }
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.hash = "#/";
}

