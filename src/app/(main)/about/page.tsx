
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageShell } from '@/components/shared/PageShell';
import { Github, Linkedin, Mail, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Added Button import

const developerInfo = {
  name: "ISMAIL HOSSAIN",
  title: "সফটওয়্যার ইঞ্জিনিয়ার",
  bio: "আমি একজন উৎসাহী সফটওয়্যার ইঞ্জিনিয়ার, কৃষিক্ষেত্রে প্রযুক্তিগত সমাধান আনতে আগ্রহী। এই অ্যাপটি কৃষকদের আধুনিক প্রযুক্তির মাধ্যমে সহায়তা করার একটি প্রচেষ্টা। আমার লক্ষ্য হলো এমন টুল তৈরি করা যা ব্যবহার করা সহজ এবং কৃষিকাজের উন্নতিতে সহায়ক হয়।",
  avatarUrl: "https://scontent.fdac138-2.fna.fbcdn.net/v/t39.30808-6/469604668_1791049765046860_3285962025710602545_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGz54RlSVztzZzIMJvzuQ2925H4lkHimt3bkfiWQeKa3dIgf3QBT1drKccJ4OQo-FR3xqBvQ12vHZ5nuGPVS7Nw&_nc_ohc=Rne4-l-l6RYQ7kNvwE_jotK&_nc_oc=AdljdmxtM-DEEuV_JAwWEIai74nh_4eG4hpDe80HahaeFVbk3wTCgUrGY3fYut7Cqc0&_nc_zt=23&_nc_ht=scontent.fdac138-2.fna&_nc_gid=Y3qGw5kvlHZ7An9nSBEOmg&oh=00_AfLXfsAW4JoILM3tovDrOiBIg7TzfXeDP2h-364hW6fB3w&oe=682E41A0", // Replace with actual image URL
  avatarFallback: "KA",
  contact: {
    email: "ismailbdih57@gmail.com",
    github: "https://github.com/imDarkceus",
    linkedin: "https://linkedin.com/in/ih31",
  },
  skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Genkit AI", "Firebase", "Flutter", "Java"],
  projects: [
    { name: "কৃষি রক্ষক", description: "ফসলের রোগ নির্ণয় ও কৃষি সহায়তার জন্য একটি আধুনিক ওয়েব অ্যাপ।" },
    { name: "অন্যান্য প্রজেক্ট", description: "কৃষি তথ্য এবং স্থানীয় বাজার সংযোগের প্ল্যাটফর্ম (পরিকল্পনাধীন)।" },
  ],
};

export default function AboutPage() {
  return (
    <PageShell title="আমাদের সম্পর্কে" description="এই অ্যাপ এবং এর ডেভেলপারের পেছনের গল্প জানুন।">
      <div className="space-y-8">
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-muted/30 p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-2 border-primary shadow-md" data-ai-hint="profile photo">
                <AvatarImage src={developerInfo.avatarUrl} alt={developerInfo.name} />
                <AvatarFallback>{developerInfo.avatarFallback}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl text-primary">{developerInfo.name}</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">{developerInfo.title}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-foreground leading-relaxed">
              {developerInfo.bio}
            </p>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2"><Mail className="h-5 w-5" />যোগাযোগ</h3>
              <ul className="list-none space-y-1 pl-0">
                <li>ইমেইল: <a href={`mailto:${developerInfo.contact.email}`} className="text-accent hover:underline">{developerInfo.contact.email}</a></li>
                <li>গিটহাব: <a href={developerInfo.contact.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{developerInfo.contact.github}</a></li>
                <li>লিঙ্কডইন: <a href={developerInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{developerInfo.contact.linkedin}</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2"><Briefcase className="h-5 w-5" /> দক্ষতা</h3>
              <div className="flex flex-wrap gap-2">
                {developerInfo.skills.map(skill => (
                  <span key={skill} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center gap-2"><Briefcase className="h-5 w-5" />উল্লেখযোগ্য প্রজেক্ট</h3>
              {developerInfo.projects.map(project => (
                <Card key={project.name} className="bg-muted/20">
                  <CardHeader className="p-4">
                    <CardTitle className="text-md">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>অ্যাপ সম্পর্কে</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              এই "কৃষি রক্ষক" অ্যাপটি তৈরি করা হয়েছে বাংলাদেশের কৃষকদের সহায়তা করার জন্য। এর মাধ্যমে কৃষকরা সহজেই তাদের ফসলের রোগ শনাক্ত করতে পারবেন, আবহাওয়ার পূর্বাভাস পাবেন, ফসল রোপণ ও পরিচর্যার সময়সূচী জানতে পারবেন এবং কৃষি বিষয়ক বিভিন্ন প্রশ্নের উত্তর পাবেন। আমাদের লক্ষ্য হলো প্রযুক্তির সঠিক ব্যবহারের মাধ্যমে কৃষিক্ষেত্রে উৎপাদন বৃদ্ধি এবং কৃষকদের জীবনযাত্রার মান উন্নয়ন করা।
            </p>
            <p className="mt-4 text-muted-foreground">
              আমরা প্রতিনিয়ত এই অ্যাপটিকে আরও উন্নত করার চেষ্টা করছি এবং নতুন নতুন ফিচার যুক্ত করছি। আপনার যেকোনো মতামত ও পরামর্শ আমাদের জন্য মূল্যবান।
            </p>
             <Link href="/voice-assistant" className="mt-4 inline-block">
                <Button variant="outline">সহায়কের সাথে কথা বলুন</Button>
             </Link>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
