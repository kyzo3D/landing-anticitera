import { ButtonScrollToBottom } from '@/app/chat/components/button-scroll-to-bottom'
import { PromptForm } from '@/app/chat/components/prompt-form'
import { BackgroundGradient } from '@/components/ui/background-gradient'

export interface ChatPanelProps {
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  input: string
  isAtBottom: boolean
  isLoading: boolean
  scrollToBottom: () => void
  setInput: (input: string) => void
  stop: () => void
}

export function ChatPanel({
  handleInputChange,
  handleSubmit,
  input,
  isAtBottom,
  isLoading,
  scrollToBottom,
  setInput,
  stop
}: ChatPanelProps) {
  return (
    <div className='absolute inset-x-0 bottom-4 w-full peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]'>
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className='mx-auto sm:max-w-2xl sm:px-4 lg:max-w-3xl'>
        <BackgroundGradient className='space-y-4 bg-background px-4 py-2 shadow-lg sm:rounded-t-xl md:py-4'>
          <PromptForm
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            input={input}
            setInput={setInput}
            stop={stop}
          />
        </BackgroundGradient>
      </div>
    </div>
  )
}
