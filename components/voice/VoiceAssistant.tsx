
import React from 'react';
import { useVoiceAssistant } from '../../contexts/VoiceAssistantProvider';
import { IconMicrophone, IconX } from '../../constants';

const VoiceAssistant: React.FC = () => {
  const {
    isActive,
    isListening,
    transcript,
    assistantMessage,
    toggleAssistant,
    startListening,
  } = useVoiceAssistant();

  if (!isActive) {
    return (
      <button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary dark:bg-accent rounded-full text-white shadow-2xl flex items-center justify-center hover:bg-primary-dark dark:hover:bg-accent-dark transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50 dark:focus:ring-accent/50"
        aria-label="Open Voice Assistant"
      >
        <IconMicrophone className="w-8 h-8" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-neutral-d-light w-full max-w-lg rounded-2xl shadow-2xl p-6 flex flex-col min-h-[300px]">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-neutral-dark dark:text-neutral-d-dark">Voice Assistant</h2>
          <button onClick={toggleAssistant} className="p-2 rounded-full hover:bg-secondary dark:hover:bg-neutral-d-extralight transition-colors">
            <IconX className="w-6 h-6 text-neutral-DEFAULT dark:text-neutral-d-DEFAULT" />
          </button>
        </header>

        <div className="flex-grow space-y-4">
            <div className="bg-secondary dark:bg-neutral-d-extralight/50 p-4 rounded-lg min-h-[60px]">
                <p className="text-sm font-medium text-neutral-dark dark:text-neutral-d-dark">Assistant:</p>
                <p className="text-neutral-DEFAULT dark:text-neutral-d-DEFAULT">{assistantMessage}</p>
            </div>
             <div className="bg-primary/10 dark:bg-accent/10 p-4 rounded-lg min-h-[60px]">
                <p className="text-sm font-medium text-primary dark:text-accent-light">You said:</p>
                <p className="text-neutral-dark dark:text-neutral-d-dark italic">{transcript || '...'}</p>
            </div>
        </div>

        <footer className="mt-6 text-center">
          <button
            onClick={startListening}
            disabled={isListening}
            className={`w-20 h-20 rounded-full text-white flex items-center justify-center mx-auto transition-all duration-200 shadow-xl focus:outline-none focus:ring-4
                ${isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-primary dark:bg-accent hover:bg-primary-dark dark:hover:bg-accent-dark transform hover:scale-105'
                }`}
          >
            <IconMicrophone className="w-10 h-10" />
          </button>
           <p className="text-xs text-neutral-DEFAULT dark:text-neutral-d-DEFAULT mt-3">
             {isListening ? "Listening..." : "Tap to speak"}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default VoiceAssistant;
