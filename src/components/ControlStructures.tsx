import { useState } from 'react';

interface ControlStructuresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ControlStructuresModal({ isOpen, onClose }: ControlStructuresModalProps) {
  const [activeExample, setActiveExample] = useState<string>('if');
  const [loopCount, setLoopCount] = useState(5);
  const [selectedCase, setSelectedCase] = useState('A');
  const [age, setAge] = useState(20);

  const renderOutput = (type: string) => {
    switch (type) {
      case 'if':
        return (
          <div className="space-y-4 bg-gray-700 ">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-blue-300">Enter Age:</label>
              <input 
                type="number" 
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="border rounded p-2 w-24"
              />
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <pre className="text-sm text-gray-200">
{`' If-Then-Else Statement
Dim age As Integer = ${age}

If age >= 18 Then
    Console.WriteLine("Adult")
ElseIf age >= 13 Then
    Console.WriteLine("Teenager")
Else
    Console.WriteLine("Child")
End If`}
              </pre>
            </div>
            <div className="bg-green-100 p-4 rounded-lg mt-2">
              <p className="text-green-800 font-mono">
                Output: {age >= 18 ? "Adult" : age >= 13 ? "Teenager" : "Child"}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-gray-200 font-semibold mb-2">Example Explanation:</h4>
              <p className="text-gray-700">
                This example demonstrates nested If-Then-Else statements to categorize age groups:
                {age >= 18 ? (
                  <span className="block mt-2">• Age {age} is classified as an Adult (18 or older)</span>
                ) : age >= 13 ? (
                  <span className="block mt-2">• Age {age} is classified as a Teenager (13-17)</span>
                ) : (
                  <span className="block mt-2">• Age {age} is classified as a Child (under 13)</span>
                )}
              </p>
            </div>
          </div>
        );

      case 'for':
        return (
          <div className="space-y-4" bg-gray-700 >
            <div className="flex items-center gap-4 mb-4">
              <label className="text-gray-200">Loop Count:</label>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={loopCount}
                onChange={(e) => setLoopCount(Number(e.target.value))}
                className="w-48"
              />
              <span className="text-gray-700">{loopCount}</span>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <pre className="text-sm text-gray-200">
{`' For Loop Example
For i As Integer = 1 To ${loopCount}
    Console.WriteLine(i)
Next`}
              </pre>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-800 font-mono">Output:</p>
              {Array.from({ length: loopCount }, (_, i) => (
                <p key={i} className="text-black font-mono">{i + 1}</p>
              ))}
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <label className="text-gray-200">Select Grade:</label>
              <select 
                value={selectedCase} 
                onChange={(e) => setSelectedCase(e.target.value)}
                className="border rounded p-2"
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <pre className="text-sm text-gray-200">
{`' Select Case Statement
Dim grade As String = "${selectedCase}"

Select Case grade
    Case "A"
        Console.WriteLine("Excellent!")
    Case "B"
        Console.WriteLine("Good job!")
    Case "C"
        Console.WriteLine("Fair")
    Case "D"
        Console.WriteLine("Need improvement")
End Select`}
              </pre>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-800 font-mono">
                Output: {
                  selectedCase === 'A' ? "Excellent!" :
                  selectedCase === 'B' ? "Good job!" :
                  selectedCase === 'C' ? "Fair" :
                  "Need improvement"
                }
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-[95vw] sm:max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-3 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">Control Structures in VB.NET</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4 sm:space-y-6">            <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
              <button
                onClick={() => setActiveExample('if')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold ${
                  activeExample === 'if' 
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                If-Then-Else
              </button>
              <button
                onClick={() => setActiveExample('for')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold ${
                  activeExample === 'for' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                For Loop
              </button>
              <button
                onClick={() => setActiveExample('select')}
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-semibold ${
                  activeExample === 'select' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                Select Case
              </button>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              {renderOutput(activeExample)}
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Best Practices</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Always use proper indentation for better readability</li>
                <li>Include End If, Next, or End Select statements properly</li>
                <li>Use meaningful variable names and conditions</li>
                <li>Consider using Select Case when you have multiple conditions</li>
                <li>Initialize variables before using them in conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
