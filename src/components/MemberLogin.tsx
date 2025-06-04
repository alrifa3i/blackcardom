
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  cvv: z.string().length(3, { message: "رمز التحقق يجب أن يتكون من 3 أرقام" }),
});

const MemberLogin = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      cvv: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // In a real app, here you would verify the credentials with the server
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, always show success
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في منصة The Black Card",
        duration: 3000,
      });
      
      // In a real app, redirect to member dashboard or update authentication state
    }, 1500);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8 p-4">
      <div className="text-center w-full">
        <h2 className="text-2xl font-bold mb-4">تسجيل الدخول</h2>
        <p className="text-gray-500 dark:text-gray-400">
          استخدم بريدك الإلكتروني ورمز التحقق CVV للوصول إلى حسابك
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right block">البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-right block">رمز التحقق CVV</FormLabel>
                <FormControl>
                  <Input placeholder="123" type="password" maxLength={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "جارِ تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MemberLogin;
