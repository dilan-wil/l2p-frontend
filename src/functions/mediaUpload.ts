"use client"

import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { storage } from "./firebase" // your firebase init
// import { v4 as uuidv4 } from "uuid" // optional for unique IDs

// ---- TYPES ----
export interface UploadProgress {
  percentage: number
  transferred: number
  total: number
}

export interface MediaMetadata {
  id: string
  url: string
  type: "thumbnail" | "preview" | "video" | "image"
  courseId?: string
  name: string
  size: number
  contentType: string
  createdAt: number
}

// ---- UPLOAD FILE ----
export async function uploadMediaFile(
  file: File,
  type: "thumbnail" | "preview" | "video" | "image",
  courseId?: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<MediaMetadata> {
  return new Promise((resolve, reject) => {
    try {
      // create unique path
      const id = `${courseId || "general"}/${Date.now()}-${file.name}`
      const storageRef = ref(storage, `${type}/${id}`)

      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (onProgress) {
            const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            onProgress({
              percentage: Math.round(percentage),
              transferred: snapshot.bytesTransferred,
              total: snapshot.totalBytes,
            })
          }
        },
        (error) => {
          reject(error)
        },
        async () => {
          // finished
          const url = await getDownloadURL(uploadTask.snapshot.ref)
          const metadata: MediaMetadata = {
            id,
            url,
            type,
            courseId,
            name: file.name,
            size: file.size,
            contentType: file.type,
            createdAt: Date.now(),
          }
          resolve(metadata)
        }
      )
    } catch (err) {
      reject(err)
    }
  })
}

// ---- DELETE FILE ----
export async function deleteMediaFile(mediaId: string): Promise<void> {
  const fileRef = ref(storage, mediaId)
  await deleteObject(fileRef)
}
