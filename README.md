# BidNest - Auction Platform

![BidNest Screenshot](https://github.com/user-attachments/assets/d93b2434-002c-4534-aa4d-e786d1208586)

**BidNest** is a fictional auction platform where users can create listings, place bids, and earn credits by selling their items. New users are rewarded with 1000 credits upon registration, offering an exciting and interactive experience for auction enthusiasts.

## Description

**BidNest** was created to apply the skills learned over the past three semesters, focusing on front-end development using **HTML**, **CSS**, **JavaScript**, **Bootstrap**, and **SASS**. The project integrates with the **Noroff API** to interact with auction listings and bids.

### Goal

To develop an auction site where users can create listings, bid on items, and browse auctions. Non-registered users can view listings, while registered users can fully interact with the platform.

### Key Features

- **Browse Listings**: Unregistered users can search and view all available listings.
- **User Registration & Login**: Only users with a `@noroff.no` or `@stud.noroff.no` email can register and log in, ensuring a student-based platform.
- **Listings Management**: Registered users can create, view, edit, and delete their auction listings.
- **Bidding System**: Registered users can place bids on other users' listings and view bid histories.
- **User Profiles**: Displays user information, credits, listings, wins, and bidding history.
- **Credits**: Users earn credits by selling items and can use credits to bid on other auctions.

### API Integration

The project connects to the **Noroff API**, specifically the **Auction Endpoints**, enabling:

- **Authorization**: Users can login and logout.
- **Create Listings**: Users can add items for auction.
- **Place Bids**: Registered users can bid on listed items.
- **Retrieve Data**: The platform fetches user profile details, auction listings data, and bid data.

## Built With

- [HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Bootstrap](https://getbootstrap.com/) (v5.2.3)
- [SASS](https://sass-lang.com/)
- [Netlify](https://www.netlify.com/) (for deployment)

## Getting Started

### Installing

1. Clone the repository:

   ```
   git clone https://github.com/LauraKaraliene/Semester-Project-2.git
   ```

2. Navigate to the project directory:

   ```
   cd Semester-Project-2
   ```

3. Open the project in the code editor of your choice.
   For Visual Studio Code, you might use:

   ```
   code .
   ```

4. Install dependencies:

   ```
   npm install
   ```

5. Start the development server:

   ```
   npm run watch
   ```

6. To build the project for production:

   ```
   npm run build
   ```

## Deployed Version

- Live Demo: [BidNest Auction Home](https://bidnest.netlify.app/)

## Resources

- API [Noroff API Documentation](https://docs.noroff.dev/docs/v2/about)
