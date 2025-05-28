import { useState } from 'react';

interface Section {
  title: string;
  content: string;
  list?: string[];
  code?: string;
  imagePath?: string;
}

interface Lesson {
  id: number;
  title: string;
  sections: Section[];
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Introduction to Visual Basic 2019",
    sections: [
      {
        title: "What is Visual Basic 2019",
        content: `Visual Basic 2019 is an object-oriented programming language which is very easy to learn. The language is designed for creating type-safe and object-oriented applications quickly and efficiently.`,
        imagePath: "/src/assets/vbnet-images/vs2019-start.png"
      },
      {
        title: "The Visual Studio 2019 IDE",
        content: "The Visual Studio IDE consists of:",
        list: [
          "Menu Bar - Contains commands for controlling the IDE",
          "Toolbox - Contains all the controls for building your application",
          "Solution Explorer - Shows all files in your project",
          "Properties Window - Shows properties of selected items",
          "Form Designer - Visual interface for creating forms",
          "Code Editor - Where you write and edit code"
        ],
        imagePath: "/src/assets/vbnet-images/vs2019-ide.png"
      }
    ]
  },
  {
    id: 2,
    title: "Your First VB Program",
    sections: [
      {
        title: "Creating a New Project",
        content: "Steps to create your first VB.NET program:",
        list: [
          "Start Visual Studio 2019",
          "Click on 'Create a new project'",
          "Select 'Windows Forms App (.NET Framework)'",
          "Choose a name and location for your project"
        ],
        imagePath: "/src/assets/vbnet-images/new-project.png"
      }
    ]
  },
  {
    id: 3,
    title: "Data Types & Variables",
    sections: [
      {
        title: "VB.NET Data Types",
        content: "Common data types in VB.NET:",
        list: [
          "Integer - Whole numbers",
          "Double - Decimal numbers",
          "String - Text data",
          "Boolean - True/False values",
          "Date - Date and time values"
        ],
        code: `Dim age As Integer = 25
Dim price As Double = 99.99
Dim name As String = "John"
Dim isValid As Boolean = True
Dim today As Date = Date.Now`
      }
    ]
  },
  {
    id: 4,
    title: "Control Structures",
    sections: [
      {
        title: "If...Then Statement",
        content: "Basic conditional statements in VB.NET:",
        code: `If age >= 18 Then
    MessageBox.Show("You are an adult")
Else
    MessageBox.Show("You are a minor")
End If`,
        imagePath: "/src/assets/vbnet-images/if-then.png"
      },
      {
        title: "Select Case Statement",
        content: "Alternative to multiple If...Then statements:",
        code: `Select Case grade
    Case "A"
        MessageBox.Show("Excellent!")
    Case "B"
        MessageBox.Show("Good job!")
    Case "C"
        MessageBox.Show("You passed")
    Case Else
        MessageBox.Show("Try harder")
End Select`
      }
    ]
  },
  {
    id: 5,
    title: "Loops",
    sections: [
      {
        title: "For...Next Loop",
        content: "Used when you know the number of iterations:",
        code: `For i As Integer = 1 To 5
    MessageBox.Show("Count: " & i)
Next`,
        imagePath: "/src/assets/vbnet-images/for-loop.png"
      },
      {
        title: "Do While Loop",
        content: "Used when you don't know the number of iterations:",
        code: `Do While count > 0
    ProcessItem()
    count -= 1
Loop`
      }
    ]
  },
  {
    id: 6,
    title: "Arrays and Collections",
    sections: [
      {
        title: "Arrays",
        content: "Working with fixed-size collections of data:",
        code: `' Declaring and using arrays
Dim numbers(4) As Integer  ' Creates a 5-element array
numbers(0) = 10
numbers(1) = 20
numbers(2) = 30
numbers(3) = 40
numbers(4) = 50`
      },
      {
        title: "List Collections",
        content: "Working with dynamic collections:",
        code: `' Using List(Of T)
Dim names As New List(Of String)
names.Add("John")
names.Add("Jane")
names.Add("Bob")`
      }
    ]
  },
  {
    id: 7,
    title: "Functions and Procedures",
    sections: [
      {
        title: "Functions",
        content: "Functions return values:",
        code: `Function CalculateArea(ByVal width As Double, ByVal height As Double) As Double
    Return width * height
End Function`,
        imagePath: "/src/assets/vbnet-images/functions.png"
      },
      {
        title: "Subroutines (Procedures)",
        content: "Procedures don't return values:",
        code: `Sub DisplayMessage(ByVal message As String)
    MessageBox.Show(message)
End Sub`
      }
    ]
  },
  {
    id: 8,
    title: "Working with Forms",
    sections: [
      {
        title: "Form Properties",
        content: "Common form properties you can set:",
        list: [
          "Text - The title of the form",
          "BackColor - Background color",
          "Size - Width and height",
          "StartPosition - Initial position when form loads",
          "FormBorderStyle - Appearance of form borders"
        ],
        imagePath: "/src/assets/vbnet-images/form-properties.png"
      },
      {
        title: "Form Events",
        content: "Important form events to handle:",
        list: [
          "Load - When form first loads",
          "Click - When form is clicked",
          "Closing - Before form closes",
          "Resize - When form size changes"
        ],
        code: `Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
    ' Code to run when form loads
End Sub`
      }
    ]
  },
  {
    id: 9,
    title: "Common Controls",
    sections: [
      {
        title: "TextBox Control",
        content: "For user input:",
        code: `' Getting text from TextBox
Dim userInput As String = TextBox1.Text

' Setting text in TextBox
TextBox1.Text = "Hello World"`,
        imagePath: "/src/assets/vbnet-images/textbox.png"
      },
      {
        title: "Button Control",
        content: "For user actions:",
        code: `Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
    MessageBox.Show("Button was clicked!")
End Sub`
      }
    ]
  },
  {
    id: 10,
    title: "Error Handling",
    sections: [
      {
        title: "Try...Catch",
        content: "Basic error handling in VB.NET:",
        code: `Try
    Dim result As Integer = number1 / number2
Catch ex As DivideByZeroException
    MessageBox.Show("Cannot divide by zero!")
Catch ex As Exception
    MessageBox.Show("An error occurred: " & ex.Message)
Finally
    ' Code that runs whether there was an error or not
End Try`,
        imagePath: "/src/assets/vbnet-images/error-handling.png"
      }
    ]
  }
];

