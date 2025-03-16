
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      
      // Register the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
          }
        }
      });

      if (authError) {
        toast({
          title: "Registration Failed",
          description: authError.message,
          variant: "destructive",
        });
        return;
      }

      if (authData.user) {
        // Create a profile entry in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: authData.user.id, 
              username: values.name,
              email: values.email
            }
          ]);

        if (profileError) {
          console.error("Profile creation error:", profileError);
        }

        toast({
          title: "Account Created",
          description: "Your account has been successfully created. Please check your email for verification.",
        });
        
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
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
        <h1 className="text-3xl font-bold mb-6 text-center">Create Account</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input 
                        placeholder="Enter your name" 
                        className="pl-10 bg-gray-800 border-gray-700" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </FormItem>
              )}
            />
            
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
                        placeholder="Create a password" 
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
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 text-gray-400" size={16} />
                      <Input 
                        type="password" 
                        placeholder="Confirm your password" 
                        className="pl-10 bg-gray-800 border-gray-700" 
                        {...field}
                      />
                    </div>
                  </FormControl>
                  {form.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.confirmPassword.message}</p>
                  )}
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 text-center">
          <p>Already have an account? <Link to="/login" className="text-blue-400">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
