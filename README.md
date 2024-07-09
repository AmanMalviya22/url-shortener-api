# URL Shortener API

This project implements a powerful URL shortener API with advanced analytics capabilities using Node.js, Express, MongoDB, Redis, and Bull for background jobs.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Request and Response Formats](#request-and-response-formats)
- [Advanced Features](#advanced-features)
  - [Custom Short Codes](#custom-short-codes)
  - [URL Expiration](#url-expiration)
  - [Rate Limiting](#rate-limiting)
  - [Background Jobs](#background-jobs)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This API provides functionalities to shorten URLs, track visits with detailed analytics, and manage shortened links efficiently. It supports custom short codes, URL expiration, rate limiting, and background jobs for asynchronous tasks.

## Features

- **URL Shortening:** Shorten long URLs to compact forms.
- **Advanced Tracking:** Track visits with timestamp, user agent, IP address, and device type.
- **Analytics:** Retrieve detailed analytics including total visits, unique visitors, visits by device type, and more.
- **Custom Short Codes:** Allow users to specify custom short codes for URLs.
- **URL Expiration:** Implement URL expiration after a specified time.
- **Rate Limiting:** Prevent abuse with rate limits for URL shortening requests.
- **Background Jobs:** Use Bull for handling background tasks such as visit data aggregation.

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Redis

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AmanMalviya22/url-shortener-api.git
   cd url-shortener-api

2. **Install dependencies:**
   ```bash
   npm install


3. **Configuration:**
    ```bash
    Set up environment variables:
    Create a .env file and configure MongoDB and Redis connection details.
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/urlshortener
    REDIS_URL=redis://localhost:6379

4. **go to redis intallation directory and run redis-server.exe:**
5. **in vs code terminal type npm start, it will start your application.**
6. **Now open postman and test the application using below instruction.**

 
## Endpoints
    ```bash
    POST localhost:3000/api/shorten: Shorten a URL.
    GET localhost:3000/api/:shortCode: Redirect to the original URL and track visit.
    GET localhost:3000/api/analytics/:shortCode: Retrieve analytics for a shortened URL



## Request and Response Formats : Refer these postman screenshot
  

   1. For Generating Short URL
   ![alt text](image.png) 

   2. Testing the Short URL
   ![alt text](image-1.png)

   3. Analytics of Short URL
   ![alt text](image-2.png)



## Advanced Features
# Custom Short Codes
Users can specify custom short codes during URL shortening. The API checks for uniqueness and handles conflicts.

# URL Expiration
Shortened URLs can be set to expire after a configurable time. Expired URLs are no longer accessible.

# Rate Limiting
API endpoints are protected with rate limiting to prevent abuse. Limits are enforced based on user, IP address, and custom short code creation.

# Background Jobs
The API utilizes Bull for handling background jobs such as visit data aggregation for analytics reports.   