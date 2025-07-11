import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';
import { auth } from '../(auth)/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect('/api/auth/guest');
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  /* const footer = (
    <footer className="w-full text-xs text-gray-500 mt-8 mb-2 bg-transparent text-right italic pr-8">
      Chatbot built with{' '}
      <a
        href="https://claude.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white"
      >
        Claude Sonnet 3.5 model
      </a>{' '}
      &amp;{' '}
      <a
        href="https://vercel.com/ai"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white"
      >
        Vercel AI SDK
      </a>
    </footer>
  ); */

  if (!modelIdFromCookie) {
    return (
      <>
        <Chat
          key={id}
          id={id}
          initialMessages={[]}
          initialChatModel={DEFAULT_CHAT_MODEL}
          initialVisibilityType="private"
          isReadonly={false}
          session={session}
          autoResume={false}
        />
        <DataStreamHandler id={id} />
        {/* {footer} */}
      </>
    );
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        initialChatModel={modelIdFromCookie.value}
        initialVisibilityType="private"
        isReadonly={false}
        session={session}
        autoResume={false}
      />
      <DataStreamHandler id={id} />
      {/* {footer} */}
    </>
  );
}
