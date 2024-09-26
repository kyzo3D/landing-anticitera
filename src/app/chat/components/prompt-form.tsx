'use client'

import {
  ArrowUp,
  File,
  FileAudio2,
  Paperclip,
  Plus,
  Square,
  XIcon
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Textarea from 'react-textarea-autosize'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { FileUpload } from '@/components/ui/file-upload'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'

export function PromptForm({
  handleInputChange,
  handleSubmit,
  isLoading,
  input,
  setInput,
  stop
}: {
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    data?: Record<string, unknown>
  ) => void
  isLoading: boolean
  input: string
  setInput: (input: string) => void
  stop: () => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const [files, setFiles] = useState<FileList | undefined>(undefined)
  const [componentFiles, setComponentFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  const [isHoveringTextarea, setIsHoveringTextarea] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.addEventListener('mouseover', () => {
        setIsHoveringTextarea(true)
      })
      formRef.current.addEventListener('mouseleave', () => {
        setIsHoveringTextarea(false)
      })
    }
  }, [formRef])

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        handleSubmit(event, {
          experimental_attachments: files
        })

        setFiles(undefined)
        setComponentFiles([])

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }}
    >
      <div className='relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12'>
        <div
          className={cn('flex gap-4 py-4 pl-12', {
            hidden: !componentFiles.length
          })}
        >
          {componentFiles?.map((file, i) => (
            <div key={i} className='relative'>
              {file.type === 'image/png' ||
              file.type === 'image/jpeg' ||
              file.type === 'image/jpg' ||
              file.type === 'image/svg+xml' ||
              file.type === 'image/webp' ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt='file'
                  className='h-12 w-12'
                />
              ) : file.type === 'application/pdf' ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={URL.createObjectURL(file)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex h-12 w-12 items-center justify-center bg-muted hover:bg-muted/80'
                    >
                      <File className='h-8 w-8' />
                      <span className='sr-only'>PDF file</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{file.name}</TooltipContent>
                </Tooltip>
              ) : file.type === 'audio/mp3' ||
                file.type === 'audio/wav' ||
                file.type === 'audio/ogg' ||
                file.type === 'audio/m4a' ||
                file.type === 'audio/mpeg' ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={URL.createObjectURL(file)}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex h-12 w-12 items-center justify-center bg-muted hover:bg-muted/80'
                    >
                      <FileAudio2 className='h-8 w-8' />
                      <span className='sr-only'>Audio file</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{file.name}</TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className='flex h-12 w-12 items-center justify-center bg-muted hover:bg-muted/80'>
                      <File className='h-8 w-8' />
                      <span className='sr-only'>File</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{file.name}</TooltipContent>
                </Tooltip>
              )}

              <button
                className={cn(
                  'absolute -right-2.5 -top-2.5 items-center justify-center rounded-full border border-muted-foreground bg-muted p-0.5 hover:border-muted-foreground/80 hover:bg-muted/80 hover:text-foreground/80',
                  {
                    hidden: !isHoveringTextarea
                  }
                )}
                onClick={() => {
                  const newComponentFiles = componentFiles.filter(
                    (_, idx) => idx !== i
                  )
                  setComponentFiles(newComponentFiles)

                  const dataTransfer = new DataTransfer()
                  newComponentFiles.forEach((file) =>
                    dataTransfer.items.add(file)
                  )
                  setFiles(dataTransfer.files)
                }}
              >
                <XIcon className='h-4 w-4' />
              </button>
            </div>
          ))}
        </div>
        <div className='absolute bottom-4 left-0 flex items-center gap-2 sm:left-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='size-8 rounded-full bg-background p-0'
                onClick={() => {
                  router.push('/chat/new')
                }}
              >
                <Plus className='h-4 w-4' />
                <span className='sr-only'>New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New chat</TooltipContent>
          </Tooltip>
          <Tooltip>
            <Dialog open={open} onOpenChange={setOpen}>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant='outline'
                    size='icon'
                    className='size-8 rounded-full bg-background p-0'
                  >
                    <Paperclip className='h-3.5 w-3.5 pl-px' />
                    <span className='sr-only'>Attach files</span>
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Attach files</TooltipContent>
              <DialogContent>
                <div className='mx-auto h-full min-h-80 w-full max-w-4xl rounded-lg border border-dashed border-muted bg-background'>
                  <FileUpload
                    componentFiles={componentFiles}
                    fileInputRef={fileInputRef}
                    setComponentFiles={setComponentFiles}
                    setFiles={setFiles}
                    setOpen={setOpen}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </Tooltip>
        </div>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onChange={(e) => {
            setInput(e.target.value)
            handleInputChange(e)
          }}
          onKeyDown={onKeyDown}
          placeholder='Send a message.'
          className='h-[60px] w-full resize-none overflow-hidden bg-transparent py-[1.3rem] pl-12 pr-4 focus-within:outline-none sm:text-sm'
          autoFocus
          spellCheck={false}
          autoComplete='off'
          autoCorrect='off'
          name='message'
          value={input}
        />

        <div className='absolute right-0 top-[13px] sm:right-4'>
          <Tooltip>
            <TooltipTrigger asChild>
              {isLoading ? (
                <Button size='icon' onClick={stop} className='rounded-full'>
                  <Square className='h-3 w-3 fill-primary-foreground' />
                  <span className='sr-only'>Stop generating</span>
                </Button>
              ) : (
                <Button
                  type='submit'
                  size='icon'
                  disabled={input === ''}
                  className='rounded-full'
                >
                  <ArrowUp className='h-4 w-4' />
                  <span className='sr-only'>Send message</span>
                </Button>
              )}
            </TooltipTrigger>
            <TooltipContent>
              {isLoading ? 'Stop generating' : 'Send message'}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
