# 🏥 Hospital Management System

A comprehensive, modern hospital management system built with React, featuring role-based access control, patient management, appointment scheduling, lab reports, pharmacy management, and billing system.

![Hospital Management System](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-blue) ![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Latest-green)

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role Login System**: Admin, Doctor, and Patient roles
- **Secure Authentication**: Username/password based login
- **Role-based Access Control**: Different features and permissions for each role
- **Password Recovery**: Forgot password functionality
- **User Registration**: New user signup with role selection

### 👥 Patient Management
- **Patient Registration**: Complete patient information management
- **Patient Profiles**: Detailed patient records with medical history
- **Search & Filter**: Find patients quickly with advanced search
- **Medical History**: Track patient medical records and history
- **Contact Information**: Complete contact details management

### 👨‍⚕️ Doctor Management
- **Doctor Profiles**: Comprehensive doctor information
- **Specialization Tracking**: Medical specialties and expertise areas
- **Schedule Management**: Doctor availability and scheduling
- **Availability Status**: Real-time doctor availability tracking

### 📅 Appointment System
- **Appointment Booking**: Schedule appointments with doctors
- **Calendar Integration**: Visual appointment calendar
- **Status Tracking**: Pending, Confirmed, Completed, Cancelled
- **Time Slot Management**: Available time slot selection
- **Patient-Doctor Matching**: Link patients with appropriate doctors

### 🧪 Lab Reports Management
- **Test Results**: Comprehensive lab test result management
- **Test Types**: Blood Test, Urine Test, Imaging, Cardiology, Other
- **Status Tracking**: Pending, Completed, Cancelled status
- **Priority Levels**: Normal, Medium, High priority classification
- **Abnormal Results**: Flag and highlight abnormal test results
- **Normal Ranges**: Track normal ranges for test parameters
- **Doctor Notes**: Medical observations and recommendations
- **Lab Technician Tracking**: Record who performed the tests

### 💊 Pharmacy Management
- **Medicine Inventory**: Complete medicine stock management
- **Stock Status**: In Stock, Low Stock, Out of Stock indicators
- **Category Management**: Organize medicines by categories
- **Price Tracking**: Medicine pricing and cost management
- **Expiry Date Monitoring**: Track medicine expiration dates
- **Manufacturer Information**: Medicine manufacturer details
- **Search & Filter**: Find medicines quickly by name, category, or manufacturer

### 💰 Billing System
- **Bill Generation**: Create and manage patient bills
- **Payment Tracking**: Track payment status and history
- **Service Charges**: Manage different service charges
- **Invoice Management**: Professional invoice generation
- **Payment History**: Complete payment transaction history

### 📊 Dashboard & Analytics
- **Overview Dashboard**: System-wide statistics and insights
- **Role-specific Views**: Customized dashboard for each user role
- **Quick Actions**: Fast access to common tasks
- **Statistics Cards**: Key metrics and KPIs

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hospital-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 👤 User Roles & Access

### 🔑 Admin
- Full system access
- Patient management (CRUD)
- Doctor management (CRUD)
- Appointment management
- Lab reports management
- Pharmacy management
- Billing system access
- User management

### 👨‍⚕️ Doctor
- View assigned patients
- Manage own appointments
- View and add lab reports
- Edit pending lab reports
- View patient medical history

### 🏥 Patient
- View own appointments
- View own bills
- View own lab reports
- Update personal information

## 🛠️ Technology Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.0
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Color-coded Status**: Visual indicators for different states
- **Interactive Elements**: Hover effects and smooth transitions
- **Modal Forms**: Overlay forms for better user experience
- **Search & Filter**: Advanced filtering capabilities
- **Empty States**: Helpful messages when no data is available
- **Loading States**: Smooth loading indicators

## 🔧 Key Components

### Authentication
- Login form with validation
- Signup form with role selection
- Password recovery system
- Session management

### Patient Management
- Patient list with search/filter
- Patient registration form
- Patient profile viewer
- Medical history tracking

### Appointment System
- Appointment calendar
- Booking form
- Status management
- Time slot selection

### Lab Reports
- Test result management
- Dynamic parameter addition
- Normal range tracking
- Abnormal result flagging
- Comprehensive report viewer

### Pharmacy
- Medicine inventory management
- Stock level monitoring
- Category organization
- Expiry date tracking
- Search and filter functionality

## 📊 Sample Data

The application comes with pre-loaded sample data including:
- Sample patients with medical history
- Doctor profiles with specializations
- Sample appointments
- Lab reports with test results
- Medicine inventory with various categories
- Sample bills and transactions

## 🔒 Security Features

- Role-based access control
- Input validation
- Secure form handling
- Protected routes
- Data validation

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `build` folder can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support, email support@hospitalmanagement.com or create an issue in the repository.

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Email/SMS integration
- [ ] Advanced reporting and analytics
- [ ] Mobile app development
- [ ] Integration with external medical devices
- [ ] Advanced user management
- [ ] Audit logging
- [ ] Backup and recovery system

---

**Built with ❤️ for healthcare professionals**
