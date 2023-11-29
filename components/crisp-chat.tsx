"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a95b6886-2bcc-4c14-a860-87c4f1086e48");
  }, []);

  return null;
}