interface BasicConceptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BasicConceptsModal({ isOpen, onClose }: BasicConceptsModalProps) {
  const [activeLesson, setActiveLesson] = useState<number>(1);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-[95vw] sm:max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">VB.NET: Basic Concepts</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
            >
              ✕
            </button>
          </div>
          
          {/* Lesson Navigation */}
          <div className="flex space-x-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-2 px-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lesson) => (
              <button
                key={lesson}
                onClick={() => setActiveLesson(lesson)}
                className={`px-4 py-2 rounded-lg flex-shrink-0 ${
                  activeLesson === lesson
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Lesson {lesson}
              </button>
            ))}
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            {lessons[activeLesson - 1]?.sections.map((section, index) => (
              <section key={index}>
                <h3 className="text-2xl font-semibold text-blue-500 mb-3">{section.title}</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                  <p className="mb-4">{section.content}</p>
                  
                  {section.list && (
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.code && (
                    <pre className="bg-gray-100 p-4 rounded-lg text-sm mb-4">
                      {section.code}
                    </pre>
                  )}

                  {section.imagePath && (
                    <div className="mt-4">
                      <img 
                        src={section.imagePath} 
                        alt={section.title}
                        className="rounded-lg shadow-md max-w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </section>
            ))}
            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">What is Visual Basic 2019?</h3>
              <div className="space-y-2 text-gray-700">
                <p>Visual Basic 2019 is the latest version of Visual Basic, a popular programming language developed by Microsoft. It is now part of Visual Studio 2019, a complete integrated development environment (IDE). Some key points about VB 2019:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>It's an object-oriented programming language</li>
                  <li>Helps create Windows applications quickly and easily</li>
                  <li>Includes powerful tools for development</li>
                  <li>Fully integrated with the .NET Framework</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Visual Studio IDE</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold mb-2">Main Components:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Menu Bar - Contains all commands needed to control the IDE</li>
                  <li>Toolbar - Quick access to commonly used commands</li>
                  <li>Solution Explorer - Shows all files in your project</li>
                  <li>Properties Window - Displays and modifies object properties</li>
                  <li>Form Designer - Visual interface for creating forms</li>
                  <li>Code Editor - Where you write and edit code</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Writing Your First Program</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">A simple "Hello World" program in VB.NET:</p>
                <pre className="text-sm text-gray-800 bg-gray-100 p-4 rounded">
{`Public Class Form1
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        MessageBox.Show("Hello World!")
    End Sub
End Class`}
                </pre>
                <div className="mt-4 text-gray-700">
                  <p className="font-semibold">Program Breakdown:</p>
                  <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>Public Class Form1 - Defines the main form of the application</li>
                    <li>Private Sub - Declares a procedure that handles the form loading</li>
                    <li>MessageBox.Show - Displays a message box with text</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Project Types</h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">Visual Basic 2019 lets you create various types of applications:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Windows Forms Applications - Traditional desktop apps</li>
                  <li>Console Applications - Text-based programs</li>
                  <li>WPF Applications - Modern UI applications</li>
                  <li>Web Applications - Browser-based programs</li>
                  <li>Class Libraries - Reusable code components</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Basic Programming Concepts</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold mb-2">Key Elements:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Variables - Store and manipulate data</li>
                  <li>Data Types - Define what kind of data can be stored</li>
                  <li>Operators - Perform operations on data</li>
                  <li>Control Structures - Control program flow</li>
                  <li>Procedures - Organize and reuse code</li>
                </ul>
                <div className="mt-4">
                  <p className="font-semibold mb-2">Example of Variable Declaration:</p>
                  <pre className="text-sm text-gray-800 bg-gray-100 p-4 rounded">
{`Dim strName As String           'Declare a string variable
Dim intAge As Integer           'Declare an integer variable
Dim dblPrice As Double          'Declare a double variable
Dim blnIsValid As Boolean       'Declare a boolean variable`}
                  </pre>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Visual Basic Editions</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Visual Basic Community Edition - Free for students, open-source developers, and individual developers</li>
                  <li>Visual Basic Professional Edition - For professional developers</li>
                  <li>Visual Basic Enterprise Edition - For enterprise development teams</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Writing Code in VB.NET</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold mb-2">Basic Rules:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Each statement must be written in one line</li>
                  <li>To continue a statement in the next line, use the underscore (_) symbol</li>
                  <li>Use apostrophe (') for comments</li>
                  <li>Keywords are not case sensitive</li>
                </ul>
                <div className="mt-4">
                  <p className="font-semibold mb-2">Example of Line Continuation:</p>
                  <pre className="text-sm text-gray-800 bg-gray-100 p-4 rounded">
{`MessageBox.Show("This is a very long message that " & _
                 "needs to be continued on the next line")

' This is a comment
Dim MyNumber As Integer   'This declares a variable`}
                  </pre>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Common Controls</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <h4 className="font-semibold mb-2">Basic Form Controls:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Form - The window that holds other controls</li>
                  <li>Label - Displays text that users can't change</li>
                  <li>TextBox - Allows users to input or edit text</li>
                  <li>Button - Performs an action when clicked</li>
                  <li>ComboBox - Provides a dropdown list of choices</li>
                  <li>CheckBox - Allows yes/no or true/false selections</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-semibold text-blue-500 mb-3">Getting Started Steps</h3>
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Install Visual Studio 2019 (Community Edition is free)</li>
                  <li>Launch Visual Studio</li>
                  <li>Select "Create a new project"</li>
                  <li>Choose "Windows Forms App (.NET Framework)"</li>
                  <li>Name your project and choose location</li>
                  <li>Start building your application</li>
                </ol>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
