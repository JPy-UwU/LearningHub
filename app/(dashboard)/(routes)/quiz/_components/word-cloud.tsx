"use client";

import { useRouter } from "next/navigation";
import React from "react";
import ReactWordcloud from 'react-wordcloud';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const fontSizeMapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const WordCloud = ({
  formattedTopics 
}: {
  formattedTopics: { text: string; value: number }[];
}) => {
  const router = useRouter();
  
  return (
    <>
      {/* <D3WordCloud
        data={formattedTopics}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={0}
        padding={10}
        fill={"white"}
        onWordClick={(e, d) => {
          router.push("/quiz?topic=" + d.text);
        }}
      /> */}
      <
        ReactWordcloud
        words={formattedTopics}
        options={{
          fontSizes: [16, 80],
          rotations: 0,
          rotationAngles: [0, 0],
          enableTooltip: true,
          deterministic: true,
          padding: 1,
          fontFamily: "Times",
          spiral: "rectangular",
          scale: "log",
          transitionDuration: 1000,
        }}
        callbacks={{
          onWordClick: (word) => {
            router.push("/quiz?topic=" + word.text);
          },
        }}
      />
    </>
  );
};

export default WordCloud;
