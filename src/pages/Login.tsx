
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        navigate("/workout-log");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <Link to="/" className="inline-flex items-center text-blue-400 mb-6">
        <ArrowLeft className="mr-2" size={20} /> Back to Home
      </Link>
      
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input 
                        placeholder="Enter your email" 
                        className="pl-10 bg-gray-800 border-gray-700" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="pl-10 bg-gray-800 border-gray-700" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
                  )}
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p>Don't have an account? <Link to="/signup" className="text-blue-400">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
