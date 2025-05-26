import { useState } from 'react';

interface BasicConceptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BasicConceptsModal({ isOpen, onClose }: BasicConceptsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-600">VB.NET: Basic Concepts</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">History of VB.NET</h3>
              <div className="space-y-2 text-gray-700">
                <p>• 2002: First release as part of .NET Framework 1.0</p>
                <p>• Evolution from Visual Basic 6.0</p>
                <p>• Complete redesign to integrate with the .NET Framework</p>
                <p>• Major shift from COM-based architecture to .NET CLR</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Key Features</h3>
              <div className="space-y-2 text-gray-700">
                <p>• Object-Oriented Programming Support</p>
                <p>• Type Safety and Strong Typing</p>
                <p>• Windows Forms and WPF Integration</p>
                <p>• Full Access to .NET Framework</p>
                <p>• Modern Language Features (LINQ, Generics)</p>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Basic Syntax Elements</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-800">
{`' Variables and Data Types
Dim name As String = "John"
Dim age As Integer = 25

' Basic Control Structures
If age >= 18 Then
    Console.WriteLine("Adult")
End If

' Procedures
Sub DisplayMessage()
    MessageBox.Show("Hello World!")
End Sub`}
                </pre>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Development Environment</h3>
              <div className="space-y-2 text-gray-700">
                <p>• Visual Studio IDE</p>
                <p>• IntelliSense Support</p>
                <p>• Integrated Debugger</p>
                <p>• Form Designer</p>
                <p>• Code Snippets</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
