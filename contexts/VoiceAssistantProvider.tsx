
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface VoiceAssistantContextType {
  isActive: boolean;
  isListening: boolean;
  transcript: string;
  assistantMessage: string;
  toggleAssistant: () => void;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string) => void;
}

const VoiceAssistantContext = createContext<VoiceAssistantContextType | undefined>(undefined);

// Web Speech API interfaces for compatibility
interface SpeechRecognition extends EventTarget {
  new (): SpeechRecognition;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognition;
    webkitSpeechRecognition: SpeechRecognition;
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

export const VoiceAssistantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('');
  const navigate = useNavigate();

  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
  }
  
  const speak = useCallback((text: string) => {
    setAssistantMessage(text);
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  }, []);

  const processCommand = (command: string) => {
    const lowerCaseCommand = command.toLowerCase();
    
    if (lowerCaseCommand.includes('navigate to') || lowerCaseCommand.includes('go to')) {
        if (lowerCaseCommand.includes('home')) {
            speak('Navigating to the homepage.');
            navigate('/');
        } else if (lowerCaseCommand.includes('my bookings')) {
            speak('Showing your bookings.');
            navigate('/my-bookings');
        } else if (lowerCaseCommand.includes('wishlist')) {
            speak("Here's your wishlist.");
            navigate('/wishlist');
        } else {
            speak("Sorry, I can't navigate there yet.");
        }
    } else if (lowerCaseCommand.startsWith('search for')) {
        const query = lowerCaseCommand.replace('search for', '').trim();
        speak(`Searching for ${query}.`);
        navigate(`/listings/hotels?query=${encodeURIComponent(query)}`);
    } else if (lowerCaseCommand.includes('hello') || lowerCaseCommand.includes('hi')) {
        speak('Hello! How can I help you today?');
    } else {
        speak("I'm not sure how to help with that. You can ask me to navigate or search.");
    }
  };


  if (recognition) {
    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      processCommand(currentTranscript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      speak('Sorry, I had trouble understanding. Please try again.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }

  const startListening = () => {
    if (recognition && !isListening) {
      setTranscript('');
      setAssistantMessage('Listening...');
      setIsListening(true);
      recognition.start();
    } else {
        console.warn('Speech recognition not supported or already listening.');
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      setIsListening(false);
      recognition.stop();
    }
  };

  const toggleAssistant = () => {
    setIsActive(prev => !prev);
    if(isActive) {
        speechSynthesis.cancel();
        stopListening();
    } else {
        // Greet the user when opening
        setAssistantMessage('Hello! How can I assist you? Try saying "Navigate to my bookings" or "Search for hotels in Paris".');
    }
  };
  
  return (
    <VoiceAssistantContext.Provider value={{
      isActive,
      isListening,
      transcript,
      assistantMessage,
      toggleAssistant,
      startListening,
      stopListening,
      speak
    }}>
      {children}
    </VoiceAssistantContext.Provider>
  );
};

export const useVoiceAssistant = (): VoiceAssistantContextType => {
  const context = useContext(VoiceAssistantContext);
  if (context === undefined) {
    throw new Error('useVoiceAssistant must be used within a VoiceAssistantProvider');
  }
  return context;
};
