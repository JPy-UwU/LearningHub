import React from "react";
import { db } from "@/lib/db";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WordCloud from "./word-cloud";

const HotTopicsCard = async () => {
  const topics = await db.topic_count.findMany({});
  const formattedTopics = topics.map((topic) => {
    return {
      text: topic.topic,
      value: topic.count,
    };
  });
  
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl">
          Hot Topics
        </CardTitle>
        <CardDescription className="text-sm text-slate-600 text-muted-foreground">
          See what topics are trending in the community.
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <WordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;