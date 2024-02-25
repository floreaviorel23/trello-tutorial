"use client";

import { cn } from "@/lib/utils";
import { unsplash } from "@/lib/unsplash";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";

import { useEffect, useState, useTransition } from "react";
import { UseFormSetValue } from "react-hook-form";

interface FormPickerProps {
  setValue: UseFormSetValue<{
    image: string;
    title: string;
  }>;
}

function FormPicker({ setValue }: FormPickerProps) {
  const [isPending, startTransition] = useTransition();

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState("");

  // Whenever the user selects an image, we set the field value of the form (which is hidden) to what he selected.
  // By using the useEffect() we wait for the value to change, and only
  // after that we set the field to the new state.
  useEffect(() => {
    setValue("image", selectedImageId, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }, [selectedImageId]);

  function onImageClicked(image: any) {
    startTransition(() => {
      setSelectedImageId(image.id);
    });
  }

  // Retrieve 9 pictures using the unsplash API
  // If we fail (because of limited requests), we use the defaultImages we have in our app
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Use this line to use the default images, instead of requesting more from the unsplash API
        // throw new Error("Default images.");

        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response;
          setImages(newImages as any);
        } else {
          console.error("Failed to get images from Unsplash!");
        }
      } catch (error) {
        setImages(defaultImages as any);
      } finally {
        setIsLoading(false);
      }
    };
    // Call the function we just created to fetch the images
    fetchImages();
  }, []);

  // isLoading is true until we have fetched the images or loaded them from our constants
  if (isLoading)
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {/* Iterate over the images */}
        {images.map((image) => (
          <div
            // @ts-ignore
            key={image.id}
            onClick={() => {
              onImageClicked(image);
            }}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              isPending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
          >
            <Image
              sizes="100%"
              fill
              alt="Unsplash image"
              className="object-cover rounded-sm"
              //@ts-ignore
              src={image.urls.thumb}
            />

            {/* Put a check mark over the selected image */}
            {/* @ts-ignore */}
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/40 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}

            {/* Uncomment below if you want to use unsplash in production */}
            {/*
             <Link
              //@ts-ignore
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {
                //@ts-ignore
                image.user.name
              }
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormPicker;
