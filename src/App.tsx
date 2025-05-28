import './App.css'
import { useState, Suspense } from 'react'
import { BasicConceptsModal } from './components/BasicConcepts'
import { WindowsFormsModal } from './components/WindowsForms'
import { ControlStructuresModal } from './components/ControlStructures'
import { DatabaseProgrammingModal } from './components/DatabaseProgramming'
import { FunctionsProceduresModal } from './components/FunctionsProcedures'
import { DebuggingModal } from './components/Debugging'
import { OOPConceptsModal } from './components/OOPConcepts'
import { ProjectsModal } from './components/Projects'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [isBasicConceptsOpen, setIsBasicConceptsOpen] = useState(false)
  const [isWindowsFormsOpen, setIsWindowsFormsOpen] = useState(false)
  const [isControlStructuresOpen, setIsControlStructuresOpen] = useState(false)
  const [isDatabaseProgrammingOpen, setIsDatabaseProgrammingOpen] = useState(false)
  const [isFunctionsProceduresOpen, setIsFunctionsProceduresOpen] = useState(false)
  const [isDebuggingOpen, setIsDebuggingOpen] = useState(false)
  const [isOOPConceptsOpen, setIsOOPConceptsOpen] = useState(false)
  const [isProjectsOpen, setIsProjectsOpen] = useState(false)

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center dark:bg-black"><LoadingSpinner size="large" /></div>}>
        <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 overflow-hidden dark:from-black dark:to-gray-900">
          <div className="h-full w-full">
            <div className="text-center mb-4 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">VB.NET Learning Hub</h1>
              <div className="animate-bounce text-yellow-300 text-xl sm:text-2xl">🌟</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-8 md:px-16">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                <CategoryButton 
                  icon="📝" 
                  title="Basic Concepts" 
                  color="bg-green-400"
                  onClick={() => setIsBasicConceptsOpen(true)} 
                />
                <CategoryButton 
                  icon="🔄" 
                  title="Control Structures" 
                  color="bg-yellow-400"
                  onClick={() => setIsControlStructuresOpen(true)}
                />
                <CategoryButton 
                  icon="🎯" 
                  title="Functions & Procedures" 
                  color="bg-red-400"
                  onClick={() => setIsFunctionsProceduresOpen(true)}
                />
                <CategoryButton 
                  icon="🧰" 
                  title="OOP Concepts" 
                  color="bg-purple-400"
                  onClick={() => setIsOOPConceptsOpen(true)}
                />
                <CategoryButton icon="📚" title="Libraries & Modules" color="bg-blue-400" />
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                <CategoryButton 
                  icon="🖥️" 
                  title="Windows Forms" 
                  color="bg-indigo-400"
                  onClick={() => setIsWindowsFormsOpen(true)}
                />
                <CategoryButton 
                  icon="🗃️" 
                  title="Database Programming" 
                  color="bg-pink-400"
                  onClick={() => setIsDatabaseProgrammingOpen(true)}
                />
                <CategoryButton 
                  icon="🔍" 
                  title="Debugging" 
                  color="bg-orange-400"
                  onClick={() => setIsDebuggingOpen(true)}
                />
                <CategoryButton 
                  icon="🛠️" 
                  title="Projects" 
                  color="bg-teal-400"
                  onClick={() => setIsProjectsOpen(true)}
                />
                <CategoryButton icon="🎮" title="Practice Exercises" color="bg-cyan-400" />
              </div>
            </div>

            {/* Modals */}
            <BasicConceptsModal 
              isOpen={isBasicConceptsOpen}
              onClose={() => setIsBasicConceptsOpen(false)}
            />
            <WindowsFormsModal
              isOpen={isWindowsFormsOpen}
              onClose={() => setIsWindowsFormsOpen(false)}
            />
            <ControlStructuresModal
              isOpen={isControlStructuresOpen}
              onClose={() => setIsControlStructuresOpen(false)}
            />
            <DatabaseProgrammingModal
              isOpen={isDatabaseProgrammingOpen}
              onClose={() => setIsDatabaseProgrammingOpen(false)}
            />
            <FunctionsProceduresModal
              isOpen={isFunctionsProceduresOpen}
              onClose={() => setIsFunctionsProceduresOpen(false)}
            />
            <DebuggingModal
              isOpen={isDebuggingOpen}
              onClose={() => setIsDebuggingOpen(false)}
            />
            <OOPConceptsModal
              isOpen={isOOPConceptsOpen}
              onClose={() => setIsOOPConceptsOpen(false)}
            />
            <ProjectsModal
              isOpen={isProjectsOpen}
              onClose={() => setIsProjectsOpen(false)}
            />
          </div>
        </div>
      </Suspense>
    </ErrorBoundary>
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
      className={`w-full p-3 sm:p-4 md:p-6 ${color} hover:opacity-90 transition-all rounded-xl shadow-xl
      transform hover:scale-105 flex items-center space-x-2 sm:space-x-4`}
      onClick={onClick}
    >
      <span className="text-2xl sm:text-3xl">{icon}</span>
      <span className="text-white font-semibold text-lg sm:text-xl">{title}</span>
    </button>
  )
}

export default App
