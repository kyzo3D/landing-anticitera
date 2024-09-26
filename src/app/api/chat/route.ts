import { BindToolsInput } from '@langchain/core/language_models/chat_models'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama'
import { LangChainAdapter } from 'ai'
import { WebBrowser } from 'langchain/tools/webbrowser'
import { z } from 'zod'

export const maxDuration = 30

export async function POST(req: Request) {
  // Current version without tools
  const { messages } = await req.json()

  const model = new ChatOllama({
    model: 'llama3.1',
    temperature: 0
  })

  const stream = await model.stream(messages)

  return LangChainAdapter.toDataStreamResponse(stream)

  // Version with tools (you need to install mxbai-embed-large at ollama to use embeddings)
  // const { messages } = await req.json()

  // const model = new ChatOllama({
  //   model: 'Llama3.1',
  //   temperature: 0
  // })

  // const embeddings = new OllamaEmbeddings({
  //   truncate: true
  // })

  // const browseWebTool: BindToolsInput = {
  //   name: 'browseWeb',
  //   description: 'useful for when you need to browse the web',
  //   schema: z.object({
  //     url: z.string().url().describe('The URL to browse'),
  //     information: z.string().describe('The information to search for')
  //   })
  // }

  // const prompt = ChatPromptTemplate.fromMessages([
  //   [
  //     'system',
  //     `When asked about the information on any website, make sure to use the 'browseWeb' tool.`
  //   ],
  //   ...messages
  // ])

  // const modelWithTools = model.bindTools([browseWebTool])

  // const chain = prompt.pipe(modelWithTools)

  // const result = await chain.invoke(messages)

  // const browser = new WebBrowser({ model, embeddings })
  // const query = `"${result.tool_calls?.[0].args.url}","${result.tool_calls?.[0].args.information}"`
  // const stream = await browser.stream(query)
  // return LangChainAdapter.toDataStreamResponse(stream)
}
