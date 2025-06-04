
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MembershipRegistration from './MembershipRegistration';
import MemberLogin from './MemberLogin';

const AuthSection = () => {
  return (
    <section className="py-16 md:py-20 bg-black" id="auth">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            انضم إلى <span className="gradient-text">The Black Card</span> الآن
          </h2>
          <p className="text-gray-300 max-w-3xl">
            احصل على بطاقة العضوية الخاصة بك للاستفادة من جميع خدماتنا المميزة والعروض الحصرية
          </p>
        </div>
        
        <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 shadow-xl">
          <Tabs defaultValue="register" className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="register">تسجيل جديد</TabsTrigger>
              <TabsTrigger value="login">تسجيل دخول</TabsTrigger>
            </TabsList>
            <TabsContent value="register">
              <MembershipRegistration />
            </TabsContent>
            <TabsContent value="login">
              <MemberLogin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
