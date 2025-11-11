FROM alpine:3.19

WORKDIR /app

# Download PocketBase binary
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.22.15/pocketbase_0.22.15_linux_amd64.zip pb.zip
RUN unzip pb.zip && rm pb.zip

# Copy PocketBase data and hooks (optional folders)
COPY ./pb_data ./pb_data
COPY ./pb_migrations ./pb_migrations
COPY ./pb_hooks ./pb_hooks

EXPOSE 10000

CMD ["./pocketbase", "serve", "--http=0.0.0.0:10000"]
