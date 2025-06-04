
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AppleCard from '@/components/AppleCard';
import { generateCardNumber, generateCVV, calculateExpiryDate } from '@/utils/cardUtils';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يحتوي على حرفين على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
});

const MembershipRegistration = () => {
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  const [memberData, setMemberData] = useState<{
    name: string;
    email: string;
    cardNumber: string;
    cvv: string;
    expiryDate: string;
  }>({ name: "", email: "", cardNumber: "", cvv: "", expiryDate: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Generate card data
    const cardNumber = generateCardNumber();
    const cvv = generateCVV();
    const expiryDate = calculateExpiryDate();
    
    // Store member data
    const newMemberData = {
      ...values,
      cardNumber,
      cvv,
      expiryDate
    };
    
    setMemberData(newMemberData);
    setIsRegistered(true);
    
    // In a real app, here you would send this data to the server
    // and send an email to the user with their CVV code
    
    // Simulate email sent
    toast({
      title: "تم التسجيل بنجاح!",
      description: `تم إرسال رمز التحقق CVV إلى ${values.email}`,
      duration: 5000,
    });
    
    setShowSuccess(true);
  }
  
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-8 p-4">
      <div className="text-center w-full">
        <h2 className="text-2xl font-bold mb-4">سجل واحصل على بطاقة العضوية</h2>
        <p className="text-gray-500 dark:text-gray-400">
          احصل على بطاقة العضوية الخاصة بك الآن للاستفادة من العروض الحصرية والخدمات المميزة
        </p>
      </div>

      {!isRegistered ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right block">الاسم الكامل</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل اسمك الكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-right block">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input placeholder="example@example.com" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    سيتم إرسال رمز التحقق CVV إلى بريدك الإلكتروني
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              تسجيل وإنشاء البطاقة
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col items-center space-y-6 w-full">
          <AppleCard 
            memberName={memberData.name}
            cardNumber={memberData.cardNumber}
            expiryDate={memberData.expiryDate}
            isPersonalized={true}
            cvv={memberData.cvv}
          />
          
          <div className="text-center w-full bg-black border border-yellow-500/30 p-4 rounded-md">
            <p className="mb-2">تم إرسال رمز التحقق CVV المكون من 3 أرقام إلى بريدك الإلكتروني</p>
            <div className="flex justify-center items-center gap-2">
              <Mail className="text-yellow-500 h-5 w-5" />
              <span className="text-yellow-500">{memberData.email}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>استخدم بريدك الإلكتروني مع رمز التحقق CVV للدخول إلى حسابك</p>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تم التسجيل بنجاح!</DialogTitle>
            <DialogDescription>
              معلومات بطاقتك:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">الاسم:</div>
              <div>{memberData.name}</div>
              <div className="font-medium">البريد الإلكتروني:</div>
              <div>{memberData.email}</div>
              <div className="font-medium">رقم البطاقة:</div>
              <div dir="ltr">{memberData.cardNumber}</div>
              <div className="font-medium">تاريخ الانتهاء:</div>
              <div dir="ltr">{memberData.expiryDate}</div>
              <div className="font-medium">رمز التحقق CVV:</div>
              <div dir="ltr">{memberData.cvv}</div>
            </div>
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 text-yellow-800">
              <p className="text-sm">تم إرسال رمز التحقق CVV إلى بريدك الإلكتروني. استخدم هذا الرمز مع بريدك الإلكتروني لتسجيل الدخول.</p>
            </div>
            <Button className="w-full" onClick={handleCloseSuccess}>
              حسنًا، فهمت
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MembershipRegistration;
