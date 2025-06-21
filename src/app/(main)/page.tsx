"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_NAME, APP_DESCRIPTION, NAVIGATION_ITEMS, MOCK_WEATHER_DATA } from "@/lib/constants";
import { ArrowRight, CloudSun, Thermometer, Droplets, Wind } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  const quickAccessItems = NAVIGATION_ITEMS.filter(item => item.href !== '/');

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">{APP_NAME}</CardTitle>
          <CardDescription className="text-lg">{APP_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            কৃষি রক্ষক অ্যাপে স্বাগতম! আপনার ফসলের সুরক্ষায় আমরা আছি আপনার পাশে। আধুনিক প্রযুক্তি ব্যবহার করে ফসলের রোগ নির্ণয়, আবহাওয়ার পূর্বাভাস এবং সময়োপযোগী কৃষি তথ্য পেতে সাহায্য করবে এই অ্যাপ।
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudSun className="h-6 w-6 text-accent" />
              আবহাওয়ার পূর্বাভাস
            </CardTitle>
            <CardDescription>{MOCK_WEATHER_DATA.current.location}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-4xl font-bold">{MOCK_WEATHER_DATA.current.temperature}°C</p>
                <p className="text-sm text-muted-foreground">{MOCK_WEATHER_DATA.current.description}</p>
              </div>
              <MOCK_WEATHER_DATA.current.icon className="h-12 w-12 text-accent" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground"><Droplets className="h-4 w-4" />আর্দ্রতা:</span>
                <span>{MOCK_WEATHER_DATA.current.humidity}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1 text-muted-foreground"><Wind className="h-4 w-4" />বাতাসের গতি:</span>
                <span>{MOCK_WEATHER_DATA.current.windSpeed} কিমি/ঘন্টা</span>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              {MOCK_WEATHER_DATA.forecast.slice(0, 2).map(dayForecast => (
                <div key={dayForecast.day} className="flex justify-between text-xs p-1 rounded bg-muted/50">
                  <span>{dayForecast.day}</span>
                  <span className="flex items-center gap-1"><dayForecast.icon className="w-3 h-3" /> {dayForecast.description}</span>
                  <span>{dayForecast.tempMax}°/{dayForecast.tempMin}°</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground p-2 border border-dashed rounded-md bg-background">{MOCK_WEATHER_DATA.advice}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>দ্রুত এক্সেস</CardTitle>
            <CardDescription>গুরুত্বপূর্ণ সেবাসমূহ</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            {quickAccessItems.map((item) => (
              <Button key={item.name} variant="outline" className="justify-start" asChild>
                <Link href={item.href} className="flex items-center gap-3 text-left">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span>{item.name}</span>
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1 md:col-span-2">
           <CardHeader>
            <CardTitle>কৃষি টিপস</CardTitle>
            <CardDescription>আজকের জন্য গুরুত্বপূর্ণ পরামর্শ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Image src="/images/tips.jpg" alt="কৃষি টিপস" width={600} height={400} className="rounded-lg object-cover aspect-video" data-ai-hint="farming agriculture" />
            <h3 className="font-semibold">সঠিক সময়ে বীজ বপন</h3>
            <p className="text-sm text-muted-foreground">
              এই মৌসুমে সময়মতো বীজ বপন করলে ভালো ফলন পাওয়া যায়। মাটির আদ্রতা পরীক্ষা করে এবং আবহাওয়ার পূর্বাভাস দেখে বীজ বপনের সঠিক দিন নির্ধারণ করুন।
            </p>
            <Button variant="link" className="p-0 h-auto text-primary" asChild>
              <Link href="/crop-calendar">আরো জানুন <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
