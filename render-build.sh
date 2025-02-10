
echo "Installing dependencies..."
npm install

echo "Generating Prisma Client..."
npx prisma generate

echo "Applying database migrations..."
npx prisma migrate deploy

echo "Starting application..."
npm run dev
