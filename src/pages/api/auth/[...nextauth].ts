import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ucfytyefgzmmqjkvzmlg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjZnl0eWVmZ3ptbXFqa3Z6bWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5Mjc1NzQsImV4cCI6MjA1NzUwMzU3NH0.Se7GuIxOVV63EBPzXUJxgVv5tbfpLfk4zngTfuaQruk";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default NextAuth(authOptions);
