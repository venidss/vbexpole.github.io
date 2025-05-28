import { useState } from 'react';

interface Section {
  title: string;
  content: string;
  code?: string;
  list?: string[];
  imagePath?: string;
}

interface Lesson {
  id: number;
  title: string;
  sections: Section[];
}

interface OOPConceptsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: "Classes and Objects",
    sections: [
      {
        title: "Understanding Classes",
        content: "A class is a blueprint for creating objects. It defines properties (data) and methods (behavior).",
        code: `' Class definition
Public Class Student
    ' Properties
    Public Property Name As String
    Public Property Age As Integer
    Private _grade As String

    ' Constructor
    Public Sub New(name As String, age As Integer)
        Me.Name = name
        Me.Age = age
    End Sub

    ' Method
    Public Function GetDetails() As String
        Return $"Name: {Name}, Age: {Age}"
    End Function
End Class

' Creating an object
Dim student1 As New Student("John Smith", 20)`,
        imagePath: "/src/assets/vbnet-images/class-object.png"
      },
      {
        title: "Properties and Fields",
        content: "Properties provide a way to access and modify object data safely:",
        code: `Public Class BankAccount
    ' Private field
    Private _balance As Decimal

    ' Property with validation
    Public Property Balance As Decimal
        Get
            Return _balance
        End Get
        Set(value As Decimal)
            If value >= 0 Then
                _balance = value
            Else
                Throw New ArgumentException("Balance cannot be negative")
            End If
        End Set
    End Property
End Class`
      }
    ]
  },
  {
    id: 2,
    title: "Inheritance",
    sections: [
      {
        title: "Class Inheritance",
        content: "Inheritance allows you to create new classes based on existing classes:",
        code: `' Base class
Public Class Vehicle
    Public Property Brand As String
    Public Property Model As String

    Public Overridable Function GetInfo() As String
        Return $"{Brand} {Model}"
    End Function
End Class

' Derived class
Public Class Car
    Inherits Vehicle

    Public Property NumDoors As Integer

    Public Overrides Function GetInfo() As String
        Return $"{Brand} {Model} with {NumDoors} doors"
    End Function
End Class`,
        imagePath: "/src/assets/vbnet-images/inheritance.png"
      }
    ]
  },
  {
    id: 3,
    title: "Polymorphism",
    sections: [
      {
        title: "Method Overriding",
        content: "Polymorphism allows different classes to implement methods in their own way:",
        code: `Public Class Animal
    Public Overridable Function MakeSound() As String
        Return "Some sound"
    End Function
End Class

Public Class Dog
    Inherits Animal
    Public Overrides Function MakeSound() As String
        Return "Woof!"
    End Function
End Class

Public Class Cat
    Inherits Animal
    Public Overrides Function MakeSound() As String
        Return "Meow!"
    End Function
End Class`
      },
      {
        title: "Method Overloading",
        content: "Multiple versions of a method with different parameters:",
        code: `Public Class Calculator
    Public Function Add(x As Integer, y As Integer) As Integer
        Return x + y
    End Function

    Public Function Add(x As Double, y As Double) As Double
        Return x + y
    End Function

    Public Function Add(numbers As Integer()) As Integer
        Return numbers.Sum()
    End Function
End Class`
      }
    ]
  },
  {
    id: 4,
    title: "Encapsulation",
    sections: [
      {
        title: "Access Modifiers",
        content: "Control access to class members:",
        list: [
          "Public - Accessible from anywhere",
          "Private - Only accessible within the same class",
          "Protected - Accessible in the same class and derived classes",
          "Friend - Accessible within the same project"
        ],
        code: `Public Class Employee
    Private _salary As Decimal
    Protected _department As String
    Friend _companyName As String

    Public Property Name As String

    Private Sub CalculateBonus()
        ' Internal calculation
    End Sub

    Public Function GetYearlyReport() As String
        ' Public interface
        Return "Report data"
    End Function
End Class`
      }
    ]
  },
  {
    id: 5,
    title: "Interfaces",
    sections: [
      {
        title: "Interface Implementation",
        content: "Interfaces define a contract that classes must follow:",
        code: `Public Interface IPayable
    Function CalculatePayment() As Decimal
End Interface

Public Class Invoice
    Implements IPayable
    
    Public Property Amount As Decimal
    
    Public Function CalculatePayment() As Decimal _
    Implements IPayable.CalculatePayment
        Return Amount + (Amount * 0.1) ' With 10% tax
    End Function
End Class`,
        imagePath: "/src/assets/vbnet-images/interfaces.png"
      }
    ]
  },
  {
    id: 6,
    title: "Abstract Classes",
    sections: [
      {
        title: "Abstract Class Usage",
        content: "Abstract classes provide a base for other classes:",
        code: `Public MustInherit Class Shape
    Public MustOverride Function CalculateArea() As Double
    Public MustOverride Function CalculatePerimeter() As Double

    Public Function GetInfo() As String
        Return $"Area: {CalculateArea()}, Perimeter: {CalculatePerimeter()}"
    End Function
End Class

Public Class Circle
    Inherits Shape

    Public Property Radius As Double

    Public Overrides Function CalculateArea() As Double
        Return Math.PI * Radius * Radius
    End Function

    Public Overrides Function CalculatePerimeter() As Double
        Return 2 * Math.PI * Radius
    End Function
End Class`
      }
    ]
  }
]

export function OOPConceptsModal({ isOpen, onClose }: OOPConceptsModalProps) {
  const [activeLesson, setActiveLesson] = useState<number>(1);

  if (!isOpen) return null;

  return (    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-[95vw] sm:max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-3 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-400">Object-Oriented Programming in VB.NET</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 text-xl sm:text-2xl"
            >
              ✕
            </button>
          </div>          {/* Lesson Navigation */}
          <div className="flex space-x-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-2 px-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(lesson.id)}
                className={`px-3 sm:px-4 py-2 rounded-lg flex-shrink-0 text-sm sm:text-base ${
                  activeLesson === lesson.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                {lesson.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-6">
            {lessons[activeLesson - 1]?.sections.map((section, index) => (              <section key={index} className="bg-gray-700 rounded-lg p-3 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-300 mb-3 sm:mb-4">{section.title}</h3>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-gray-200 text-sm sm:text-base">{section.content}</p>

                  {section.list && (
                    <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-gray-200 text-sm sm:text-base">
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {section.code && (
                    <pre className="bg-gray-900 p-3 sm:p-4 rounded-lg text-gray-100 text-xs sm:text-sm overflow-x-auto">
                      {section.code}
                    </pre>
                  )}

                  {section.imagePath && (
                    <div className="mt-3 sm:mt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
