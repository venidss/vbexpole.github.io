import './App.css'
import { useState } from 'react'
import { BasicConceptsModal } from './components/BasicConcepts'
import { WindowsFormsModal } from './components/WindowsForms'

function App() {
  const [isBasicConceptsOpen, setIsBasicConceptsOpen] = useState(false)
  const [isWindowsFormsOpen, setIsWindowsFormsOpen] = useState(false)

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 overflow-hidden">
      <div className="h-full w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">VB.NET Learning Hub</h1>
          <div className="animate-bounce text-yellow-300 text-2xl">🌟</div>
        </div>

        <div className="grid grid-cols-2 gap-8 px-16">
          {/* Left Column */}
          <div className="space-y-6">
            <CategoryButton 
              icon="📝" 
              title="Basic Concepts" 
              color="bg-green-400"
              onClick={() => setIsBasicConceptsOpen(true)} 
            />
            <CategoryButton icon="🔄" title="Control Structures" color="bg-yellow-400" />
            <CategoryButton icon="🎯" title="Functions & Procedures" color="bg-red-400" />
            <CategoryButton icon="🧰" title="OOP Concepts" color="bg-purple-400" />
            <CategoryButton icon="📚" title="Libraries & Modules" color="bg-blue-400" />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <CategoryButton 
              icon="🖥️" 
              title="Windows Forms" 
              color="bg-indigo-400"
              onClick={() => setIsWindowsFormsOpen(true)}
            />
            <CategoryButton icon="🗃️" title="Database Programming" color="bg-pink-400" />
            <CategoryButton icon="🔍" title="Debugging" color="bg-orange-400" />
            <CategoryButton icon="🛠️" title="Projects" color="bg-teal-400" />
            <CategoryButton icon="🎮" title="Practice Exercises" color="bg-cyan-400" />
          </div>
        </div>

        <BasicConceptsModal 
          isOpen={isBasicConceptsOpen}
          onClose={() => setIsBasicConceptsOpen(false)}
        />
        <WindowsFormsModal
          isOpen={isWindowsFormsOpen}
          onClose={() => setIsWindowsFormsOpen(false)}
        />
      </div>
    </div>
  )
}

function CategoryButton({ 
  icon, 
  title, 
  color, 
  onClick 
}: { 
  icon: string; 
  title: string; 
  color: string;
  onClick?: () => void;
}) {
  return (
    <button 
      className={`w-full p-6 ${color} hover:opacity-90 transition-all rounded-xl shadow-xl
      transform hover:scale-105 flex items-center space-x-4`}
      onClick={onClick}
    >
      <span className="text-3xl">{icon}</span>
      <span className="text-white font-semibold text-xl">{title}</span>
    </button>
  )
}

export default App
