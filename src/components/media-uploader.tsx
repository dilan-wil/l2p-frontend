"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { useMediaUpload } from "@/hooks/useMediaUpload"
import { Button } from "@/components/ui/button" // shadcn button

interface MediaUploaderProps {
  setMedia: (url: string | null) => void
  type?: "thumbnail" | "preview" | "video" | "image"
  courseId?: string
}

export default function MediaUploader({
  setMedia,
  type = "image",
  courseId,
}: MediaUploaderProps) {
  const { uploadFile, deleteFile, uploading, progress, error, clearError } = useMediaUpload()
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadedId, setUploadedId] = useState<string | null>(null) // keep firebase id

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return
      const file = acceptedFiles[0]

      // local preview
      setPreview(URL.createObjectURL(file))

      try {
        const metadata = await uploadFile(file, type, courseId)
        if (metadata?.url) {
          setMedia(metadata.url)
          setUploadedId(metadata.id)
        }
      } catch (err) {
        console.error("Upload failed:", err)
      }
    },
    [uploadFile, setMedia, type, courseId],
  )

  const handleDelete = async () => {
    if (uploadedId) {
      try {
        await deleteFile(`${type}/${uploadedId}`)
      } catch (err) {
        console.error("Delete failed:", err)
      }
    }
    setPreview(null)
    setMedia(null)
    setUploadedId(null)
  }

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true, // disable click on container, we'll handle with "Change" button
    noKeyboard: true,
  })

  return (
    <div className="w-full max-w-lg mx-auto">
      {!preview ? (
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-2xl p-6 cursor-pointer transition 
          border-gray-300 bg-gray-50 hover:bg-gray-100 text-center"
        >
          <input {...getInputProps()} />
          <p className="text-gray-500">Drag & drop a file here, or click to select</p>
          <Button onClick={open} className="mt-3">Choose File</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-full max-h-[300px] overflow-hidden rounded-xl shadow">
            {type === "video" ? (
              <video src={preview} controls className="w-full h-auto object-contain" />
            ) : (
              <img src={preview} alt="preview" className="w-full h-auto object-contain" />
            )}
          </div>
          <div className="flex gap-3">
            <Button onClick={open} variant="secondary" className="flex-1">
              Change File
            </Button>
            <Button onClick={handleDelete} variant="destructive" className="flex-1">
              Delete File
            </Button>
          </div>
        </div>
      )}

      {uploading && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Uploading... {progress?.percentage || 0}%</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${progress?.percentage || 0}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-red-500 text-sm">
          {error}
          <button onClick={clearError} className="underline ml-2">clear</button>
        </div>
      )}
    </div>
  )
}
