import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

import { cn, fileArrayToFileList } from '@/lib/utils'

const mainVariant = {
  initial: {
    x: 0,
    y: 0
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9
  }
}

const secondaryVariant = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  }
}

export const FileUpload = ({
  componentFiles,
  fileInputRef,
  setComponentFiles,
  setFiles,
  setOpen
}: {
  componentFiles: File[]
  fileInputRef: React.RefObject<HTMLInputElement>
  setComponentFiles: (files: File[]) => void
  setFiles: (files: FileList) => void
  setOpen: (open: boolean) => void
}) => {
  const handleFileChange = (newFiles: File[]) => {
    const updatedFiles = [...componentFiles, ...newFiles]
    setFiles(fileArrayToFileList(updatedFiles))
    setComponentFiles(updatedFiles)
    toast.success('File uploaded successfully')
    setOpen(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    accept: {
      // TODO: add more file types
      'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.webp'], // image
      'application/pdf': ['.pdf'], // pdf
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a', 'mpeg'] // audio
    },
    maxSize: 5 * 1024 * 1024, // 5 MB
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (files) => {
      for (const file of files) {
        for (const error of file.errors) {
          toast.error(error.code + ': ' + error.message)
        }
      }
    }
  })

  return (
    <div className='w-full' {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover='animate'
        className='group/file relative block w-full cursor-pointer overflow-hidden rounded-lg p-10'
      >
        <input
          ref={fileInputRef}
          id='file-upload-handle'
          type='file'
          multiple
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className='hidden'
        />
        <div className='absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]'>
          <GridPattern />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='relative z-20 font-sans text-base font-bold text-foreground/90'>
            Upload file
          </p>
          <p className='relative z-20 mt-2 font-sans text-base font-normal text-foreground/60'>
            Drag and drop your files here or click to upload
          </p>
          <div className='relative mx-auto mt-10 w-full max-w-xl'>
            <motion.div
              layoutId='file-upload'
              variants={mainVariant}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              className='relative z-40 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-foreground/60 bg-transparent shadow-[0px_10px_50px_rgba(0,0,0,0.1)] group-hover/file:shadow-2xl'
            >
              {isDragActive ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className='flex flex-col items-center text-foreground/80'
                >
                  Drop it
                  <Upload className='h-4 w-4 text-foreground/80' />
                </motion.p>
              ) : (
                <Upload className='h-4 w-4 text-foreground/80' />
              )}
            </motion.div>

            <motion.div
              variants={secondaryVariant}
              className='absolute inset-0 z-30 mx-auto mt-4 flex h-32 w-full max-w-[8rem] items-center justify-center rounded-md border border-dashed border-foreground/20 bg-transparent opacity-0'
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export function GridPattern() {
  const columns = 41
  const rows = 11
  return (
    <div className='flex size-full flex-shrink-0 scale-105 flex-wrap items-center justify-center gap-x-px gap-y-px bg-background/80'>
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col
          return (
            <div
              key={`${col}-${row}`}
              className={`flex h-10 w-10 flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? 'bg-background/90'
                  : 'bg-background/90 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]'
              }`}
            />
          )
        })
      )}
    </div>
  )
}
