-- CreateEnum
CREATE TYPE "Type" AS ENUM ('buy', 'rent');

-- CreateEnum
CREATE TYPE "Property" AS ENUM ('apartment', 'house', 'condo', 'land');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "images" TEXT[],
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "bedroom" INTEGER NOT NULL,
    "bathroom" INTEGER NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "property" "Property" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostDetail" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "utilities" TEXT,
    "pet" TEXT,
    "income" TEXT,
    "size" INTEGER,
    "school" INTEGER,
    "bus" INTEGER,
    "restaurant" INTEGER,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPost" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostDetail_postId_key" ON "PostDetail"("postId");

-- CreateIndex
CREATE INDEX "UserPost_userId_postId_idx" ON "UserPost"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostDetail" ADD CONSTRAINT "PostDetail_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
