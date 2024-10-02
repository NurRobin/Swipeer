# pocketbase/Dockerfile

# Use the official PocketBase image
FROM pocketbase/pocketbase:latest

# Set the working directory
WORKDIR /pb

# Expose PocketBase default port
EXPOSE 8090

# Copy initialization files if you have any (optional)
# COPY . .

# Start PocketBase server
CMD ["serve", "--http=0.0.0.0:8090"]

