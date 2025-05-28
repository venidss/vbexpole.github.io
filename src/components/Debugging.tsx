import { useState } from 'react';

interface DebuggingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DebuggingModal({ isOpen, onClose }: DebuggingModalProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [activeSection, setActiveSection] = useState<'basics' | 'breakpoints' | 'watches' | 'advanced'>('basics');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Debugging in VB.NET</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-4 py-2 rounded ${
                activeTab === 'learn' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-black-500 hover:bg-gray-300'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 rounded ${
                activeTab === 'practice' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-black-500 hover:bg-gray-300'
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
                      : 'bg-black-500 hover:bg-gray-300'
                  }`}
                >
                  Debugging Basics
                </button>
                <button
                  onClick={() => setActiveSection('breakpoints')}
                  className={`px-4 py-2 rounded ${
                    activeSection === 'breakpoints' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black-500 hover:bg-gray-300'
                  }`}
                >
                  Breakpoints
                </button>
                <button
                  onClick={() => setActiveSection('watches')}
                  className={`px-4 py-2 rounded ${
                    activeSection === 'watches' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black-500 hover:bg-gray-300'
                  }`}
                >
                  Watch & Locals
                </button>
                <button
                  onClick={() => setActiveSection('advanced')}
                  className={`px-4 py-2 rounded ${
                    activeSection === 'advanced' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-black-500 hover:bg-gray-300'
                  }`}
                >
                  Advanced Techniques
                </button>
              </div>

              {activeSection === 'basics' && (
                <div className="space-y-4">
                  <section className="bg-gray-100 text-black p-4 rounded-lg border">
                    <h3 className="text-xl font-semibold mb-4">Debugging Fundamentals</h3>
                    <div className="prose max-w-none">
                      <div className="mb-4">
                        <h4 className="font-semibold">1. Debug vs Release Mode</h4>
                        <ul className="list-disc pl-5 mb-4">
                          <li>Debug mode includes additional information for debugging</li>
                          <li>Release mode optimizes code for performance</li>
                          <li>Switch between modes in Visual Studio's toolbar</li>
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-semibold">2. Basic Debug Controls</h4>
                        <ul className="list-disc pl-5 mb-4">
                          <li>F5: Start Debugging</li>
                          <li>Shift+F5: Stop Debugging</li>
                          <li>Ctrl+F5: Start Without Debugging</li>
                          <li>F10: Step Over</li>
                          <li>F11: Step Into</li>
                          <li>Shift+F11: Step Out</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">3. Debug Output</h4>
                        <pre className="bg-gray-200 p-4 rounded-lg text-sm">
{`' Using Debug.Print for debugging output
Debug.Print("Variable value: " & myVariable)

' Using Debug.Assert for conditions
Debug.Assert(myVariable > 0, "myVariable must be positive")

' Using Debug.WriteLine with categories
Debug.WriteLine("Processing started", "Status")`}
                        </pre>
                      </div>
                    </div>
                  </section>
                </div>
              )}              {activeSection === 'breakpoints' && (
                <div className="space-y-4">
                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl text-black font-semibold mb-4">Working with Breakpoints</h3>
                    <div className="prose max-w-none">
                      <div className="mb-4">
                        <h4 className="font-semibold text-black">1. Setting Breakpoints</h4>
                        <ul className="list-disc pl-5 mb-4">
                          <li>Click in the left margin or press F9</li>
                          <li>Right-click for additional options</li>
                          <li>Use conditional breakpoints for specific scenarios</li>
                        </ul>
                      </div>

                      <div className="mb-4">                        <h4 className="font-semibold text-black">2. Conditional Breakpoints</h4>
                        <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`' Example of where you might set a conditional breakpoint:
For i As Integer = 1 To 100
    ' Set condition: Break when i = 50
    ProcessItem(i)
Next

' Example of a hit count breakpoint:
While ProcessRecords()
    ' Break after 10 iterations
    HandleRecord()
End While`}
                        </pre>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">3. Tracepoints</h4>
                        <pre className="bg-gray-200 p-4 rounded-lg text-sm">
{`' Example of where to use a tracepoint:
Public Sub ProcessOrder(order As Order)
    ' Add tracepoint to log order details
    ValidateOrder(order)
    ' Add tracepoint to log validation result
    ProcessPayment(order)
    ' Add tracepoint to log payment status
End Sub`}
                        </pre>
                      </div>
                    </div>
                  </section>
                </div>
              )}              {activeSection === 'watches' && (
                <div className="space-y-4">
                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl text-black font-semibold mb-4">Watch Windows & Local Variables</h3>
                    <div className="prose max-w-none">
                      <div className="mb-4">
                        <h4 className="font-semibold text-black">1. Watch Window</h4>
                        <ul className="list-disc pl-5 mb-4">
                          <li>Add variables to track their values</li>
                          <li>Use expressions to monitor computed values</li>
                          <li>Multiple watch windows for organization</li>
                        </ul>
                        <pre className="bg-gray-200 p-4 rounded-lg text-sm">
{`' Examples of watch expressions:
customer.Name                 ' Simple property
orders.Count                 ' Collection count
total > 1000                ' Boolean condition
String.Format("{0:C}", price) ' Formatted value`}
                        </pre>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">2. Locals Window</h4>
                        <ul className="list-disc pl-5 mb-4">
                          <li>Automatically shows all local variables</li>
                          <li>Red values indicate changes</li>
                          <li>Expand objects to see properties</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">3. QuickWatch</h4>
                        <pre className="bg-gray-200 p-4 rounded-lg text-sm">
{`' Example code to practice QuickWatch:
Dim customer As New Customer
customer.Name = "John Doe"
customer.Orders.Add(New Order(100))
' Use QuickWatch to inspect:
' customer.Orders.Count
' customer.Orders(0).Total
' customer.GetOrderTotal()`}
                        </pre>
                      </div>
                    </div>
                  </section>
                </div>
              )}              {activeSection === 'advanced' && (
                <div className="space-y-4">
                  <section className="bg-gray-500 p-4 rounded-lg border">
                    <h3 className="text-xl text-black font-semibold mb-4">Advanced Debugging Techniques</h3>
                    <div className="prose max-w-none">
                      <div className="mb-4">
                        <h4 className="font-semibold text-black">1. Exception Handling</h4>
                        <pre className="bg-gray-200 p-4 rounded-lg text-sm">
{`' Configure exception settings in VS:
Try
    Dim result = riskyOperation()
Catch ex As CustomException
    ' Set breakpoint here
    Debug.WriteLine(ex.StackTrace)
    ' Use Exception Helper to analyze
Finally
    ' Check cleanup operations
End Try`}
                        </pre>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">2. Memory Windows</h4>
                        <ul className="list-disc pl-5 mb-4">
                          <li>View memory contents directly</li>
                          <li>Track memory leaks</li>
                          <li>Monitor object lifetime</li>
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold">3. Remote Debugging</h4>
                        <ul className="list-disc pl-5 mb-4">
                          <li>Configure remote debugger</li>
                          <li>Set up authentication</li>
                          <li>Attach to remote process</li>
                          <li>Debug production issues</li>
                        </ul>
                      </div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">
              <section className="bg-gray-500 p-4 rounded-lg border">
                <h3 className="text-xl text-black font-semibold mb-4">Debug Practice Scenarios</h3>
                <div className="prose max-w-none">
                  <div className="mb-4">
                    <h4 className="font-semibold text-black">Scenario 1: Find the Bug</h4>
                    <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Public Function CalculateTotal(items As List(Of OrderItem)) As Decimal
    Dim total As Decimal = 0
    For i As Integer = 1 To items.Count
        total += items(i).Price * items(i).Quantity
    Next
    Return total
End Function

' Task: Debug why this function throws an exception
' Hint: Check array indexing`}
                    </pre>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-black">Scenario 2: Performance Issue</h4>
                    <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Public Sub ProcessLargeList(items As List(Of String))
    Dim result As New List(Of String)
    For Each item In items
        If item.StartsWith("A") Then
            result.Add(item)
        End If
        System.Threading.Thread.Sleep(100) ' Simulated work
    Next
End Sub

' Task: Use debugging tools to identify the performance bottleneck
' Hint: Check execution time and loop operations`}
                    </pre>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-black">Scenario 3: Memory Leak</h4>
                    <pre className="bg-gray-300 text-black p-4 rounded-lg text-sm">
{`Public Class ResourceManager
    Private resources As New List(Of IDisposable)
    
    Public Sub AddResource(resource As IDisposable)
        resources.Add(resource)
    End Sub
    
    Public Sub CleanupResources()
        resources.Clear()
    End Sub
End Class

' Task: Use debugging tools to find the memory leak
' Hint: Check resource disposal`}
                    </pre>
                  </div>

                  <div className="mt-4"><h4 className="font-semibold text-black">Debugging Tips</h4>
                    <ul className="list-disc space-y-2 bg-gray-300 text-black p-4 rounded-lg text-sm">
                      <li>Start with reproducible test cases</li>
                      <li>Use strategic breakpoints</li>
                      <li>Check variable values at each step</li>
                      <li>Pay attention to loop conditions</li>
                      <li>Monitor resource usage</li>
                      <li>Use Debug.WriteLine for logging</li>
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
