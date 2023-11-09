# BloodSavers API

BloodSavers API is an Express.js application designed to manage blood donor information and profiles.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bloodsavers-api.git
   ```

2. **Install dependencies:**

   ```bash
   cd bloodsavers-api
   npm install
   ```

3. **Create a `.env` file in the project root and configure your environment variables:**

   ```env
   PORT=3000
   DATABASE_URL=your url
   SECRET_KEY=mysecretkey
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

The API server will be accessible at `http://localhost:3000`.

## Usage

BloodSavers API offers endpoints for user authentication, donor information retrieval, and file uploads.

## Endpoints

1. **Sign Up:**

   - **Endpoint:** `POST /blood-savers/signup`
   - **Description:** Register a new blood donor with profile information.

2. **Login:**

   - **Endpoint:** `POST /blood-savers/login`
   - **Description:** Authenticate and log in as a registered blood donor.

3. **Get Donors:**

   - **Endpoint:** `GET /blood-savers`
   - **Description:** Retrieve a list of all registered blood donors.

4. **Search Donors:**

   - **Endpoint:** `GET/blood-savers/search?name=los&bloodGroup=o-`
     query name and bloodGroup
   - **Description:** Search for blood donors based on specific criteria.

5. **Get Donor Detail:**

   - **Endpoint:** `GET /blood-savers/:donorId`
   - **it is protected router **
   - **Description:** Retrieve detailed information about a specific blood donor.

6. **File Upload (Sign Up):**
   - **Endpoint:** `POST /blood-savers/signup`
   - **Description:** Upload a profile image during the donor registration process.

## Middleware

### Authentication Verification

Protected routes use `authMiddleware` to ensure user authentication.

## Multer File Upload

Multer is utilized for handling file uploads, with uploaded files stored in the "profiles" folder.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
