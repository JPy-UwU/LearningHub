"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const FileUpload = ({ 
  onChange, endpoint
}: {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(err) => {
        toast.error(err.message);
      }}
    />
  );
};