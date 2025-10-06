import React, { useState, createContext, useContext } from 'react';
import { Calendar, Users, UserCheck, DollarSign, BarChart3, LogOut, Menu, X, Pill, FileText } from 'lucide-react';

// Auth Context
const AuthContext = createContext(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Initial Data
const initialData = {
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User', email: 'admin@hospital.com' },
    { id: 2, username: 'doctor1', password: 'doc123', role: 'doctor', name: 'Dr. Sarah Johnson', email: 'sarah@hospital.com', specialization: 'Cardiology', schedule: 'Mon-Fri, 9AM-5PM' },
    { id: 3, username: 'patient1', password: 'pat123', role: 'patient', name: 'John Doe', email: 'john@example.com', age: 35, gender: 'Male', contact: '+1234567890', medicalHistory: 'Hypertension' }
  ],
  patients: [
    { id: 1, name: 'John Doe', age: 35, gender: 'Male', contact: '+1234567890', medicalHistory: 'Hypertension', userId: 3 }
  ],
  doctors: [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', schedule: 'Mon-Fri, 9AM-5PM', available: true, userId: 2 }
  ],
  appointments: [],
  bills: [],
  medicines: [
    { id: 1, name: 'Paracetamol 500mg', category: 'Pain Relief', price: 15.50, quantity: 100, expiry: '2025-12-31', description: 'Pain reliever and fever reducer', manufacturer: 'ABC Pharma' },
    { id: 2, name: 'Amoxicillin 250mg', category: 'Antibiotic', price: 45.00, quantity: 5, expiry: '2024-06-15', description: 'Broad-spectrum antibiotic', manufacturer: 'XYZ Medical' },
    { id: 3, name: 'Insulin Glargine', category: 'Diabetes', price: 120.00, quantity: 25, expiry: '2025-03-20', description: 'Long-acting insulin', manufacturer: 'MediCorp' },
    { id: 4, name: 'Lisinopril 10mg', category: 'Cardiovascular', price: 28.75, quantity: 0, expiry: '2024-08-10', description: 'ACE inhibitor for blood pressure', manufacturer: 'HealthPlus' },
    { id: 5, name: 'Metformin 500mg', category: 'Diabetes', price: 22.30, quantity: 150, expiry: '2026-01-15', description: 'Type 2 diabetes medication', manufacturer: 'PharmaLife' }
  ],
  labReports: [
    { 
      id: 1, 
      patientId: 1, 
      patientName: 'John Doe', 
      testType: 'Blood Test', 
      testName: 'Complete Blood Count (CBC)', 
      testDate: '2024-01-15', 
      resultDate: '2024-01-16', 
      status: 'Completed', 
      priority: 'Normal', 
      results: {
        'Hemoglobin': '14.2 g/dL',
        'White Blood Cells': '7,500 /μL',
        'Platelets': '250,000 /μL',
        'Hematocrit': '42%'
      },
      normalRanges: {
        'Hemoglobin': '13.8-17.2 g/dL',
        'White Blood Cells': '4,500-11,000 /μL',
        'Platelets': '150,000-450,000 /μL',
        'Hematocrit': '40-52%'
      },
      doctorNotes: 'All values within normal range. Patient is healthy.',
      labTechnician: 'Dr. Sarah Wilson',
      isAbnormal: false
    },
    { 
      id: 2, 
      patientId: 1, 
      patientName: 'John Doe', 
      testType: 'Urine Test', 
      testName: 'Urinalysis', 
      testDate: '2024-01-20', 
      resultDate: '2024-01-20', 
      status: 'Completed', 
      priority: 'High', 
      results: {
        'Glucose': 'Positive',
        'Protein': 'Trace',
        'Blood': 'Negative',
        'Specific Gravity': '1.020'
      },
      normalRanges: {
        'Glucose': 'Negative',
        'Protein': 'Negative',
        'Blood': 'Negative',
        'Specific Gravity': '1.003-1.030'
      },
      doctorNotes: 'Glucose and protein detected. Recommend follow-up with endocrinologist.',
      labTechnician: 'Dr. Michael Chen',
      isAbnormal: true
    },
    { 
      id: 3, 
      patientId: 1, 
      patientName: 'John Doe', 
      testType: 'Imaging', 
      testName: 'Chest X-Ray', 
      testDate: '2024-01-25', 
      resultDate: '2024-01-25', 
      status: 'Pending', 
      priority: 'Normal', 
      results: {},
      normalRanges: {},
      doctorNotes: '',
      labTechnician: 'Dr. Lisa Rodriguez',
      isAbnormal: false
    }
  ]
};

// Login Component
const Login = ({ onLogin, onSwitchToSignup, onSwitchToForgot }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password, setError);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Hospital Management</h1>
          <p className="text-gray-600 mt-2">Sign in to continue</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={onSwitchToForgot}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Sign In
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-2">Demo Credentials:</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Admin: admin / admin123</p>
            <p>Doctor: doctor1 / doc123</p>
            <p>Patient: patient1 / pat123</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8">
        <p className="text-sm text-gray-600">
          Proudly Designed and Developed by{' '}
          <a
            href="https://rameshgamage.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Ramesh Gamage
          </a>
        </p>
      </footer>
    </div>
  );
};

// Sign Up Component
const SignUp = ({ onSignup, onSwitchToLogin, data }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    role: 'patient',
    age: '',
    gender: '',
    contact: '',
    specialization: '',
    schedule: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    const usernameExists = data.users.find(u => u.username === formData.username);
    if (usernameExists) {
      setError('Username already exists');
      return;
    }

    onSignup(formData, setError, setSuccess);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 my-8">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Sign up to get started</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="johndoe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>

          {formData.role === 'patient' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="35"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1234567890"
                />
              </div>
            </div>
          )}

          {formData.role === 'doctor' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Cardiology"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mon-Fri, 9AM-5PM"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Min 6 characters"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Re-enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {success}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Create Account
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8">
        <p className="text-sm text-gray-600">
          Proudly Designed and Developed by{' '}
          <a
            href="https://rameshgamage.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Ramesh Gamage
          </a>
        </p>
      </footer>
    </div>
  );
};

