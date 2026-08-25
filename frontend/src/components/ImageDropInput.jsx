import React, { useState, useRef, useCallback } from "react";
import { Upload, X, ImagePlus } from "lucide-react";

const MAX_IMAGES = 4;
const MAX_SIZE_MB = 8;
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"];

/**
 * ImageDropInput
 * Drag-and-drop (or click-to-browse) image uploader, capped at 4 images.
 *
 * Props:
 *  - value:    array of { id, file, url } — controlled list of images (optional)
 *  - onChange: (images) => void — called whenever the list changes
 *  - maxImages: number, default 4
 */
export default function ImageDropInput({ value, onChange, maxImages = MAX_IMAGES }) {
  const [internalImages, setInternalImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const dragCounter = useRef(0);
  const inputRef = useRef(null);

  const images = value !== undefined ? value : internalImages;
  const setImages = (next) => {
    if (onChange) onChange(next);
    if (value === undefined) setInternalImages(next);
  };

  const remainingSlots = maxImages - images.length;

  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" isn't a supported image type.`;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `"${file.name}" is over ${MAX_SIZE_MB}MB.`;
    }
    return null;
  };

  const addFiles = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList);
      if (incoming.length === 0) return;

      if (remainingSlots <= 0) {
        setError(`You can only add up to ${maxImages} images.`);
        return;
      }

      const accepted = [];
      let firstError = "";

      for (const file of incoming) {
        if (accepted.length >= remainingSlots) {
          firstError = `Only ${maxImages} images allowed — some files were skipped.`;
          break;
        }
        const validationError = validateFile(file);
        if (validationError) {
          firstError = firstError || validationError;
          continue;
        }
        accepted.push({
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          file,
          url: URL.createObjectURL(file),
        });
      }

      if (accepted.length > 0) {
        setImages([...images, ...accepted]);
      }
      setError(firstError);
    },
    [images, remainingSlots, maxImages] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    if (e.dataTransfer?.files?.length) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBrowseClick = () => {
    if (remainingSlots <= 0) return;
    inputRef.current?.click();
  };

  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      addFiles(e.target.files);
    }
    e.target.value = "";
  };

  const removeImage = (id) => {
    const target = images.find((img) => img.id === id);
    if (target?.url) URL.revokeObjectURL(target.url);
    setImages(images.filter((img) => img.id !== id));
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleBrowseClick();
    }
  };

  const isFull = remainingSlots <= 0;

  return (
    <div className="w-full max-w-xl">
      {isFull ? null : (
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload images, drag and drop or click to browse"
          onClick={handleBrowseClick}
          onKeyDown={handleKeyDown}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          className={[
            "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors cursor-pointer outline-none",
            isDragging
              ? "border-indigo-500 bg-indigo-50"
              : "border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100",
            "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          ].join(" ")}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            multiple
            onChange={handleInputChange}
            className="hidden"
          />
          <div
            className={[
              "flex h-12 w-12 items-center justify-center rounded-full",
              isDragging ? "bg-indigo-100 text-indigo-600" : "bg-slate-200 text-slate-500",
            ].join(" ")}
          >
            {isDragging ? <ImagePlus size={22} /> : <Upload size={20} />}
          </div>
          <p className="text-sm font-medium text-slate-700">
            {isDragging ? "Drop your images here" : "Drag and drop images, or click to browse"}
          </p>
          <p className="text-xs text-slate-400">
            PNG, JPG, WEBP or GIF · up to {MAX_SIZE_MB}MB · {remainingSlots} of {maxImages} slot
            {maxImages === 1 ? "" : "s"} left
          </p>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
            >
              <img
                src={img.url}
                alt={img.file?.name || "Uploaded preview"}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(img.id)}
                aria-label={`Remove ${img.file?.name || "image"}`}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/80"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {isFull &&
            null /* full grid already shown; no placeholder needed since dropzone is hidden */}
        </div>
      )}

      {isFull && (
        <p className="mt-2 text-xs text-slate-400">
          Maximum of {maxImages} images reached. Remove one to add another.
        </p>
      )}
    </div>
  );
}
