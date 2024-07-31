import { CoreMessage, embed, streamText } from 'ai';
import { codeBlock, oneLine } from 'common-tags'
import { openai } from '@ai-sdk/openai';
import { createClient } from '@/utils/supabase/server'
import GPT3Tokenizer from 'gpt3-tokenizer'
import {
    Configuration,
    OpenAIApi,
    CreateModerationResponse,
    CreateEmbeddingResponse,
    ChatCompletionRequestMessage,
  } from 'openai-edge'

export async function POST(req: Request) {
  const { messages  } = await req.json();
  console.log("messages:",messages)
  // Create embedding from query
  const sanitizedQuery = messages[0].content.trim()
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: sanitizedQuery.replaceAll('\n', ' '),
  });

  console.log("embedding:",embedding);

  const supabase = createClient()
//   const {
//     data: [{ embeddings }],
//   }: CreateEmbeddingResponse = await embedding.json()

  const { error: matchError, data: pageSections } = await supabase.rpc(
    'match_page_sections',
    {
      embedding,
      match_threshold: 0.78,
      match_count: 10,
      min_content_length: 50,
    }
  )

  const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })
    let tokenCount = 0
    let contextText = ''

    for (let i = 0; i < pageSections.length; i++) {
      const pageSection = pageSections[i]
      const content = pageSection.content
      const encoded = tokenizer.encode(content)
      tokenCount += encoded.text.length

      if (tokenCount >= 1500) {
        break
      }

      contextText += `${content.trim()}\n---\n`
    }

  console.log("contextText:",contextText);
  
    const prompt = codeBlock`
      ${oneLine`
         Given the following sections from the Supabase
        documentation, answer the question using only that information,
        outputted in markdown format. If you are unsure and the answer
        is not explicitly written in the documentation, say
        "Sorry, I don't know how to help with that."
      `}

      Context sections:
      ${contextText}

      Question: """
      ${sanitizedQuery}
      """

      Answer as markdown (including related code snippets if available):
    `
  
  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    temperature: 0,
    system: 'You are a helpful assistant.',
    messages: prompt,
  });

  return result.toAIStreamResponse();
}