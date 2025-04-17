# FOXTRAVEL - React Travel Journal Application

FOXTRAVEL is a React-based web application that showcases travel destinations around Lviv, Ukraine. The application fetches location data from the OpenTripMap API and displays it in an interactive and user-friendly interface.

## Features

- Interactive map-based travel destination exploration
- Detailed information cards for each destination
- Categorization of places by type
- Popup modals with extended information
- Links to external resources (Wikipedia, OpenStreetMap)
- Responsive design

## Preview

You can view a live demonstration of the application at [https://fox-travel.netlify.app/](https://fox-travel.netlify.app/)

## Technologies Used

- React.js
- React Router for navigation
- OpenTripMap API for location data
- CSS for styling
- Vite as the build tool

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Nikita3301/travel-journal-react.git
   cd travel-journal-react
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Build for production:
   ```
   npm run build
   ```

## Usage

The application has two main pages:
- **Home Page**: Displays a collection of destination cards. Each card shows basic information and provides a "Read More" button to see detailed information.
- **About Page**: Information about the application (currently under development).

## API Integration

This project uses the [OpenTripMap API](https://opentripmap.com) to fetch location data. The application makes two types of API calls:
1. Fetches locations within a specified bounding box around Lviv, Ukraine
2. Retrieves detailed information about a specific location using its XID

## Project Structure

```
travel-journal-react/
├── public/            # Static files
├── src/               # Source files
│   ├── components/    # React components
│   │   ├── Card.jsx   # Individual destination card
│   │   ├── CardView.jsx # Modal view for destination details
│   │   └── Navbar.jsx # Navigation bar component
│   ├── pages/         # Page components
│   │   ├── Home.jsx   # Home page with destination cards
│   │   └── About.jsx  # About page
│   ├── App.jsx        # Main application component
│   ├── AppRouter.jsx  # Routes configuration
│   ├── App.css        # Main CSS styles
│   ├── index.css      # Base CSS styles
│   └── main.jsx       # Application entry point
├── index.html         # HTML entry point
└── package.json       # Project dependencies and scripts
```

## Future Enhancements

- User authentication and personal travel lists
- Map view of all destinations
- Search and filter functionality
- User reviews and ratings

## License

This project is licensed under the MIT License - see the LICENSE file for details.
