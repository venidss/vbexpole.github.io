import { useState } from 'react';

interface FunctionsProceduresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PracticeResult {
  input: string;
  output: string;
  success: boolean;
}

interface SimulationResult {
  features: string[];
  suggestions: string[];
}

function simulateBasics(code: string): SimulationResult {
  const features = [];
  const suggestions = [];
  
  if (code.includes('Function')) features.push('Function declaration');
  if (code.includes('Sub')) features.push('Sub procedure declaration');
  if (code.includes('Try')) features.push('Error handling');
  if (code.includes('ByVal') || code.includes('ByRef')) features.push('Parameter passing');
  
  if (!code.includes('Try')) suggestions.push('Consider adding error handling');
  if (!code.includes('ByVal') && !code.includes('ByRef')) suggestions.push('Specify parameter passing mode');
  
  return { features, suggestions };
}

function simulateFunctions(code: string): SimulationResult {
  const features = [];
  const suggestions = [];
  
  if (code.includes('As ')) features.push('Return type specification');
  if (code.includes('Return')) features.push('Return statement');
  if (code.includes('Optional')) features.push('Optional parameters');
  
  if (!code.includes('Return')) suggestions.push('Add a return statement');
  if (!code.includes('As ')) suggestions.push('Specify return type');
  
  return { features, suggestions };
}

function simulateProcedures(code: string): SimulationResult {
  const features = [];
  const suggestions = [];
  
  if (code.includes('ByRef')) features.push('Reference parameters');
  if (code.includes('Exit Sub')) features.push('Early exit');
  if (code.includes('RaiseEvent')) features.push('Event raising');
  
  if (!code.includes('Try')) suggestions.push('Consider adding error handling');
  if (!code.includes('ByRef')) suggestions.push('Consider using ByRef for output parameters');
  
  return { features, suggestions };
}

function simulateAdvanced(code: string): SimulationResult {
  const features = [];
  const suggestions = [];
  
  if (code.includes('Overloads')) features.push('Function overloading');
  if (code.includes('ParamArray')) features.push('Variable argument list');
  if (code.includes('Generic')) features.push('Generic methods');
  
  if (!code.includes('XML')) suggestions.push('Add XML documentation');
  if (!code.includes('Overloads')) suggestions.push('Consider overloading for flexibility');
  
  return { features, suggestions };
}