// Forgot Password Component
const ForgotPassword = ({ onResetPassword, onSwitchToLogin, data }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleVerify = () => {
    const user = data.users.find(u => u.username === username && u.email === email);
    if (user) {
      setStep(2);
      setError('');
    } else {
      setError('Invalid username or email');
    }
  };

  const handleReset = () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    onResetPassword(username, newPassword, setSuccess, setError);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
          <p className="text-gray-600 mt-2">
            {step === 1 ? 'Verify your identity' : 'Create new password'}
          </p>
        </div>

        <div className="space-y-6">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                onClick={handleVerify}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
              >
                Verify Identity
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Min 6 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Re-enter password"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  {success}
                </div>
              )}

              <button
                onClick={handleReset}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
              >
                Reset Password
              </button>
            </>
          )}

          <div className="text-center">
            <button
              onClick={onSwitchToLogin}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8">
        <p className="text-sm text-gray-600">
          Proudly Designed and Developed by{' '}
          <a
            href="https://rameshgamage.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Ramesh Gamage
          </a>
        </p>
      </footer>
    </div>
  );
};

// Lab Reports Content Component
const LabReportsContent = () => {
  const { currentUser, data, setData } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedTestType, setSelectedTestType] = useState('All');
  const [editingReport, setEditingReport] = useState(null);
  const [viewingReport, setViewingReport] = useState(null);

  const statuses = ['All', 'Pending', 'Completed', 'Cancelled'];
  const testTypes = ['All', 'Blood Test', 'Urine Test', 'Imaging', 'Cardiology', 'Other'];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = data.labReports.filter(report => {
    const matchesSearch = report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.testType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || report.status === selectedStatus;
    const matchesTestType = selectedTestType === 'All' || report.testType === selectedTestType;
    return matchesSearch && matchesStatus && matchesTestType;
  });

  const handleAddReport = (formData) => {
    const newId = Math.max(...data.labReports.map(r => r.id), 0) + 1;
    const newReport = {
      id: newId,
      ...formData,
      testDate: formData.testDate,
      resultDate: formData.resultDate || formData.testDate,
      results: formData.results || {},
      normalRanges: formData.normalRanges || {},
      isAbnormal: formData.isAbnormal || false
    };
    
    setData({
      ...data,
      labReports: [...data.labReports, newReport]
    });
    setShowAddForm(false);
  };

  const handleEditReport = (formData) => {
    setData({
      ...data,
      labReports: data.labReports.map(report =>
        report.id === editingReport.id
          ? { ...report, ...formData, testDate: formData.testDate, resultDate: formData.resultDate }
          : report
      )
    });
    setEditingReport(null);
  };

  const handleDeleteReport = (id) => {
    if (window.confirm('Are you sure you want to delete this lab report?')) {
      setData({
        ...data,
        labReports: data.labReports.filter(report => report.id !== id)
      });
    }
  };

  const canEditDelete = (report) => {
    return currentUser.role === 'admin' || 
           (currentUser.role === 'doctor' && report.status === 'Pending');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lab Reports Management</h2>
          <p className="text-gray-600">Manage test results and lab reports</p>
        </div>
        {(currentUser.role === 'admin' || currentUser.role === 'doctor') && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center gap-2"
          >
            <FileText size={20} />
            Add Lab Report
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search reports by patient name, test name, or test type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedTestType}
              onChange={(e) => setSelectedTestType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {testTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lab Reports List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{report.patientName}</div>
                    <div className="text-sm text-gray-500">ID: {report.patientId}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{report.testName}</div>
                    <div className="text-sm text-gray-500">{report.testType}</div>
                    {report.isAbnormal && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                        Abnormal Results
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.testDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.resultDate ? new Date(report.resultDate).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setViewingReport(report)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                      {canEditDelete(report) && (
                        <>
                          <button
                            onClick={() => setEditingReport(report)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReport(report.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No lab reports found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Lab Report Modal */}
      {(showAddForm || editingReport) && (
        <LabReportForm
          report={editingReport}
          patients={data.patients}
          onSave={editingReport ? handleEditReport : handleAddReport}
          onCancel={() => {
            setShowAddForm(false);
            setEditingReport(null);
          }}
        />
      )}

      {/* View Lab Report Modal */}
      {viewingReport && (
        <LabReportViewer
          report={viewingReport}
          onClose={() => setViewingReport(null)}
        />
      )}
    </div>
  );
};

// Lab Report Form Component
const LabReportForm = ({ report, patients, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: report?.patientId || '',
    testType: report?.testType || '',
    testName: report?.testName || '',
    testDate: report?.testDate || new Date().toISOString().split('T')[0],
    resultDate: report?.resultDate || '',
    status: report?.status || 'Pending',
    priority: report?.priority || 'Normal',
    labTechnician: report?.labTechnician || '',
    doctorNotes: report?.doctorNotes || '',
    isAbnormal: report?.isAbnormal || false
  });

  const [results, setResults] = useState(report?.results || {});
  const [normalRanges, setNormalRanges] = useState(report?.normalRanges || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedPatient = patients.find(p => p.id === parseInt(formData.patientId));
    onSave({
      ...formData,
      patientName: selectedPatient?.name || '',
      results,
      normalRanges
    });
  };

  const addResultField = () => {
    const key = prompt('Enter test parameter name:');
    if (key) {
      setResults({...results, [key]: ''});
      setNormalRanges({...normalRanges, [key]: ''});
    }
  };

  const removeResultField = (key) => {
    const newResults = {...results};
    const newRanges = {...normalRanges};
    delete newResults[key];
    delete newRanges[key];
    setResults(newResults);
    setNormalRanges(newRanges);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {report ? 'Edit Lab Report' : 'Add New Lab Report'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                <select
                  required
                  value={formData.patientId}
                  onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Type</label>
                <select
                  required
                  value={formData.testType}
                  onChange={(e) => setFormData({...formData, testType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Test Type</option>
                  <option value="Blood Test">Blood Test</option>
                  <option value="Urine Test">Urine Test</option>
                  <option value="Imaging">Imaging</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Name</label>
              <input
                type="text"
                required
                value={formData.testName}
                onChange={(e) => setFormData({...formData, testName: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Complete Blood Count (CBC)"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Date</label>
                <input
                  type="date"
                  required
                  value={formData.testDate}
                  onChange={(e) => setFormData({...formData, testDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Result Date</label>
                <input
                  type="date"
                  value={formData.resultDate}
                  onChange={(e) => setFormData({...formData, resultDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lab Technician</label>
                <input
                  type="text"
                  value={formData.labTechnician}
                  onChange={(e) => setFormData({...formData, labTechnician: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Dr. Sarah Wilson"
                />
              </div>
            </div>

            {/* Test Results Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Test Results</label>
                <button
                  type="button"
                  onClick={addResultField}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  + Add Parameter
                </button>
              </div>
              <div className="space-y-2">
                {Object.keys(results).map(key => (
                  <div key={key} className="grid grid-cols-3 gap-2 items-center">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newResults = {...results};
                        const newRanges = {...normalRanges};
                        delete newResults[key];
                        delete newRanges[key];
                        newResults[e.target.value] = results[key];
                        newRanges[e.target.value] = normalRanges[key];
                        setResults(newResults);
                        setNormalRanges(newRanges);
                      }}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Parameter name"
                    />
                    <input
                      type="text"
                      value={results[key]}
                      onChange={(e) => setResults({...results, [key]: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Result value"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={normalRanges[key] || ''}
                        onChange={(e) => setNormalRanges({...normalRanges, [key]: e.target.value})}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Normal range"
                      />
                      <button
                        type="button"
                        onClick={() => removeResultField(key)}
                        className="px-2 py-2 text-red-600 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Notes</label>
              <textarea
                value={formData.doctorNotes}
                onChange={(e) => setFormData({...formData, doctorNotes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="Enter doctor's notes and observations..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAbnormal"
                checked={formData.isAbnormal}
                onChange={(e) => setFormData({...formData, isAbnormal: e.target.checked})}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="isAbnormal" className="ml-2 block text-sm text-gray-900">
                Mark as abnormal results
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                {report ? 'Update Report' : 'Add Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Lab Report Viewer Component
const LabReportViewer = ({ report, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Lab Report Details</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Patient Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Patient Information</h4>
              <p className="text-sm text-gray-600">Name: {report.patientName}</p>
              <p className="text-sm text-gray-600">Patient ID: {report.patientId}</p>
            </div>

            {/* Test Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Test Information</h4>
                <p className="text-sm text-gray-600">Test Name: {report.testName}</p>
                <p className="text-sm text-gray-600">Test Type: {report.testType}</p>
                <p className="text-sm text-gray-600">Test Date: {new Date(report.testDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Result Date: {report.resultDate ? new Date(report.resultDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Status & Priority</h4>
                <div className="space-y-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {report.status}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    report.priority === 'High' ? 'bg-red-100 text-red-800' :
                    report.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {report.priority} Priority
                  </span>
                  {report.isAbnormal && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Abnormal Results
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Test Results */}
            {Object.keys(report.results).length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Test Results</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Normal Range</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(report.results).map(([parameter, result]) => (
                        <tr key={parameter}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {parameter}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {result}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {report.normalRanges[parameter] || 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Doctor Notes */}
            {report.doctorNotes && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Doctor Notes</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{report.doctorNotes}</p>
              </div>
            )}

            {/* Lab Technician */}
            {report.labTechnician && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Lab Technician</h4>
                <p className="text-sm text-gray-600">{report.labTechnician}</p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pharmacy Content Component
const PharmacyContent = () => {
  const { currentUser, data, setData } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingMedicine, setEditingMedicine] = useState(null);

  const categories = ['All', 'Pain Relief', 'Antibiotic', 'Diabetes', 'Cardiovascular', 'Other'];

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'Out of Stock', color: 'bg-red-100 text-red-800' };
    if (quantity <= 10) return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'In Stock', color: 'bg-green-100 text-green-800' };
  };

  const filteredMedicines = data.medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddMedicine = (formData) => {
    const newId = Math.max(...data.medicines.map(m => m.id), 0) + 1;
    const newMedicine = {
      id: newId,
      ...formData,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price)
    };
    
    setData({
      ...data,
      medicines: [...data.medicines, newMedicine]
    });
    setShowAddForm(false);
  };

  const handleEditMedicine = (formData) => {
    setData({
      ...data,
      medicines: data.medicines.map(medicine =>
        medicine.id === editingMedicine.id
          ? { ...medicine, ...formData, quantity: parseInt(formData.quantity), price: parseFloat(formData.price) }
          : medicine
      )
    });
    setEditingMedicine(null);
  };

  const handleDeleteMedicine = (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setData({
        ...data,
        medicines: data.medicines.filter(medicine => medicine.id !== id)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pharmacy Management</h2>
          <p className="text-gray-600">Manage medicines, inventory, and stock levels</p>
        </div>
        {currentUser.role === 'admin' && (
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center gap-2"
          >
            <Pill size={20} />
            Add Medicine
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search medicines by name, category, or manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Medicines List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                {currentUser.role === 'admin' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMedicines.map(medicine => {
                const stockStatus = getStockStatus(medicine.quantity);
                return (
                  <tr key={medicine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{medicine.name}</div>
                        <div className="text-sm text-gray-500">{medicine.manufacturer}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {medicine.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${medicine.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {medicine.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}>
                        {stockStatus.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(medicine.expiry).toLocaleDateString()}
                    </td>
                    {currentUser.role === 'admin' && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingMedicine(medicine)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteMedicine(medicine.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredMedicines.length === 0 && (
          <div className="text-center py-8">
            <Pill size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No medicines found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Medicine Modal */}
      {(showAddForm || editingMedicine) && (
        <MedicineForm
          medicine={editingMedicine}
          onSave={editingMedicine ? handleEditMedicine : handleAddMedicine}
          onCancel={() => {
            setShowAddForm(false);
            setEditingMedicine(null);
          }}
        />
      )}
    </div>
  );
};

// Medicine Form Component
const MedicineForm = ({ medicine, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: medicine?.name || '',
    category: medicine?.category || '',
    price: medicine?.price || '',
    quantity: medicine?.quantity || '',
    expiry: medicine?.expiry || '',
    description: medicine?.description || '',
    manufacturer: medicine?.manufacturer || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {medicine ? 'Edit Medicine' : 'Add New Medicine'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Paracetamol 500mg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="Pain Relief">Pain Relief</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="date"
                required
                value={formData.expiry}
                onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
              <input
                type="text"
                required
                value={formData.manufacturer}
                onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., ABC Pharma"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                rows="3"
                placeholder="Medicine description..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                {medicine ? 'Update Medicine' : 'Add Medicine'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const HospitalManagementSystem = () => {
  const [data, setData] = useState(initialData);
  const [currentUser, setCurrentUser] = useState(null);
  const [authView, setAuthView] = useState('login');

  const handleLogin = (username, password, setError) => {
    const user = data.users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleSignup = (formData, setError, setSuccess) => {
    const newUserId = Math.max(...data.users.map(u => u.id)) + 1;
    const newUser = {
      id: newUserId,
      username: formData.username,
      password: formData.password,
      role: formData.role,
      name: formData.name,
      email: formData.email,
      ...(formData.role === 'doctor' && {
        specialization: formData.specialization,
        schedule: formData.schedule
      }),
      ...(formData.role === 'patient' && {
        age: formData.age,
        gender: formData.gender,
        contact: formData.contact
      })
    };

    const updatedData = { ...data };
    updatedData.users = [...data.users, newUser];

    if (formData.role === 'doctor') {
      const newDoctorId = Math.max(...data.doctors.map(d => d.id), 0) + 1;
      updatedData.doctors = [...data.doctors, {
        id: newDoctorId,
        name: formData.name,
        specialization: formData.specialization,
        schedule: formData.schedule,
        available: true,
        userId: newUserId
      }];
    } else if (formData.role === 'patient') {
      const newPatientId = Math.max(...data.patients.map(p => p.id), 0) + 1;
      updatedData.patients = [...data.patients, {
        id: newPatientId,
        name: formData.name,
        age: formData.age,
        gender: formData.gender,
        contact: formData.contact,
        medicalHistory: '',
        userId: newUserId
      }];
    }

    setData(updatedData);
    setSuccess('Account created successfully! Redirecting to login...');
    setTimeout(() => setAuthView('login'), 2000);
  };

  const handleResetPassword = (username, newPassword, setSuccess, setError) => {
    const updatedUsers = data.users.map(u => 
      u.username === username ? { ...u, password: newPassword } : u
    );
    setData({ ...data, users: updatedUsers });
    setSuccess('Password reset successfully! Redirecting to login...');
    setTimeout(() => setAuthView('login'), 2000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!currentUser) {
    if (authView === 'signup') {
      return (
        <SignUp
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthView('login')}
          data={data}
        />
      );
    } else if (authView === 'forgot') {
      return (
        <ForgotPassword
          onResetPassword={handleResetPassword}
          onSwitchToLogin={() => setAuthView('login')}
          data={data}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setAuthView('signup')}
        onSwitchToForgot={() => setAuthView('forgot')}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, data, setData, handleLogout }}>
      <Dashboard />
    </AuthContext.Provider>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { currentUser, handleLogout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getMenuItems = () => {
    const common = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 }
    ];

    if (currentUser.role === 'admin') {
      return [
        ...common,
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'doctors', label: 'Doctors', icon: UserCheck },
        { id: 'appointments', label: 'Appointments', icon: Calendar },
        { id: 'lab-reports', label: 'Lab Reports', icon: FileText },
        { id: 'pharmacy', label: 'Pharmacy', icon: Pill },
        { id: 'billing', label: 'Billing', icon: DollarSign }
      ];
    } else if (currentUser.role === 'doctor') {
      return [
        ...common,
        { id: 'patients', label: 'Patients', icon: Users },
        { id: 'appointments', label: 'My Appointments', icon: Calendar },
        { id: 'lab-reports', label: 'Lab Reports', icon: FileText }
      ];
    } else {
      return [
        ...common,
        { id: 'appointments', label: 'My Appointments', icon: Calendar },
        { id: 'billing', label: 'My Bills', icon: DollarSign }
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mr-4 lg:hidden"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-indigo-600">HMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className={`lg:w-64 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <nav className="bg-white rounded-lg shadow-sm p-4 space-y-2">
              {menuItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      activeTab === item.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {activeTab === 'dashboard' && <DashboardContent />}
              {activeTab === 'patients' && <PatientsContent />}
              {activeTab === 'doctors' && <DoctorsContent />}
              {activeTab === 'appointments' && <AppointmentsContent />}
              {activeTab === 'lab-reports' && <LabReportsContent />}
              {activeTab === 'pharmacy' && <PharmacyContent />}
              {activeTab === 'billing' && <BillingContent />}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Proudly Designed and Developed by{' '}
            <a
              href="https://rameshgamage.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
            >
              Ramesh Gamage
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

// Dashboard Content
const DashboardContent = () => {
  const { currentUser, data } = useAuth();

  const stats = [
    { label: 'Total Patients', value: data.patients.length, icon: Users, color: 'blue' },
    { label: 'Total Doctors', value: data.doctors.length, icon: UserCheck, color: 'green' },
    { label: 'Appointments', value: data.appointments.length, icon: Calendar, color: 'purple' },
    { label: 'Revenue', value: `$${data.bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0)}`, icon: DollarSign, color: 'yellow' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome back, {currentUser.name}!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-indigo-900 mb-2">System Ready</h3>
        <p className="text-indigo-700">Navigate through the menu to manage patients, doctors, appointments, and billing.</p>
      </div>
    </div>
  );
};

// Placeholder components
const PatientsContent = () => {
  const { currentUser, data, setData } = useAuth();
  const [view, setView] = useState('list');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    medicalHistory: ''
  });

  // Filter patients based on role
  const getPatientsList = () => {
    if (currentUser.role === 'patient') {
      return data.patients.filter(p => p.userId === currentUser.id);
    }
    return data.patients;
  };

  const filteredPatients = getPatientsList().filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.includes(searchTerm)
  );

  const handleAddPatient = () => {
    if (!formData.name || !formData.age || !formData.gender || !formData.contact) {
      alert('Please fill all required fields');
      return;
    }

    const newPatient = {
      id: Math.max(...data.patients.map(p => p.id), 0) + 1,
      ...formData,
      age: parseInt(formData.age),
      userId: null
    };

    setData({
      ...data,
      patients: [...data.patients, newPatient]
    });

    setShowAddModal(false);
    setFormData({ name: '', age: '', gender: '', contact: '', medicalHistory: '' });
  };

  const handleUpdatePatient = () => {
    if (!formData.name || !formData.age || !formData.gender || !formData.contact) {
      alert('Please fill all required fields');
      return;
    }

    const updatedPatients = data.patients.map(p =>
      p.id === selectedPatient.id ? { ...p, ...formData, age: parseInt(formData.age) } : p
    );

    setData({ ...data, patients: updatedPatients });
    setView('list');
    setSelectedPatient(null);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setData({
        ...data,
        patients: data.patients.filter(p => p.id !== patientId)
      });
    }
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setView('detail');
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      gender: patient.gender,
      contact: patient.contact,
      medicalHistory: patient.medicalHistory || ''
    });
    setView('edit');
  };

  // List View
  if (view === 'list') {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser.role === 'patient' ? 'My Profile' : 'Patient Management'}
          </h2>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => {
                setShowAddModal(true);
                setFormData({ name: '', age: '', gender: '', contact: '', medicalHistory: '' });
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <Users size={20} />
              Add Patient
            </button>
          )}
        </div>

        {currentUser.role !== 'patient' && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                      No patients found
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map(patient => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{patient.name}</td>
                      <td className="px-6 py-4 text-gray-600">{patient.age}</td>
                      <td className="px-6 py-4 text-gray-600">{patient.gender}</td>
                      <td className="px-6 py-4 text-gray-600">{patient.contact}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewPatient(patient)}
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                          >
                            View
                          </button>
                          {(currentUser.role === 'admin' || currentUser.role === 'patient') && (
                            <button
                              onClick={() => handleEditPatient(patient)}
                              className="text-green-600 hover:text-green-800 font-medium text-sm"
                            >
                              Edit
                            </button>
                          )}
                          {currentUser.role === 'admin' && (
                            <button
                              onClick={() => handleDeletePatient(patient.id)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add New Patient</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact *</label>
                  <input
                    type="tel"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                  <textarea
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddPatient}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add Patient
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Detail View
  if (view === 'detail') {
    return (
      <div>
        <button
          onClick={() => setView('list')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
        >
          ← Back to List
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Patient Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              <p className="text-lg font-semibold text-gray-900">{selectedPatient.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Age</label>
              <p className="text-lg font-semibold text-gray-900">{selectedPatient.age} years</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
              <p className="text-lg font-semibold text-gray-900">{selectedPatient.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Contact</label>
              <p className="text-lg font-semibold text-gray-900">{selectedPatient.contact}</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-500 mb-1">Medical History</label>
              <p className="text-lg text-gray-900">{selectedPatient.medicalHistory || 'No medical history recorded'}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {(currentUser.role === 'admin' || currentUser.role === 'patient') && (
              <button
                onClick={() => handleEditPatient(selectedPatient)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Edit Patient
              </button>
            )}
            <button
              onClick={() => setView('list')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Edit View
  if (view === 'edit') {
    return (
      <div>
        <button
          onClick={() => setView('list')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
        >
          ← Back to List
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Patient</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact *</label>
              <input
                type="tel"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
              <textarea
                value={formData.medicalHistory}
                onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows="4"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleUpdatePatient}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setView('list')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
};
const DoctorsContent = () => {
  const { currentUser, data, setData } = useAuth();
  const [view, setView] = useState('list');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    schedule: '',
    available: true
  });

  const filteredDoctors = data.doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = () => {
    if (!formData.name || !formData.specialization) {
      alert('Please fill all required fields');
      return;
    }

    const newDoctor = {
      id: Math.max(...data.doctors.map(d => d.id), 0) + 1,
      ...formData,
      userId: null
    };

    setData({
      ...data,
      doctors: [...data.doctors, newDoctor]
    });

    setShowAddModal(false);
    setFormData({ name: '', specialization: '', schedule: '', available: true });
  };

  const handleUpdateDoctor = () => {
    if (!formData.name || !formData.specialization) {
      alert('Please fill all required fields');
      return;
    }

    const updatedDoctors = data.doctors.map(d =>
      d.id === selectedDoctor.id ? { ...d, ...formData } : d
    );

    setData({ ...data, doctors: updatedDoctors });
    setView('list');
    setSelectedDoctor(null);
  };

  const handleDeleteDoctor = (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setData({
        ...data,
        doctors: data.doctors.filter(d => d.id !== doctorId)
      });
    }
  };

  const handleToggleAvailability = (doctorId) => {
    const updatedDoctors = data.doctors.map(d =>
      d.id === doctorId ? { ...d, available: !d.available } : d
    );
    setData({ ...data, doctors: updatedDoctors });
  };

  const handleViewDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setView('detail');
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      schedule: doctor.schedule,
      available: doctor.available
    });
    setView('edit');
  };

  // List View
  if (view === 'list') {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Doctor Management</h2>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => {
                setShowAddModal(true);
                setFormData({ name: '', specialization: '', schedule: '', available: true });
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <UserCheck size={20} />
              Add Doctor
            </button>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No doctors found
            </div>
          ) : (
            filteredDoctors.map(doctor => (
              <div key={doctor.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <UserCheck className="text-indigo-600" size={24} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    doctor.available 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-2">{doctor.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{doctor.specialization}</p>
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">Schedule:</span> {doctor.schedule || 'Not set'}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDoctor(doctor)}
                    className="flex-1 bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition text-sm font-medium"
                  >
                    View
                  </button>
                  {currentUser.role === 'admin' && (
                    <>
                      <button
                        onClick={() => handleEditDoctor(doctor)}
                        className="flex-1 bg-green-50 text-green-600 py-2 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleAvailability(doctor.id)}
                        className={`flex-1 py-2 rounded-lg transition text-sm font-medium ${
                          doctor.available
                            ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                      >
                        {doctor.available ? 'Mark Busy' : 'Mark Free'}
                      </button>
                    </>
                  )}
                </div>

                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => handleDeleteDoctor(doctor.id)}
                    className="w-full mt-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Add Doctor Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Add New Doctor</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Cardiology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                  <input
                    type="text"
                    value={formData.schedule}
                    onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Mon-Fri, 9AM-5PM"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="available" className="ml-2 text-sm text-gray-700">
                    Available for appointments
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddDoctor}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add Doctor
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Detail View
  if (view === 'detail') {
    return (
      <div>
        <button
          onClick={() => setView('list')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
        >
          ← Back to List
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center">
                <UserCheck className="text-indigo-600" size={40} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                <p className="text-indigo-600 font-semibold text-lg">{selectedDoctor.specialization}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              selectedDoctor.available 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {selectedDoctor.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Specialization</label>
              <p className="text-lg font-semibold text-gray-900">{selectedDoctor.specialization}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Schedule</label>
              <p className="text-lg font-semibold text-gray-900">{selectedDoctor.schedule || 'Not set'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
              <p className="text-lg font-semibold text-gray-900">
                {selectedDoctor.available ? 'Available for appointments' : 'Currently unavailable'}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {currentUser.role === 'admin' && (
              <>
                <button
                  onClick={() => handleEditDoctor(selectedDoctor)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Edit Doctor
                </button>
                <button
                  onClick={() => handleToggleAvailability(selectedDoctor.id)}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    selectedDoctor.available
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {selectedDoctor.available ? 'Mark as Unavailable' : 'Mark as Available'}
                </button>
              </>
            )}
            <button
              onClick={() => setView('list')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Edit View
  if (view === 'edit') {
    return (
      <div>
        <button
          onClick={() => setView('list')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
        >
          ← Back to List
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Doctor</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization *</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
              <input
                type="text"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Mon-Fri, 9AM-5PM"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="edit-available"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="edit-available" className="ml-2 text-sm text-gray-700">
                Available for appointments
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleUpdateDoctor}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setView('list')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
};
const AppointmentsContent = () => {
  const { currentUser, data, setData } = useAuth();
  const [view, setView] = useState('list');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    status: 'scheduled'
  });

  // Get appointments based on user role
  const getAppointmentsList = () => {
    if (currentUser.role === 'patient') {
      const patient = data.patients.find(p => p.userId === currentUser.id);
      return data.appointments.filter(a => a.patientId === patient?.id);
    } else if (currentUser.role === 'doctor') {
      const doctor = data.doctors.find(d => d.userId === currentUser.id);
      return data.appointments.filter(a => a.doctorId === doctor?.id);
    }
    return data.appointments;
  };

  const filteredAppointments = getAppointmentsList().filter(apt => 
    filterStatus === 'all' || apt.status === filterStatus
  );

  const getPatientName = (patientId) => {
    const patient = data.patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const getDoctorName = (doctorId) => {
    const doctor = data.doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  const handleBookAppointment = () => {
    if (!formData.patientId || !formData.doctorId || !formData.date || !formData.time) {
      alert('Please fill all required fields');
      return;
    }

    const newAppointment = {
      id: Math.max(...data.appointments.map(a => a.id), 0) + 1,
      ...formData,
      patientId: parseInt(formData.patientId),
      doctorId: parseInt(formData.doctorId)
    };

    setData({
      ...data,
      appointments: [...data.appointments, newAppointment]
    });

    setShowBookModal(false);
    setFormData({ patientId: '', doctorId: '', date: '', time: '', reason: '', status: 'scheduled' });
  };

  const handleUpdateStatus = (appointmentId, newStatus) => {
    const updatedAppointments = data.appointments.map(a =>
      a.id === appointmentId ? { ...a, status: newStatus } : a
    );
    setData({ ...data, appointments: updatedAppointments });
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      patientId: appointment.patientId.toString(),
      doctorId: appointment.doctorId.toString(),
      date: appointment.date,
      time: appointment.time,
      reason: appointment.reason,
      status: appointment.status
    });
    setView('reschedule');
  };

  const handleSaveReschedule = () => {
    if (!formData.date || !formData.time) {
      alert('Please select date and time');
      return;
    }

    const updatedAppointments = data.appointments.map(a =>
      a.id === selectedAppointment.id ? { ...a, date: formData.date, time: formData.time } : a
    );

    setData({ ...data, appointments: updatedAppointments });
    setView('list');
    setSelectedAppointment(null);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      handleUpdateStatus(appointmentId, 'cancelled');
    }
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setData({
        ...data,
        appointments: data.appointments.filter(a => a.id !== appointmentId)
      });
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Get current patient for booking
  const currentPatient = currentUser.role === 'patient' 
    ? data.patients.find(p => p.userId === currentUser.id) 
    : null;

  // List View
  if (view === 'list') {
    return (
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser.role === 'patient' && 'My Appointments'}
            {currentUser.role === 'doctor' && 'My Schedule'}
            {currentUser.role === 'admin' && 'All Appointments'}
          </h2>
          {(currentUser.role === 'patient' || currentUser.role === 'admin') && (
            <button
              onClick={() => {
                setShowBookModal(true);
                setFormData({ 
                  patientId: currentPatient?.id.toString() || '', 
                  doctorId: '', 
                  date: '', 
                  time: '', 
                  reason: '', 
                  status: 'scheduled' 
                });
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <Calendar size={20} />
              Book Appointment
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['all', 'scheduled', 'completed', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No appointments found</p>
            </div>
          ) : (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">ID: #{appointment.id}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                      {currentUser.role !== 'patient' && (
                        <div>
                          <span className="text-sm text-gray-500">Patient:</span>
                          <p className="font-semibold text-gray-800">{getPatientName(appointment.patientId)}</p>
                        </div>
                      )}
                      {currentUser.role !== 'doctor' && (
                        <div>
                          <span className="text-sm text-gray-500">Doctor:</span>
                          <p className="font-semibold text-gray-800">{getDoctorName(appointment.doctorId)}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm text-gray-500">Date:</span>
                        <p className="font-semibold text-gray-800">{appointment.date}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Time:</span>
                        <p className="font-semibold text-gray-800">{appointment.time}</p>
                      </div>
                      {appointment.reason && (
                        <div className="md:col-span-2">
                          <span className="text-sm text-gray-500">Reason:</span>
                          <p className="text-gray-800">{appointment.reason}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {appointment.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => handleReschedule(appointment)}
                          className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg hover:bg-yellow-100 transition text-sm font-medium"
                        >
                          Reschedule
                        </button>
                        {(currentUser.role === 'patient' || currentUser.role === 'admin') && (
                          <button
                            onClick={() => handleCancelAppointment(appointment.id)}
                            className="bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                          >
                            Cancel
                          </button>
                        )}
                        {currentUser.role === 'doctor' && (
                          <button
                            onClick={() => handleUpdateStatus(appointment.id, 'completed')}
                            className="bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                          >
                            Complete
                          </button>
                        )}
                      </>
                    )}
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Book Appointment Modal */}
        {showBookModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold mb-4">Book Appointment</h3>
              <div className="space-y-4">
                {currentUser.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
                    <select
                      value={formData.patientId}
                      onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Patient</option>
                      {data.patients.map(patient => (
                        <option key={patient.id} value={patient.id}>{patient.name}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor *</label>
                  <select
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Doctor</option>
                    {data.doctors.filter(d => d.available).map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Brief description of the issue"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleBookAppointment}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Book Appointment
                </button>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Reschedule View
  if (view === 'reschedule') {
    return (
      <div>
        <button
          onClick={() => setView('list')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
        >
          ← Back to List
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Reschedule Appointment</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Current Appointment:</p>
              <p className="font-semibold">Doctor: {getDoctorName(selectedAppointment.doctorId)}</p>
              <p className="font-semibold">Date: {selectedAppointment.date} at {selectedAppointment.time}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Time *</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSaveReschedule}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
            <button
              onClick={() => setView('list')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
};
const BillingContent = () => {
  const { currentUser, data, setData } = useAuth();
  const [view, setView] = useState('list');
  const [selectedBill, setSelectedBill] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    patientId: '',
    description: '',
    amount: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0]
  });

  // Get bills based on user role
  const getBillsList = () => {
    if (currentUser.role === 'patient') {
      const patient = data.patients.find(p => p.userId === currentUser.id);
      return data.bills.filter(b => b.patientId === patient?.id);
    }
    return data.bills;
  };

  const filteredBills = getBillsList().filter(bill => 
    filterStatus === 'all' || bill.status === filterStatus
  );

  const getPatientName = (patientId) => {
    const patient = data.patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown';
  };

  const handleCreateBill = () => {
    if (!formData.patientId || !formData.description || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    const newBill = {
      id: Math.max(...data.bills.map(b => b.id), 0) + 1,
      ...formData,
      patientId: parseInt(formData.patientId),
      amount: parseFloat(formData.amount)
    };

    setData({
      ...data,
      bills: [...data.bills, newBill]
    });

    setShowCreateModal(false);
    setFormData({ patientId: '', description: '', amount: '', status: 'pending', date: new Date().toISOString().split('T')[0] });
  };

  const handleUpdatePaymentStatus = (billId, newStatus) => {
    const updatedBills = data.bills.map(b =>
      b.id === billId ? { ...b, status: newStatus } : b
    );
    setData({ ...data, bills: updatedBills });
  };

  const handleDeleteBill = (billId) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setData({
        ...data,
        bills: data.bills.filter(b => b.id !== billId)
      });
    }
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setView('detail');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Calculate statistics
  const totalRevenue = data.bills.filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0);
  const pendingAmount = data.bills.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.amount, 0);
  const overdueAmount = data.bills.filter(b => b.status === 'overdue').reduce((sum, b) => sum + b.amount, 0);

  // Get current patient for creating bill
  const currentPatient = currentUser.role === 'patient' 
    ? data.patients.find(p => p.userId === currentUser.id) 
    : null;

  // List View
  if (view === 'list') {
    return (
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser.role === 'patient' ? 'My Bills' : 'Billing & Payments'}
          </h2>
          {currentUser.role === 'admin' && (
            <button
              onClick={() => {
                setShowCreateModal(true);
                setFormData({ patientId: '', description: '', amount: '', status: 'pending', date: new Date().toISOString().split('T')[0] });
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
            >
              <DollarSign size={20} />
              Create Bill
            </button>
          )}
        </div>

        {/* Statistics Cards */}
        {currentUser.role === 'admin' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-green-700">Total Revenue</p>
                <DollarSign className="text-green-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-green-900">${totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-green-600 mt-1">{data.bills.filter(b => b.status === 'paid').length} paid bills</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-yellow-700">Pending Payments</p>
                <DollarSign className="text-yellow-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-yellow-900">${pendingAmount.toFixed(2)}</p>
              <p className="text-xs text-yellow-600 mt-1">{data.bills.filter(b => b.status === 'pending').length} pending bills</p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 border border-red-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-red-700">Overdue Amount</p>
                <DollarSign className="text-red-600" size={24} />
              </div>
              <p className="text-3xl font-bold text-red-900">${overdueAmount.toFixed(2)}</p>
              <p className="text-xs text-red-600 mt-1">{data.bills.filter(b => b.status === 'overdue').length} overdue bills</p>
            </div>
          </div>
        )}

        {/* Patient Summary */}
        {currentUser.role === 'patient' && (
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200 mb-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Payment Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-indigo-700">Total Bills</p>
                <p className="text-2xl font-bold text-indigo-900">{getBillsList().length}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-700">Paid</p>
                <p className="text-2xl font-bold text-green-700">
                  ${getBillsList().filter(b => b.status === 'paid').reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-indigo-700">Pending</p>
                <p className="text-2xl font-bold text-yellow-700">
                  ${getBillsList().filter(b => b.status === 'pending').reduce((sum, b) => sum + b.amount, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['all', 'pending', 'paid', 'overdue'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bills Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bill ID</th>
                  {currentUser.role !== 'patient' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBills.length === 0 ? (
                  <tr>
                    <td colSpan={currentUser.role === 'patient' ? '6' : '7'} className="px-6 py-8 text-center text-gray-500">
                      No bills found
                    </td>
                  </tr>
                ) : (
                  filteredBills.map(bill => (
                    <tr key={bill.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">#{bill.id}</td>
                      {currentUser.role !== 'patient' && (
                        <td className="px-6 py-4 text-gray-600">{getPatientName(bill.patientId)}</td>
                      )}
                      <td className="px-6 py-4 text-gray-600">{bill.description}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">${bill.amount.toFixed(2)}</td>
                      <td className="px-6 py-4 text-gray-600">{bill.date}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bill.status)}`}>
                          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewBill(bill)}
                            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                          >
                            View
                          </button>
                          {currentUser.role === 'admin' && bill.status === 'pending' && (
                            <button
                              onClick={() => handleUpdatePaymentStatus(bill.id, 'paid')}
                              className="text-green-600 hover:text-green-800 font-medium text-sm"
                            >
                              Mark Paid
                            </button>
                          )}
                          {currentUser.role === 'admin' && (
                            <button
                              onClick={() => handleDeleteBill(bill.id)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Bill Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Create New Bill</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient *</label>
                  <select
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Patient</option>
                    {data.patients.map(patient => (
                      <option key={patient.id} value={patient.id}>{patient.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows="3"
                    placeholder="Consultation, Treatment, Medicine, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateBill}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  Create Bill
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Detail View
  if (view === 'detail') {
    return (
      <div>
        <button
          onClick={() => setView('list')}
          className="mb-6 text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-2"
        >
          ← Back to List
        </button>

        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Bill #{selectedBill.id}</h2>
              <p className="text-gray-600">Date: {selectedBill.date}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(selectedBill.status)}`}>
              {selectedBill.status.charAt(0).toUpperCase() + selectedBill.status.slice(1)}
            </span>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Patient Name</label>
                <p className="text-lg font-semibold text-gray-900">{getPatientName(selectedBill.patientId)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Bill Date</label>
                <p className="text-lg font-semibold text-gray-900">{selectedBill.date}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-500 mb-1">Description</label>
                <p className="text-lg text-gray-900">{selectedBill.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-indigo-900">Total Amount</span>
              <span className="text-4xl font-bold text-indigo-600">${selectedBill.amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-3">
            {currentUser.role === 'admin' && selectedBill.status === 'pending' && (
              <button
                onClick={() => {
                  handleUpdatePaymentStatus(selectedBill.id, 'paid');
                  setView('list');
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Mark as Paid
              </button>
            )}
            {currentUser.role === 'patient' && selectedBill.status === 'pending' && (
              <button
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                onClick={() => alert('Payment gateway integration would go here')}
              >
                Pay Now
              </button>
            )}
            <button
              onClick={() => setView('list')}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default HospitalManagementSystem;
