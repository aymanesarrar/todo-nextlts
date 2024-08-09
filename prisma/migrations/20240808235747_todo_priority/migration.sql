-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_todos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "Priority" TEXT NOT NULL DEFAULT 'No Priority',
    CONSTRAINT "todos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_todos" ("completed", "createdAt", "description", "id", "title", "updatedAt", "userId") SELECT "completed", "createdAt", "description", "id", "title", "updatedAt", "userId" FROM "todos";
DROP TABLE "todos";
ALTER TABLE "new_todos" RENAME TO "todos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