export function FunctionsProceduresModal({ isOpen, onClose }: FunctionsProceduresModalProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [activeSection, setActiveSection] = useState<'basics' | 'functions' | 'procedures' | 'advanced'>('basics');
  const [practiceCode, setPracticeCode] = useState<string>('');
  const [practiceResults, setPracticeResults] = useState<PracticeResult[]>([]);

  const executeCode = () => {
    // Trim whitespace from the input
    const code = practiceCode.trim();

    // Check for empty input
    if (!code) {
      setPracticeResults([{
        input: practiceCode,
        output: 'Error: Code cannot be empty. Please write some VB.NET code.',
        success: false
      }, ...practiceResults.slice(0, 4)]);
      return;
    }

    try {
      // Run topic-specific simulation
      let result: SimulationResult;
      switch (activeSection) {
        case 'basics':
          result = simulateBasics(code);
          break;
        case 'functions':
          result = simulateFunctions(code);
          break;
        case 'procedures':
          result = simulateProcedures(code);
          break;
        case 'advanced':
          result = simulateAdvanced(code);
          break;
        default:
          result = { features: [], suggestions: [] };
      }

      // Format simulation output
      let output = 'Code Analysis Results:\n\n';
      
      if (result.features.length > 0) {
        output += 'Features Found:\n';
        output += result.features.join('\n') + '\n\n';
      }
      
      if (result.suggestions.length > 0) {
        output += 'Suggestions:\n';
        output += result.suggestions.map(s => '• ' + s).join('\n') + '\n\n';
      }

      // Run standard syntax validation
      const errors: string[] = [];
      const warnings: string[] = [];
      
      // Basic syntax checks
      if (!code.includes('Function') && !code.includes('Sub')) {
        errors.push('Code must contain at least one Function or Sub procedure.');
      }

      // Check for error handling
      const hasErrorConditions = code.includes('Throw') || 
                               code.includes('Integer.MaxValue') || 
                               code.includes('Integer.MinValue') ||
                               code.includes('Nothing') ||
                               code.includes('DivideByZero');
                               
      const hasTryCatch = /Try[\s\S]*Catch/i.test(code);
      if (hasErrorConditions && !hasTryCatch) {
        warnings.push('Warning: Code contains potential error conditions and should include Try-Catch blocks.');
      }

      // Add warnings and errors to output
      if (warnings.length > 0) {
        output += 'Warnings:\n' + warnings.join('\n') + '\n\n';
      }

      if (errors.length > 0) {
        output += 'Errors:\n' + errors.join('\n') + '\n';
        setPracticeResults([{
          input: practiceCode,
          output,
          success: false
        }, ...practiceResults.slice(0, 4)]);
      } else {
        setPracticeResults([{
          input: practiceCode,
          output,
          success: true
        }, ...practiceResults.slice(0, 4)]);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setPracticeResults([{
        input: practiceCode,
        output: `Simulation Error: ${errorMessage}`,
        success: false
      }, ...practiceResults.slice(0, 4)]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl text-black font-bold">Functions and Procedures in VB.NET</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-4 py-2 rounded ${
                activeTab === 'learn' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-400 hover:bg-gray-200'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 rounded ${
                activeTab === 'practice' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-300 hover:bg-gray-200'
              }`}
            >
              Practice
            </button>
          </div>

          {activeTab === 'learn' && (
            <div className="space-y-6">
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setActiveSection('basics')}
                  className={`px-4 py-2 rounded ${
                    activeSection === 'basics' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black-800 hover:bg-gray-500'
                  }`}
                >
                  Basics
                </button>
                <button
                  onClick={() => setActiveSection('functions')}
                  className={`px-4 py-2 rounded ${
                    activeSection === 'functions' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black-800 hover:bg-gray-500'
                  }`}
                >
                  Functions
                </button>
                <button
                  onClick={() => setActiveSection('procedures')}
                  className={`px-4 py-2 rounded ${
                    activeSection === 'procedures' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black-800 hover:bg-gray-500'
                  }`}
                >
                  Procedures
                </button>
                <button
                  onClick={() => setActiveSection('advanced')}
                  className={`px-4 py-2 rounded ${
                    activeSection === 'advanced' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black-800 hover:bg-gray-500'
                  }`}
                >
                  Advanced Topics
                </button>
              </div>

              {activeSection === 'basics' && (
                <div className="space-y-4">
                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Basic Concepts</h3>
                    <div className="prose max-w-none">
                      <p className="mb-5">
                        In VB.NET, there are two main types of methods:
                      </p>
                      <ul className="list-disc pl-5 mb-4">
                        <li><strong>Functions</strong> - Return a value</li>
                        <li><strong>Procedures (Sub)</strong> - Perform actions without returning values</li>
                      </ul>
                      <pre className="bg-gray-200 p-4 rounded-lg text-black">
{`' Basic Function with error handling
Function Add(x As Integer, y As Integer) As Integer
    Try
        ' Check for Integer overflow
        If x > Integer.MaxValue - y Then
            Throw New OverflowException("Result would exceed maximum integer value")
        End If
        Return x + y
    Catch ex As OverflowException
        Console.WriteLine("Arithmetic error: " & ex.Message)
        Throw
    End Try
End Function

' Basic Procedure with error handling
Sub PrintMessage(message As String)
    Try
        If message Is Nothing Then
            Throw New ArgumentNullException("message")
        End If
        Console.WriteLine(message)
    Catch ex As ArgumentNullException
        Console.WriteLine("Error: Message cannot be null")
        Throw
    End Try
End Sub`}
                      </pre>
                    </div>
                  </section>

                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl  font-semibold mb-4">Method Components</h3>
                    <div className="prose max-w-none">
                      <ul className="list-disc  pl-5 mb-4">
                        <li><strong>Name</strong> - Meaningful identifier for the method</li>
                        <li><strong>Parameters</strong> - Input values (optional)</li>
                        <li><strong>Return Type</strong> - For functions only</li>
                        <li><strong>Access Modifier</strong> - Public, Private, Protected, etc.</li>
                      </ul>
                    </div>
                  </section>
                </div>
              )}

              {activeSection === 'functions' && (
                <div className="space-y-4">
                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Function Types</h3>
                    <div className="prose max-w-none">
                      <div className="mb-4">
                        <h4 className="font-semibold">1. Simple Functions</h4>
                        <pre className="bg-gray-300 p-4 rounded-lg text-black text-sm">
{`Function CalculateArea(radius As Double) As Double
    Try
        If radius < 0 Then
            Throw New ArgumentException("Radius cannot be negative")
        End If
        If Double.IsNaN(radius) OrElse Double.IsInfinity(radius) Then
            Throw New ArgumentException("Invalid radius value")
        End If
        Return Math.PI * radius * radius
    Catch ex As ArgumentException
        Console.WriteLine("Validation error: " & ex.Message)
        Throw
    End Try
End Function`}
                        </pre>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold">2. Functions with Multiple Parameters</h4>
                        <pre className="bg-gray-300 p-4 rounded-lg text-black text-sm">
{`Function FormatFullName(firstName As String, 
                     lastName As String, 
                     Optional title As String = "") As String
    Try
        If firstName Is Nothing OrElse lastName Is Nothing Then
            Throw New ArgumentNullException("Name parameters cannot be null")
        End If
        If String.IsNullOrWhiteSpace(firstName) OrElse 
           String.IsNullOrWhiteSpace(lastName) Then
            Throw New ArgumentException("Name parameters cannot be empty")
        End If
        Return If(title = "", "", title & " ") & firstName & " " & lastName
    Catch ex As ArgumentNullException
        Console.WriteLine("Null argument error: " & ex.Message)
        Throw
    Catch ex As ArgumentException
        Console.WriteLine("Validation error: " & ex.Message)
        Throw
    End Try
End Function`}
                        </pre>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">3. Functions with Different Return Types</h4>
                        <pre className="bg-gray-300 p-4 rounded-lg text-black text-sm">
{`Function IsValidAge(age As Integer) As Boolean
    Try
        If age < 0 Then
            Throw New ArgumentException("Age cannot be negative")
        End If
        Return age >= 0 AndAlso age <= 120
    Catch ex As ArgumentException
        Console.WriteLine("Validation error: " & ex.Message)
        Throw
    End Try
End Function

Function GetUserStatus(id As Integer) As String
    Try
        If id < 1 Then
            Throw New ArgumentException("Invalid user ID")
        End If
        ' Simulated database lookup
        ' Return "Active", "Inactive", or "Suspended"
        Return "Active"
    Catch ex As ArgumentException
        Console.WriteLine("Validation error: " & ex.Message)
        Throw
    Catch ex As Exception
        Console.WriteLine("Database error: " & ex.Message)
        Throw
    End Try
End Function`}
                        </pre>
                      </div>
                    </div>
                  </section>

                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Function Best Practices</h3>
                    <div className="bg-gray-300 p-4 rounded-lg text-black text-sm">
                      <ul className="list-disc pl-5">
                        <li>Use clear, descriptive names</li>
                        <li>Keep functions focused on a single task</li>
                        <li>Validate input parameters</li>
                        <li>Handle errors appropriately</li>
                        <li>Document complex logic</li>
                        <li>Consider using Optional parameters</li>
                      </ul>
                    </div>
                  </section>
                </div>
              )}              {activeSection === 'procedures' && (
                <div className="space-y-4">
                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Procedure (Sub) Types</h3>
                    <div className="prose max-w-none">
                      <div className="mb-4">
                        <h4 className="font-semibold">1. Simple Procedures</h4>
                        <pre className="bg-gray-300 p-4 rounded-lg text-black text-sm">
{`Sub DisplayWelcome()
    Try
        ' Simulate potential I/O operation
        Console.WriteLine("Welcome to our application!")
    Catch ex As System.IO.IOException
        Console.WriteLine("Error writing to console: " & ex.Message)
        Throw
    End Try
End Sub`}
                        </pre>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold">2. Procedures with Parameters</h4>
                        <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Sub SaveUserData(name As String, age As Integer)
    Try
        ' Validate inputs
        If String.IsNullOrWhiteSpace(name) Then
            Throw New ArgumentException("Name cannot be empty")
        End If
        If age < 0 OrElse age > 120 Then
            Throw New ArgumentOutOfRangeException("age", 
                "Age must be between 0 and 120")
        End If
        
        ' Simulate database operation
        Console.WriteLine($"Saving: {name}, Age: {age}")
        
    Catch ex As ArgumentException
        Console.WriteLine("Validation error: " & ex.Message)
        Throw
    Catch ex As Exception
        Console.WriteLine("Database error: " & ex.Message)
        Throw
    End Try
End Sub`}
                        </pre>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">3. Procedures with ByRef Parameters</h4>
                        <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Sub SwapValues(ByRef a As Integer, ByRef b As Integer)
    Try
        ' Check for overflow in temporary variable
        If a = Integer.MinValue OrElse b = Integer.MinValue Then
            Throw New OverflowException("Cannot swap Integer.MinValue")
        End If
        
        Dim temp As Integer = a
        a = b
        b = temp
        
    Catch ex As OverflowException
        Console.WriteLine("Arithmetic error: " & ex.Message)
        Throw
    Catch ex As Exception
        Console.WriteLine("Unexpected error: " & ex.Message)
        Throw
    End Try
End Sub`}
                        </pre>
                      </div>
                    </div>
                  </section>                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Procedure Best Practices</h3>
                    <div className="bg-gray-300 p-4 rounded-lg text-black text-sm">
                      <ul className="list-disc pl-5">
                        <li>Use procedures for actions that don't need to return values</li>
                        <li>Use meaningful parameter names</li>
                        <li>Consider using ByRef when you need to modify parameter values</li>
                        <li>Include error handling for robust code</li>
                        <li>Keep procedures focused and manageable</li>
                      </ul>
                    </div>
                  </section>
                </div>
              )}              {activeSection === 'advanced' && (
                <div className="space-y-4">
                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Advanced Features</h3>
                    <div className="prose max-w-none">
                      <div className="mb-4">
                        <h4 className="font-semibold">1. Function Overloading</h4>
                        <pre className="bg-gray-300 p-4 rounded-lg text-black text-sm">
{`Function Calculate(x As Integer, y As Integer) As Integer
    Return x + y
End Function

Function Calculate(x As Double, y As Double) As Double
    Return x + y
End Function`}
                        </pre>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold">2. Optional Parameters</h4>
                        <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Function GetDiscount(price As Decimal, 
                   Optional rate As Decimal = 0.1D, 
                   Optional isVIP As Boolean = False) As Decimal
    If isVIP Then rate *= 2
    Return price * rate
End Function`}
                        </pre>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">3. ParamArray for Variable Arguments</h4>
                        <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Function Sum(ParamArray numbers() As Integer) As Integer
    Dim total As Integer = 0
    For Each num In numbers
        total += num
    Next
    Return total
End Function`}
                        </pre>
                      </div>
                    </div>
                  </section>                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Error Handling</h3>
                    <div className="prose max-w-none">
                      <pre className="bg-gray-300 p-4 rounded-lg text-black text-sm">
{`Function DivideNumbers(x As Double, y As Double) As Double
    Try
        If y = 0 Then
            Throw New DivideByZeroException()
        End If
        Return x / y
    Catch ex As DivideByZeroException
        Console.WriteLine("Cannot divide by zero")
        Return 0
    Catch ex As Exception
        Console.WriteLine("An error occurred: " & ex.Message)
        Return 0
    End Try
End Function`}
                      </pre>
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">              <section className="bg-gray-500 p-4 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Practice Area</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Write your VB.NET code here based on the selected topic:
                  </label>
                  <div className="bg-gray-300 p-4 rounded-lg text-black text-sm mb-4">
                    {activeSection === 'basics' && (
                      <p>Practice creating basic Functions and Subs with proper parameter declarations and error handling.</p>
                    )}
                    {activeSection === 'functions' && (
                      <p>Practice creating Functions with different return types, multiple parameters, and proper error handling.</p>
                    )}
                    {activeSection === 'procedures' && (
                      <p>Practice creating Sub procedures with ByRef parameters and proper error handling.</p>
                    )}
                    {activeSection === 'advanced' && (
                      <p>Practice creating advanced features like function overloading, optional parameters, and ParamArray.</p>
                    )}
                  </div>
                  <textarea
                    value={practiceCode}
                    onChange={(e) => setPracticeCode(e.target.value)}
                    className="w-full h-64 font-mono text-sm p-4 border rounded"
                    placeholder={`' Example template based on ${activeSection}:
${activeSection === 'basics' ? 
`' Basic Function Example
Function Add(x As Integer, y As Integer) As Integer
    Try
        If x > Integer.MaxValue - y Then
            Throw New OverflowException("Result would exceed maximum integer value")
        End If
        Return x + y
    Catch ex As Exception
        Console.WriteLine("Error: " & ex.Message)
        Throw
    End Try
End Function

' Basic Sub Example
Sub DisplayMessage(message As String)
    Try
        If message Is Nothing Then
            Throw New ArgumentNullException("message")
        End If
        Console.WriteLine(message)
    Catch ex As Exception
        Console.WriteLine("Error: " & ex.Message)
        Throw
    End Try
End Sub` : 

activeSection === 'functions' ? 
`' Function with Multiple Parameters and Return Type
Function CalculateTotal(price As Decimal, 
                       quantity As Integer,
                       Optional discount As Decimal = 0) As Decimal
    Try
        If price < 0 OrElse quantity < 0 Then
            Throw New ArgumentException("Price and quantity must be positive")
        End If
        
        Dim total As Decimal = price * quantity
        Return total * (1 - discount)
        
    Catch ex As Exception
        Console.WriteLine("Error: " & ex.Message)
        Throw
    End Try
End Function` :

activeSection === 'procedures' ? 
`' Sub Procedure with ByRef Parameters
Sub SwapValues(ByRef a As Integer, ByRef b As Integer)
    Try
        Dim temp As Integer = a
        a = b
        b = temp
        
        Console.WriteLine("Values swapped successfully!")
        Console.WriteLine($"a = {a}, b = {b}")
        
    Catch ex As Exception
        Console.WriteLine("Error: " & ex.Message)
        Throw
    End Try
End Sub` :

`' Advanced Function with Overloading and ParamArray
Function Calculate(x As Integer, y As Integer) As Integer
    Return x + y
End Function

Function Calculate(x As Double, y As Double) As Double
    Return x * y
End Function

Function Calculate(ParamArray numbers() As Integer) As Integer
    Try
        If numbers.Length = 0 Then
            Throw New ArgumentException("At least one number is required")
        End If
        
        Dim total As Integer = 0
        For Each num In numbers
            total += num
        Next
        Return total
        
    Catch ex As Exception
        Console.WriteLine("Error: " & ex.Message)
        Throw
    End Try
End Function`}`}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={executeCode}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Run Code
                  </button>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Results:</h4>
                  <div className="space-y-2">
                    {practiceResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded ${
                          result.success ? 'bg-green-900 text-white' : 'bg-green-900 text-red-500'
                        }`}
                      >
                        <pre className="whitespace-pre-wrap text-sm">
                          {result.output}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="bg-gray-500 p-4 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">Tips for Practice</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Dynamic Number Processor</h4>
                    <p className="mb-2">Create a flexible function that processes numbers differently based on input count.</p>
                    <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Function ProcessNumbers(ParamArray numbers() As Double) As Double
    Try
        If numbers Is Nothing OrElse numbers.Length = 0 Then
            Throw New ArgumentException("Must provide at least one number")
        End If
        
        Select Case numbers.Length
            Case 1  ' Square the number
                Return numbers(0) * numbers(0)
            Case 2  ' Add numbers
                Return numbers(0) + numbers(1)
            Case Else  ' Calculate average
                Dim total As Double = 0
                For Each num In numbers
                    total += num
                Next
                Return total / numbers.Length
        End Select
        
    Catch ex As ArgumentException
        Console.WriteLine($"Input error: {ex.Message}")
        Throw
    End Try
End Function`}</pre>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. String Processor</h4>
                    <p className="mb-2">Process strings with optional parameters and proper error handling.</p>
                    <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Function FormatText(text As String, 
                  Optional upperCase As Boolean = False,
                  Optional trim As Boolean = True) As String
    Try
        If text Is Nothing Then
            Throw New ArgumentNullException(NameOf(text))
        End If
        
        Dim result As String = text
        If trim Then result = result.Trim()
        If upperCase Then result = result.ToUpper()
        Return result
        
    Catch ex As ArgumentNullException
        Console.WriteLine($"Input error: {ex.Message}")
        Throw
    End Try
End Function`}</pre>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Best Practices</h4>
                    <ul className="list-disc pl-5 space-y-2 bg-gray-300 p-4 rounded-lg text-black">
                      <li>Always include proper error handling with Try-Catch blocks</li>
                      <li>Use meaningful variable and parameter names</li>
                      <li>Validate all input parameters</li>
                      <li>Document any assumptions or limitations</li>
                      <li>Use Optional parameters when appropriate</li>
                      <li>Return meaningful error messages</li>
                      <li>Keep functions focused on a single task</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}