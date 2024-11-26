# Step 1: Use a lightweight Node.js base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy application files to the container
COPY . .

# Step 4: Install dependencies
RUN npm install

# Step 5: Expose the port the app runs on
EXPOSE 3000

# Step 6: Define the command to run the server
CMD ["node", "server.js"]
