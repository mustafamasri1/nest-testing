# Folder & Document Management API

## Overview
This project implements a folder and document management system with hierarchical organization using PostgreSQL's `ltree` extension. The API provides endpoints to manage folders, subfolders, documents, and access control.

## Features
- **Hierarchical Folder Structure:** Uses `ltree` for efficient folder and subfolder hierarchy management.
- **Document Storage:** Associates documents with folders and maintains structured paths.
- **User Access Control:** Implements role-based permissions for document access.
- **REST API Endpoints:** Provides endpoints to manage folders and documents.
- **Service Layer:** Fetches all documents within a folder and its subfolders efficiently.

## ER Diagram
```
• Folder (id, name, parent_id, path ltree)
• SubFolder (id, name, folder_id, path ltree)
• Document (id, name, file_path, folder_id, path ltree)
• User (id, name, email)
• AccessControl (id, user_id, document_id, permission_level)
```

## API Endpoints
### Folder Management
- `GET /folders/tree` – Retrieve the entire folder hierarchy
- `POST /folders` – Create a new folder (requires `CreateFolderDto`)

### Document Management
- `POST /documents` – Upload a document (requires `UploadDocumentDto`)

## Data Transfer Objects (DTOs)
### CreateFolderDto
```json
{
  "name": "Folder Name",
  "parent_id": 1
}
```

### UploadDocumentDto
```json
{
  "name": "Document Name",
  "file_path": "uploads/doc.pdf",
  "folder_id": 1
}
```

## Setup & Installation
### Prerequisites
- Node.js & npm
- PostgreSQL with `ltree` extension enabled
- NestJS framework

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure the database in `.env` file:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   ```
4. Run database migrations:
   ```sh
   npm run migrate
   ```
5. Start the application:
   ```sh
   npm run start
   ```
 6. Run Unit Tests:
   ```sh
   npm run test
   ```

## Technologies Used
- **NestJS** – Framework for building scalable APIs
- **PostgreSQL** – Database with `ltree` for hierarchical data
- **TypeORM** – ORM for database management
- **Express.js** – HTTP server framework

## Contributing
Feel free to open issues or submit pull requests for improvements and fixes.

## License
This project is licensed under the MIT License.

---

> **Note:** Ensure PostgreSQL's `ltree` extension is enabled using: `CREATE EXTENSION ltree;`

