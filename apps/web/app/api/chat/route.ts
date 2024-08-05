import { CoreMessage, CoreUserMessage, convertToCoreMessages, embed, streamText } from 'ai';
import { codeBlock, oneLine } from 'common-tags'
import { openai } from '@ai-sdk/openai';
import GPT3Tokenizer from 'gpt3-tokenizer'
import {
    Configuration,
    OpenAIApi,
    CreateModerationResponse,
    CreateEmbeddingResponse,
    ChatCompletionRequestMessage,
  } from 'openai-edge'

import { createClient } from '@supabase/supabase-js'
const options = {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
  }

export async function POST(req: Request) {
  const { messages  } = await req.json();
  console.log("messages:",messages)
  // Create embedding from query
  const supabaseUrl = 'https://izhdisdiocplkxvbuzop.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseKey,options)
//   const {
//     data: [{ embeddings }],
//   }: CreateEmbeddingResponse = await embedding.json()
console.log(supabase.access)

const sanitizedQuery = messages[0].content.trim()
const { embedding } = await embed({
    model: openai.embedding('text-embedding-ada-002'),
    value: sanitizedQuery.replaceAll('\n', ' '),
});
  
    console.log("embedding:",embedding);
  const { error: matchError, data: pageSections } = await supabase.rpc(
    'match_page_sections',
    {
      embedding,
      match_threshold: 0.78,
      match_count: 10,
      min_content_length: 50,
    }
  )

  console.log("supabase query:",pageSections)

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
    prompt,
    maxTokens: 512,
    maxRetries: 5,
  });

  return result.toAIStreamResponse();
}