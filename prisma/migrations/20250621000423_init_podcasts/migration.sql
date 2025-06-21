-- CreateTable
CREATE TABLE "Podcast" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "collectionName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "feedUrl" TEXT,
    "artworkUrl100" TEXT,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_collectionId_key" ON "Podcast"("collectionId");
