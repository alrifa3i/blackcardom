
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MembershipRegistration from './MembershipRegistration';
import MemberLogin from './MemberLogin';
import AppleCard from './AppleCard';

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
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Registration Form - Left Side */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 shadow-xl">
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

          {/* Sample Card - Right Side */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <AppleCard 
                memberName="عضو مميز"
                cardNumber="1234 5678 9012"
                expiryDate="12/27"
                isPersonalized={true}
                cvv="123"
              />
              
              {/* Floating elements around the card */}
              <div className="absolute -top-4 -left-4 floating">
                <div className="w-8 h-8 bg-yellow-500/20 rounded-full blur-lg"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 floating" style={{animationDelay: '2s'}}>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-full blur-xl"></div>
              </div>
              <div className="absolute top-1/2 -left-8 floating" style={{animationDelay: '1s'}}>
                <div className="w-6 h-6 bg-yellow-500/15 rounded-full blur-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
