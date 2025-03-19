import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = process.env.SUPABASE_URL!;
export const supabaseKey = process.env.SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export default NextAuth(authOptions);
