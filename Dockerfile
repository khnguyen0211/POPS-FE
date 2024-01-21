# Sử dụng một hình ảnh Node.js làm cơ sở
FROM node:18

# Tạo thư mục ứng dụng trong container
WORKDIR /app, /public

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies của ứng dụng
RUN npm install

# Sao chép tất cả các tệp trong thư mục hiện tại vào container
COPY . .

# Port mà ứng dụng Express.js chạy trên
EXPOSE 3000

# Khởi động ứng dụng khi container được chạy
CMD npm start
