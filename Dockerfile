# Use Alpine Linux for a small image
FROM alpine:3.19

# Create working directory
WORKDIR /pb

# Copy all files
COPY . .

# Expose PocketBase default port
EXPOSE 8090

# Start PocketBase
CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090", "--dir", "/pb/pb_data"]
