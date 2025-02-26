# Origin Savings App

Ứng dụng giúp người dùng lên kế hoạch tiết kiệm và quản lý mục tiêu tài chính cá nhân.

## Cài đặt

### Yêu cầu hệ thống
- Node.js (phiên bản 20.x trở lên)

### Các bước cài đặt

1. Clone repository về máy
```bash
git clone <repository-url>
cd origin-savings-app
```

2. Cài đặt các dependencies
```bash
npm install
# hoặc
yarn install
```

3. Khởi động môi trường development
```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại [http://localhost:3000](http://localhost:3000)


## Cấu trúc project

```
origin-savings-app/
├── public/              # Tài nguyên tĩnh
├── src/                 # Mã nguồn
│   ├── assets/          # Hình ảnh, fonts, và các tài nguyên khác
│   ├── components/      # React components tái sử dụng
│   ├── contexts/        # React contexts và providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Các trang giao diện người dùng
│   ├── services/        # Logic xử lý API và services
│   ├── utils/           # Tiện ích và helper functions
│   ├── App.js           # Component gốc của ứng dụng
│   └── index.js         # Điểm khởi đầu của ứng dụng
├── .gitignore           # Danh sách các file được git bỏ qua
├── package.json         # Khai báo dependencies và scripts
└── README.md            # File giới thiệu project
```

## Testing

### Chạy unit tests
```bash
npm run test
# hoặc
yarn test
```

### Kiểm tra độ phủ (coverage) của tests
```bash
npm run test:coverage
# hoặc
yarn test:coverage
```

## Build cho production

```bash
npm run build
# hoặc
yarn build
```

Các file static sẽ được tạo trong thư mục `build/`.