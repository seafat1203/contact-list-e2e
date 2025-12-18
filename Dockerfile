FROM mcr.microsoft.com/playwright:v1.57.0-jammy

WORKDIR /app

# Copy dependencies first (for better cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy rest of the project
COPY . .

# Default command: run Playwright tests
CMD ["npx", "playwright", "test"]
