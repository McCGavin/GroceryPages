# Grocery Store Management System UI

**Live Demo:** [http://35.184.41.71/](http://35.184.41.71/)

**API Repository:** [https://github.com/Jakemoeller03/GroceryStoreManager](https://github.com/Jakemoeller03/GroceryStoreManager)

This is a full-stack grocery store management system built with Spring Boot (backend) and React (frontend), deployed on a Google Cloud VM. It allows store staff to manage product listings, handle orders, and maintain inventory with a user-friendly interface.

## Features

- **Authenticated Login System** - Secure staff user authentication
- **Inventory Management** - Complete CRUD operations for products with image management
- **Order Processing** - View and execute customer orders with automatic stock updates
- **Advanced Filtering** - Sort and search inventory by availability, name, price, and more
- **Discount Management** - Handle sale items and discount codes
- **RESTful API** - Clean API design with comprehensive filtering capabilities
- **Cloud Deployment** - Production-ready deployment on Google Cloud Platform

## Tech Stack

- **Frontend:** React, HTML/CSS, Bootstrap
- **Backend:** Spring Boot, Java, Hibernate
- **Database:** PostgreSQL (Cloud SQL)
- **Hosting:** Google Cloud Platform (Compute Engine + Cloud SQL)
- **Testing:** Postman and curl for API endpoint validation

## Project Motivation

This project was inspired by internal tools used by grocery stores for daily operations. I wanted to simulate a real-world backend+frontend system with full deployment, cloud database setup, and practical admin functionality.

**Key Learning Outcomes:**
- Spring Boot API design and development
- Cloud VM and database setup on Google Cloud Platform
- State synchronization between frontend and backend
- Production deployment strategies
- RESTful API design patterns

## Getting Started

### Account Creation & Sign In

**Creating an Account:**
1. Visit the Sign In page
2. Click the "Create one here" button
3. Enter the following information:
   - A unique username
   - A password (minimum 6 characters, confirmed)
   - **Security Note:** Use a throwaway password - passwords are stored in plain text for demo purposes
4. Click "Create Account" to complete registration

**Signing In:**
1. Return to the Sign In page after account creation
2. Enter your credentials
3. Click "Sign In" to access the management dashboard

## Item Management

### Creating Items
1. Click "Create Item" from the main dashboard
2. Fill out the product form:
   - Name and description
   - Image ID and upload image from device
   - Price (in cents)
   - Quantity in stock
   - Optional discount code
   - Toggle "On Sale" status
3. Click "Create Item" to save or "Cancel" to discard

### Search & Filter
- Use the search bar to find items by name or description
- Sort by price or quantity using dropdown menus (ascending/descending)
- Reset filters by clearing the search bar and clicking Search, or click the Items link in the navbar

### Item Details & Management
- Click "View Details" on any item card to see complete information and stock levels
- From the details page, you can:
  - Edit item information by clicking "Edit Item"
  - Delete items permanently
  - Update product details and save changes
- Navigate back using the Items button in the navbar

## Order Management

### Viewing Orders
Navigate to the Orders tab to see all orders displayed with:
- Order ID and Customer ID
- Status (Pending or Executed)
- Order total and item count
- Timestamp when order was placed

### Order Search & Filtering
- **Search by:** Order ID, Customer ID, or specific items
- **Sort by:** Order time, Customer ID, or price (ascending/descending)
- Reset filters by clearing the search bar and clicking Search

### Order Processing
1. Click "View Details" on any order to see:
   - Complete order breakdown
   - Individual items with photos and prices
   - Total order value and timing
2. Execute orders by clicking "Execute Order"
   - Marks order as fulfilled
   - Automatically decrements item stock
   - Provides confirmation toast notification
   - Can be done from main Orders page or individual order view

## Security & Logout

Click the "Logout" button in the top right corner to securely return to the sign-in screen and end your session.

## API Documentation

The system provides RESTful API endpoints with comprehensive filtering capabilities. All endpoints have been thoroughly tested using Postman and curl for reliability and performance.

## Deployment

The application is deployed on Google Cloud Platform using:
- **Compute Engine** for application hosting
- **Cloud SQL** for PostgreSQL database management
- **Static frontend deployment** using serve

---

**Thanks for using the Grocery Store Management System!** 

For questions or support, please refer to the live demo at [http://35.184.41.71/](http://35.184.41.71/)
