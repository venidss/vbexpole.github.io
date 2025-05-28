import { useState } from 'react';

interface DatabaseProgrammingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
}

export function DatabaseProgrammingModal({ isOpen, onClose }: DatabaseProgrammingModalProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'John Doe', age: 20, course: 'Computer Science' },
    { id: 2, name: 'Jane Smith', age: 22, course: 'Information Technology' }
  ]);
  const [newStudent, setNewStudent] = useState<Student>({
    id: students.length + 1,
    name: '',
    age: 18,
    course: ''
  });
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResult, setQueryResult] = useState<string>('');

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.course) {
      setStudents([...students, { ...newStudent, id: students.length + 1 }]);
      setNewStudent({
        id: students.length + 2,
        name: '',
        age: 18,
        course: ''
      });
    }
  };

  const evaluateQuery = () => {
    const query = sqlQuery.toLowerCase().trim();
    try {
      if (query.includes('select')) {
        // Simple SELECT query simulation
        if (query.includes('from students')) {
          setQueryResult(JSON.stringify(students, null, 2));
        }
      } else if (query.includes('insert into students')) {
        setQueryResult('Query executed successfully! Check the table for results.');
      } else {
        setQueryResult('Supported queries: SELECT * FROM Students, INSERT INTO Students ...');
      }
    } catch (error) {
      setQueryResult('Error in SQL query syntax');
    }
  };

  if (!isOpen) return null;

  return (    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="bg-gray-800 rounded-2xl w-full max-w-[95vw] sm:max-w-6xl max-h-[95vh] overflow-y-auto shadow-2xl">
        <div className="p-3 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">Database Programming in VB.NET</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl sm:text-2xl"
            >
              ✕
            </button>
          </div>          <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold ${
                activeTab === 'learn'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              Learn Database Concepts
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold ${
                activeTab === 'practice'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              }`}
            >
              Practice Area
            </button>
          </div>

          {activeTab === 'learn' ? (
            <div className="space-y-6">
              <section>
                <h3 className="text-2xl font-semibold text-blue-500 mb-3">Database Connection</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <pre className="text-sm text-gray-100">
{`' Connect to SQL Server Database
Imports System.Data.SqlClient

Public Class DatabaseConnection
    Private connectionString As String = "Server=localhost;Database=School;Trusted_Connection=True;"
    
    Public Function GetConnection() As SqlConnection
        Return New SqlConnection(connectionString)
    End Function
End Class`}
                  </pre>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold text-blue-500 mb-3">Basic CRUD Operations</h3>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <pre className="text-sm text-gray-100">
{`' Insert Data
Using conn As New SqlConnection(connectionString)
    Dim query As String = "INSERT INTO Students (Name, Age, Course) VALUES (@Name, @Age, @Course)"
    Using cmd As New SqlCommand(query, conn)
        cmd.Parameters.AddWithValue("@Name", "John Doe")
        cmd.Parameters.AddWithValue("@Age", 20)
        cmd.Parameters.AddWithValue("@Course", "Computer Science")
        conn.Open()
        cmd.ExecuteNonQuery()
    End Using
End Using`}
                  </pre>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section className="rounded-lg p-4 bg-gray-700">
                <h3 className="text-xl font-semibold text-blue-500 mb-4">Student Database Practice</h3>
                
                {/* Student Table */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Current Students</h4>
                  <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="px-4 py-2 text-black">ID</th>
                          <th className="px-4 py-2 text-black">Name</th>
                          <th className="px-4 py-2 text-black">Age</th>
                          <th className="px-4 py-2 text-black">Course</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map(student => (
                          <tr key={student.id} className="border-t">
                            <td className="px-4 py-2  text-black">{student.id}</td>
                            <td className="px-4 py-2  text-black">{student.name}</td>
                            <td className="px-4 py-2  text-black">{student.age}</td>
                            <td className="px-4 py-2  text-black">{student.course}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add New Student Form */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Add New Student</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={newStudent.name}
                      onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                      className="border rounded p-2"
                    />
                    <input
                      type="number"
                      placeholder="Age"
                      value={newStudent.age}
                      onChange={e => setNewStudent({ ...newStudent, age: Number(e.target.value) })}
                      className="border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="Course"
                      value={newStudent.course}
                      onChange={e => setNewStudent({ ...newStudent, course: e.target.value })}
                      className="border rounded p-2"
                    />
                    <button
                      onClick={handleAddStudent}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Student
                    </button>
                  </div>
                </div>

                {/* SQL Query Practice */}
                <div>
                  <h4 className="text-lg font-semibold mb-2">Practice SQL Queries</h4>
                  <div className="space-y-4">
                    <textarea
                      value={sqlQuery}
                      onChange={e => setSqlQuery(e.target.value)}
                      placeholder="Enter your SQL query (e.g., SELECT * FROM Students)"
                      className="w-full h-32 border rounded p-2 font-mono"
                    />
                    <button
                      onClick={evaluateQuery}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Execute Query
                    </button>
                    {queryResult && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap">
                          {queryResult}
                        </pre>
                      </div>
                    )}
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
