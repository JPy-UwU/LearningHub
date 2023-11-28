"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Joe",
    avatar: "J",
    title: "Student",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Rishi",
    avatar: "R",
    title: "Software Developer",
    description: "This app has changed my life, cannot imagine working without it!",
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Designer",
    description: "I use this daily for learning new skills!",
  },
  {
    name: "Pallavi",
    avatar: "P",
    title: "Intern",
    description: "The best in class, definitely worth the premium subscription!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <div className="flex gap-x-2">
                    <div className="rounded-full text-slate-700 bg-gradient-to-t from-slate-50 to-slate-300 h-8 w-8 flex items-center justify-center">
                      {item.avatar}
                    </div>
                    <p className="text-lg">{item.name}</p>
                  </div>
                  <p className="text-zinc-400 text-sm mt-2">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}