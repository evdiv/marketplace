const env = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 3000;

if(env === 'development') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/youdo'
} else if(env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/youdoTest'
}

