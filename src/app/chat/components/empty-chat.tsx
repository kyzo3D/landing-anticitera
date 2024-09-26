import { ArrowRight, RefreshCcw } from 'lucide-react'

const EmptyChat = () => {
  return (
    <div className='mx-auto flex h-[50vh] flex-col justify-center gap-4'>
      <h1 className='text-center text-2xl font-bold'>Welcome to Anticitera!</h1>

      <p className='mx-auto w-2/3 text-balance text-center text-sm text-foreground/80'>
        I'm your personal AI assistant. Ask me anything and I'll do my best to
        help you. If you need a more professional or personalized AI assistant,
        you can click{' '}
        <span className='bg-muted px-0.5 py-0 text-primary'>+</span> to create a
        new custom agent.
      </p>

      <section className='flex justify-between'>
        <p className='mt-4 text-left text-sm text-muted-foreground'>
          Personal agent recommendation:
        </p>
        <button className='pt-4'>
          <RefreshCcw className='h-3.5 w-3.5 text-muted-foreground' />
        </button>
      </section>

      <section className='grid h-2/5 w-full grid-cols-2 gap-2'>
        <div className='col-span-1 flex w-full flex-col items-center justify-center gap-2'>
          <a
            href='#'
            className='h-1/2 w-full cursor-pointer rounded-sm bg-muted hover:bg-muted/70'
          >
            <div className='flex size-full items-center justify-center'>
              <div className='h-full w-1/12'>
                <p className='mx-auto mt-6 text-center text-3xl'>🧑‍🏫</p>
              </div>
              <div className='my-auto flex w-10/12 flex-col items-center justify-center gap-2'>
                <h3 className='mx-auto w-11/12 font-bold'>
                  Backtracking Question Expert
                </h3>
                <p className='mx-auto line-clamp-2 w-11/12 text-ellipsis text-balance text-sm text-muted-foreground'>
                  Hello! I am an expert in world knowledge. I can help you with
                  any question you have about history, geography, science,
                  culture, or any other topic you'd like to know more about.
                  Just ask me anything and I'll do my best to provide you with
                  accurate and helpful information.
                </p>
              </div>
            </div>
          </a>
          <a
            href='#'
            className='h-1/2 w-full cursor-pointer rounded-sm bg-muted hover:bg-muted/70'
          >
            <div className='flex size-full items-center justify-center'>
              <div className='h-full w-1/12'>
                <p className='mx-auto mt-6 text-center text-3xl'>💻</p>
              </div>
              <div className='my-auto flex w-10/12 flex-col items-center justify-center gap-2'>
                <h3 className='mx-auto w-11/12 font-bold'>
                  TypeScript Soluction Architect
                </h3>
                <p className='mx-auto line-clamp-2 w-11/12 text-ellipsis text-balance text-sm text-muted-foreground'>
                  Expert in TypeScript, Node.js, Vue.js 3, Nuxt.js 3,
                  Express.js, React.js, and modern UI libraries.
                </p>
              </div>
            </div>
          </a>
        </div>
        <div className='col-span-1 flex flex-col gap-2'>
          <a
            href='#'
            className='h-1/2 w-full cursor-pointer rounded-sm bg-muted hover:bg-muted/70'
          >
            <div className='flex size-full items-center justify-center'>
              <div className='h-full w-1/12'>
                <p className='mx-auto mt-6 text-center text-3xl'>🎮</p>
              </div>
              <div className='my-auto flex w-10/12 flex-col items-center justify-center gap-2'>
                <h3 className='mx-auto w-11/12 font-bold'>
                  Unreal Engine Master
                </h3>
                <p className='mx-auto line-clamp-2 w-11/12 text-ellipsis text-balance text-sm text-muted-foreground'>
                  Unreal Engine Development Companion. I can help you with any
                  question you have about the Unreal Engine, including but not
                  limited to game development, programming, and game design.
                </p>
              </div>
            </div>
          </a>
          <a
            href='#'
            className='h-1/2 w-full cursor-pointer rounded-sm bg-muted hover:bg-muted/70'
          >
            <div className='flex size-full items-center justify-center'>
              <div className='h-full w-1/12'>
                <p className='mx-auto mt-6 text-center text-3xl'>🔤</p>
              </div>
              <div className='my-auto flex w-10/12 flex-col items-center justify-center gap-2'>
                <h3 className='mx-auto w-11/12 font-bold'>
                  Variable Name Conversion Expert
                </h3>
                <p className='mx-auto line-clamp-2 w-11/12 text-ellipsis text-balance text-sm text-muted-foreground'>
                  In software development, naming variables is a common yet
                  relatively time-consuming task. This expert can help you with
                  that by providing you with a list of all the possible variable
                  names that can be used in your code.
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className='flex justify-between'>
        <p className='mt-4 text-left text-sm text-muted-foreground'>
          Frequently Asked Questions
        </p>
        <button className='pt-4'>
          <ArrowRight className='h-4 w-4 text-muted-foreground' />
        </button>
      </section>

      <section className='grid h-1/6 w-11/12 grid-cols-12 gap-2'>
        <a
          href='#'
          className='col-span-3 flex size-full cursor-pointer items-center justify-center rounded-3xl bg-muted hover:bg-muted/70'
        >
          Is Anticitera free?
        </a>
        <a
          href='#'
          className='col-span-5 flex size-full cursor-pointer items-center justify-center rounded-3xl bg-muted hover:bg-muted/70'
        >
          How do you deploy and run it?
        </a>
        <a
          href='#'
          className='col-span-3 flex size-full cursor-pointer items-center justify-center rounded-3xl bg-muted hover:bg-muted/70'
        >
          What is Anticitera?
        </a>
        <a
          href='#'
          className='col-span-5 flex size-full cursor-pointer items-center justify-center rounded-3xl bg-muted hover:bg-muted/70'
        >
          What functions does Anticitera have?
        </a>
        <a
          href='#'
          className='col-span-6 flex size-full cursor-pointer items-center justify-center rounded-3xl bg-muted hover:bg-muted/70'
        >
          Does it admit various AI service providers?
        </a>
      </section>
    </div>
  )
}

export default EmptyChat
