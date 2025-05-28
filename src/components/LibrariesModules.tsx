import { useState } from 'react';

interface Section {
  title: string;
  content: string;
  code?: string;
  list?: string[];
  imagePath?: string;
  description?: string;
  steps?: string[];
  examples?: string[];
}

interface LibrariesModulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections: Section[] = [
  {
    title: "Built-in Libraries",
    content: "VB.NET comes with a rich set of built-in libraries in the .NET Framework",
    description: "Learn about the essential built-in libraries that make VB.NET development more efficient",
    list: [
      "System: Core functionality, base types, and essential features",
      "System.Collections: Arrays, lists, dictionaries, and other data structures",
      "System.IO: File and stream handling operations",
      "System.Data: Database access and manipulation",
      "System.Net: Network programming and web services",
      "System.Windows.Forms: GUI development",
      "System.Xml: XML processing and manipulation"
    ]
  },
  {
    title: "Modules in VB.NET",
    content: "Modules are containers for shared members that can be accessed without creating an instance",
    description: "Understanding modules and their usage in VB.NET applications",
    code: `' Standard Module declaration
Module MathUtilities
    ' Shared variables (accessible without instance)
    Public Shared Pi As Double = 3.14159
    Private Shared calculationCount As Integer = 0

    ' Shared function
    Public Shared Function CalculateCircleArea(radius As Double) As Double
        calculationCount += 1
        Return Pi * radius * radius
    End Function

    ' Shared sub procedure
    Public Shared Sub ResetCalculationCount()
        calculationCount = 0
    End Sub

    ' Shared read-only property
    Public Shared ReadOnly Property CalculationsPerformed As Integer
        Get
            Return calculationCount
        End Get
    End Property
End Module

' Using the module
Public Class CircleCalculator
    Public Sub DisplayArea(radius As Double)
        Dim area = MathUtilities.CalculateCircleArea(radius)
        Console.WriteLine($"Area: {area}")
        Console.WriteLine($"Calculations performed: {MathUtilities.CalculationsPerformed}")
    End Sub
End Class`
  },
  {
    title: "Creating Custom Libraries",
    content: "Learn how to create and distribute your own class libraries",
    description: "Build reusable components that can be shared across multiple projects",
    steps: [
      "Create a Class Library project in Visual Studio",
      "Implement your classes and functionality",
      "Build the library as a DLL",
      "Reference the library in other projects",
      "Create XML documentation for IntelliSense support"
    ],
    code: `' Custom Library Example (SaveToFile.dll)
Imports System.IO

Public Class FileManager
    Private ReadOnly basePath As String

    Public Sub New(path As String)
        basePath = path
    End Sub

    Public Function SaveText(fileName As String, content As String) As Boolean
        Try
            File.WriteAllText(Path.Combine(basePath, fileName), content)
            Return True
        Catch ex As Exception
            Return False
        End Try
    End Function

    Public Function LoadText(fileName As String) As String
        Return File.ReadAllText(Path.Combine(basePath, fileName))
    End Function
End Class

' Using the custom library in another project
Imports SaveToFile

Public Class DocumentManager
    Private ReadOnly fileManager As New FileManager("C:\\Documents")

    Public Sub SaveDocument(name As String, content As String)
        If fileManager.SaveText(name, content) Then
            Console.WriteLine("Document saved successfully")
        End If
    End Sub
End Class`
  },
  {
    title: "NuGet Package Management",
    content: "Using NuGet to manage external libraries and dependencies",
    description: "Learn how to find, install, and update third-party libraries using NuGet",
    steps: [
      "Open NuGet Package Manager in Visual Studio",
      "Search for desired packages",
      "Install selected packages",
      "Update packages when new versions are available",
      "Manage package dependencies"
    ],
    examples: [
      "Install-Package Newtonsoft.Json",
      "Install-Package MySql.Data",
      "Install-Package System.Data.SQLite"
    ],
    code: `' Using Newtonsoft.Json NuGet package
Imports Newtonsoft.Json

Public Class Person
    Public Property Name As String
    Public Property Age As Integer
    Public Property Email As String
End Class

Public Class JsonExample
    Public Sub SerializeObject()
        Dim person As New Person With {
            .Name = "John Doe",
            .Age = 30,
            .Email = "john@example.com"
        }

        ' Serialize to JSON
        Dim jsonString = JsonConvert.SerializeObject(person, Formatting.Indented)
        Console.WriteLine(jsonString)

        ' Deserialize from JSON
        Dim deserializedPerson = JsonConvert.DeserializeObject(Of Person)(jsonString)
        Console.WriteLine($"Name: {deserializedPerson.Name}")
    End Sub
End Class`
  },
  {
    title: "Best Practices",
    content: "Guidelines for using libraries and modules effectively",
    list: [
      "Keep modules focused and single-responsibility",
      "Use meaningful names for modules and their members",
      "Document public interfaces and methods",
      "Implement proper error handling",
      "Consider performance implications",
      "Use appropriate access modifiers",
      "Follow naming conventions",
      "Create unit tests for library code"
    ]
  }
];

export function LibrariesModulesModal({ isOpen, onClose }: LibrariesModulesModalProps) {
  const [activeSection, setActiveSection] = useState<number>(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-blue-400">Libraries & Modules</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Navigation */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-4 py-2 rounded-lg flex-shrink-0 ${
                  activeSection === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            <section className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                {sections[activeSection].title}
              </h3>
              <div className="space-y-4">
                <p className="text-gray-200">{sections[activeSection].content}</p>

                {sections[activeSection].description && (
                  <div className="bg-gray-600 p-4 rounded-lg">
                    <p className="text-gray-200">{sections[activeSection].description}</p>
                  </div>
                )}

                {sections[activeSection].list && (
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-2">Key Points:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-200">
                      {sections[activeSection].list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {sections[activeSection].steps && (
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-2">Steps:</h4>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-200">
                      {sections[activeSection].steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

                {sections[activeSection].examples && (
                  <div>
                    <h4 className="text-lg font-semibold text-blue-300 mb-2">Examples:</h4>
                    <div className="bg-gray-900 p-4 rounded-lg text-gray-100">
                      {sections[activeSection].examples.map((example, i) => (
                        <code key={i} className="block">{example}</code>
                      ))}
                    </div>
                  </div>
                )}

                {sections[activeSection].code && (
                  <pre className="bg-gray-900 p-4 rounded-lg text-gray-100 text-sm overflow-x-auto">
                    {sections[activeSection].code}
                  </pre>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
