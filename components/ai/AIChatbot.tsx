import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { useVoiceAssistant } from '../../contexts/VoiceAssistantProvider';
import { IconChatBubbleOvalLeft, IconX, IconSparkles, IconUser } from '../../constants';

interface Message {
    sender: 'user' | 'motka';
    text: string;
}

const AIChatbot: React.FC = () => {
  const { isActive: isVoiceActive } = useVoiceAssistant();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        // Initialize chat when the chatbot is opened
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction: 'You are Motka, a friendly, cheerful, and slightly quirky travel assistant for a booking website called BookIn. Your goal is to help users plan trips and find information on the site. Keep your responses concise and fun.' },
        });
        setChat(newChat);
        setMessages([{ sender: 'motka', text: "Hi, I'm Motka! How can I help you plan your trip today?" }]);
    } else {
        // Clean up when closed
        setChat(null);
        setMessages([]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (input.trim() === '' || !chat || isLoading) return;
    const userInput: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userInput]);
    setInput('');
    setIsLoading(true);

    try {
        const stream = await chat.sendMessageStream({ message: input });
        let motkaResponse = '';
        setMessages(prev => [...prev, { sender: 'motka', text: '...' }]);

        for await (const chunk of stream) {
            motkaResponse += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { sender: 'motka', text: motkaResponse };
                return newMessages;
            });
        }
    } catch (error) {
        console.error("Chatbot error:", error);
        setMessages(prev => [...prev, { sender: 'motka', text: "Oops! I had a little hiccup. Could you try asking that again?" }]);
    } finally {
        setIsLoading(false);
    }
  };

  if (isVoiceActive) return null;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-16 h-16 bg-accent dark:bg-primary rounded-full text-white shadow-2xl flex items-center justify-center hover:bg-accent-dark dark:hover:bg-primary-dark transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-accent/50 dark:focus:ring-primary/50"
        aria-label="Open AI Chatbot Motka"
      >
        <IconChatBubbleOvalLeft className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-full max-w-sm h-[60vh] flex flex-col">
        <div className="bg-white dark:bg-neutral-d-light w-full h-full rounded-2xl shadow-2xl border border-neutral-extralight dark:border-neutral-d-extralight flex flex-col">
            <header className="flex justify-between items-center p-4 border-b border-neutral-extralight dark:border-neutral-d-extralight flex-shrink-0">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-accent dark:bg-primary flex items-center justify-center mr-2">
                        <IconSparkles className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-lg font-bold text-neutral-dark dark:text-neutral-d-dark">Motka AI</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors">
                    <IconX className="w-6 h-6 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT" />
                </button>
            </header>

            <div className="flex-grow p-4 overflow-y-auto custom-scrollbar space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'motka' && <div className="w-6 h-6 rounded-full bg-accent dark:bg-primary flex items-center justify-center flex-shrink-0"><IconSparkles className="w-4 h-4 text-white"/></div>}
                        <div className={`max-w-[80%] px-3 py-2 rounded-xl ${msg.sender === 'user' ? 'bg-primary/90 text-white rounded-br-none' : 'bg-secondary dark:bg-neutral-d-extralight text-neutral-dark dark:text-neutral-d-dark rounded-bl-none'}`}>
                            <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                        </div>
                         {msg.sender === 'user' && <div className="w-6 h-6 rounded-full bg-secondary dark:bg-neutral-d-extralight flex items-center justify-center flex-shrink-0"><IconUser className="w-4 h-4 text-neutral-dark dark:text-neutral-d-dark"/></div>}
                    </div>
                ))}
                {isLoading && messages[messages.length-1]?.sender !== 'motka' && (
                     <div className="flex items-end gap-2 justify-start">
                        <div className="w-6 h-6 rounded-full bg-accent dark:bg-primary flex items-center justify-center flex-shrink-0"><IconSparkles className="w-4 h-4 text-white"/></div>
                        <div className="px-3 py-2 rounded-xl bg-secondary dark:bg-neutral-d-extralight text-neutral-dark dark:text-neutral-d-dark rounded-bl-none">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-neutral-DEFAULT rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-neutral-DEFAULT rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-neutral-DEFAULT rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <footer className="p-3 border-t border-neutral-extralight dark:border-neutral-d-extralight flex-shrink-0">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Motka anything..." className="flex-grow p-2 text-sm border border-neutral-extralight dark:border-neutral-d-extralight rounded-lg focus:ring-2 focus:ring-primary dark:focus:ring-accent outline-none"/>
                    <button type="submit" disabled={isLoading} className="px-4 bg-primary dark:bg-accent text-white rounded-lg font-semibold text-sm disabled:opacity-60">Send</button>
                </form>
            </footer>
        </div>
    </div>
  );
};

export default AIChatbot;