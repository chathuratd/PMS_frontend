# Pharmacy Management System Frontend

This is the frontend of a Pharmacy Management System built with the MERN stack. It is dockerized and deployed using GitHub Actions.

## Docker Image

You can pull the Docker image for this frontend using the following command:

```sh
docker pull chathuratd007/pms_front:latest
```

## Running with Docker

To run the Docker container, use the following command:

```sh
docker run -d -p 3000:80 --name pms_front chathuratd007/pms_front:latest
```

## Routes

The frontend interacts with the backend through various routes. Ensure the backend is running and accessible.

## Deployment

The frontend is currently hosted at: [http://54.172.39.22:3000/](http://54.172.39.22:3000/)

## Getting Started

To run the frontend locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/chathuratd/PMS_frontend.git
    cd PMS_frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file with the necessary environment variables (if applicable):
    ```makefile
    REACT_APP_API_PROXY=<backend-url>
    ```

4. Start the server:
    ```sh
    npm start
    ```

The server will start on [http://localhost:3000](http://localhost:3000).

## GitHub Actions

The workflow file for continuous integration and deployment can be found in the GitHub Actions tab of the repository.
