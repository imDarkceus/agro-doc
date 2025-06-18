"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MOCK_CROP_CALENDAR, MOCK_CROP_GUIDES } from '@/lib/constants';
import type { CropGuide } from '@/lib/types';
import { PageShell, PageSection } from '@/components/shared/PageShell';
import { CalendarClock, BookOpen, Leaf, Droplets, SprayCan } from 'lucide-react';

const categoryIcons: Record<CropGuide['category'], React.ElementType> = {
  fertilizers: Leaf,
  irrigation: Droplets,
  'pest-control': SprayCan,
};

export default function CropCalendarPage() {
  const guidesByCategory = MOCK_CROP_GUIDES.reduce((acc, guide) => {
    (acc[guide.category] = acc[guide.category] || []).push(guide);
    return acc;
  }, {} as Record<CropGuide['category'], CropGuide[]>);

  return (
    <PageShell title="ফসল ক্যালেন্ডার ও নির্দেশিকা" description="মাসভিত্তিক প্রধান ফসলের বপন ও برداشتের সময়সূচী এবং সার, সেচ ও পোকামাকড় দমন সম্পর্কিত নির্দেশিকা।">
      <div className="space-y-8">
        <PageSection title="মাসিক ফসল ক্যালেন্ডার">
          <Accordion type="single" collapsible className="w-full">
            {MOCK_CROP_CALENDAR.map((entry, index) => (
              <AccordionItem value={`item-${index}`} key={entry.month}>
                <AccordionTrigger className="text-lg font-medium hover:text-primary data-[state=open]:text-primary">
                  <div className="flex items-center gap-2">
                    <CalendarClock className="h-5 w-5" /> {entry.month}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pl-4 list-disc list-inside">
                    {entry.activities.map((activity, actIndex) => (
                      <li key={actIndex} className="text-muted-foreground">
                        <strong className="text-foreground">{activity.crop}:</strong> {activity.task}
                        {activity.details && <p className="text-sm pl-5 text-gray-500">{activity.details}</p>}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </PageSection>

        <PageSection title="কৃষি নির্দেশিকা">
          <div className="space-y-6">
            {Object.entries(guidesByCategory).map(([category, guides]) => {
              const CategoryIcon = categoryIcons[category as CropGuide['category']] || BookOpen;
              const categoryTitle = category === 'fertilizers' ? 'সার ব্যবস্থাপনা' : category === 'irrigation' ? 'সেচ নির্দেশিকা' : 'পোকামাকড় দমন';
              return (
              <div key={category}>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
                  <CategoryIcon className="h-6 w-6" />
                  {categoryTitle}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                {guides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {guide.icon && <guide.icon className="h-5 w-5 text-accent" />}
                        {guide.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{guide.content}</p>
                    </CardContent>
                  </Card>
                ))}
                </div>
              </div>
            )})}
          </div>
        </PageSection>
      </div>
    </PageShell>
  );
}
