# 🗜️ Huffman File Compressor

<div align="center">

![Huffman Encoding Banner](https://img.shields.io/badge/Algorithm-Huffman%20Encoding-brightgreen?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIuNUwxNS4zIDdIMTNWMTJIMTVWMTdIMTJWMTJIOFYxN0g1VjEySDdWN0g0LjdMMTAgMi41WiIgZmlsbD0iI0ZGRkZGRiIvPgo8L3N2Zz4K) ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**A modernized, full-stack file compression tool implementing the Huffman Encoding algorithm with persistent analytics**

[🚀 Quick Start](#-quick-start) • [📖 How It Works](#-how-huffman-encoding-works) • [🎯 Features](#-key-features) • [🔧 Usage](#-usage-guide) • [📊 Analytics](#-analytics--persistence)

---

</div>

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [🏗️ Project Architecture](#-project-architecture)
- [🧠 How Huffman Encoding Works](#-how-huffman-encoding-works)
- [🚀 Quick Start](#-quick-start)
- [🎯 Key Features](#-key-features)
- [🔧 Usage Guide](#-usage-guide)
- [🗂️ File Structure](#-file-structure)
- [💻 Technical Implementation](#-technical-implementation)

## 🌟 Overview

This project is a **modernized, full-stack implementation** of the Huffman Encoding algorithm, one of the most fundamental and widely-used lossless data compression techniques. Built with the Next.js App Router, TypeScript, and Prisma ORM, this tool provides an intuitive, lightning-fast web interface for compressing files securely in the browser while persisting compression metadata (like ratios and sizes) to a PostgreSQL database.

### 🎯 What Makes This Special?

- **⚡ Blazing Fast**: Core algorithm runs entirely client-side. Massive files don't need to be uploaded to a server to be compressed.
- **🛡️ Type-Safe Backend**: Next.js API Routes and Prisma provide a fully typed backend for logging.
- **🎨 Premium UI**: Designed with Tailwind CSS for a modern, responsive user experience.
- **🌐 Easily Deployable**: Optimized for Vercel and serverless database providers like Neon.

## 🏗️ Project Architecture

```mermaid
graph TB
    A[Next.js App Router - UI] --> B[HuffmanCoder - Client-Side Engine]
    B --> C[File System - Browser Download]
    A --> D[API Routes - Serverless Backend]
    D --> E[Prisma Client]
    E --> F[(PostgreSQL Database)]
```

### 🔧 Core Components

| Component | Purpose | Key Technologies |
|-----------|---------|------------------|
| **🎨 Frontend** | User Interface & Interactions | Next.js, React, Tailwind CSS |
| **🧠 Algorithm Engine** | Huffman Encoding/Decoding | TypeScript |
| **🔗 API Layer** | Securely logging metadata | Next.js Route Handlers |
| **💾 Data Layer** | Persisting compression telemetry | Prisma ORM, PostgreSQL |

## 🧠 How Huffman Encoding Works

Huffman Encoding is a **greedy algorithm** that creates optimal prefix-free codes for data compression.

### 📈 Algorithm Steps

```
1. 📊 FREQUENCY ANALYSIS
   └── Count occurrence of each character
   
2. 🏗️ BUILD MIN-HEAP
   └── Create priority queue with frequencies
   
3. 🌳 CONSTRUCT HUFFMAN TREE
   ├── Extract two minimum nodes
   ├── Create new internal node
   ├── Add back to heap
   └── Repeat until one node remains
   
4. 🔤 GENERATE CODES
   ├── Left child → 0
   ├── Right child → 1
   └── Build character-to-code mapping
   
5. 🗜️ COMPRESS TEXT
   ├── Replace characters with codes
   ├── Convert to binary string
   └── Pack into bytes
```

## 🚀 Quick Start

### 🔧 Prerequisites

- Node.js v18+
- PostgreSQL Database URL (e.g., from Neon, Supabase, or Local)

### 🏃‍♂️ Running the Application

```bash
# 1. Clone the project and install dependencies
git clone <repository-url>
cd huffman-file-compressor
npm install

# 2. Configure Database
# Create a .env file in the root directory and add:
# DATABASE_URL="postgresql://user:password@host:port/dbname"

# 3. Push schema to database
npx prisma db push

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser!

## 🎯 Key Features

<table>
<tr>
<td width="50%">

### 🎨 **Modern Interface**
- ✅ Sleek Tailwind CSS design
- ✅ Real-time feedback
- ✅ Native file API integration
- ✅ Tree structure visualization

</td>
<td width="50%">

### ⚙️ **Core Functionality**
- ✅ Client-side Huffman construction
- ✅ Zero server-payload latency
- ✅ Automatic file downloads
- ✅ Strict TypeScript safety

</td>
</tr>
<tr>
<td width="50%">

### 📊 **Backend Telemetry**
- ✅ PostgreSQL integration
- ✅ Prisma ORM migrations
- ✅ Secure API endpoint
- ✅ Tracks compression ratios globally

</td>
<td width="50%">

### 🛡️ **Reliability**
- ✅ Vercel-ready architecture
- ✅ Error handling boundaries
- ✅ Edge case management
- ✅ Memory-efficient heap processing

</td>
</tr>
</table>

## 🔧 Usage Guide

### 📥 Encoding (Compression)

<div align="center">

```
📁 Select File → 🗜️ Click Encode → 💾 Metadata Saved to DB → 📥 Auto Download
```

</div>

**Step-by-step:**

1. **📂 File Selection**: Click "Choose File" and select any text file.
2. **🗜️ Compression Process**: Click the **Encode** button. The algorithm processes the file instantly in your browser.
3. **🌐 Backend Sync**: The compression ratio and size data are securely POSTed to your Next.js API and saved in PostgreSQL.
4. **📥 Download**: The compressed file automatically downloads as `filename_encoded.txt`.

## 🗂️ File Structure

```
📁 huffman-file-compressor/
├── 📄 package.json
├── 📄 tailwind.config.ts
├── 📁 prisma/
│   └── 📄 schema.prisma       # Database models
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📄 layout.tsx      # Global UI layout
│   │   ├── 📄 page.tsx        # Main compression interface
│   │   └── 📁 api/history/    # Next.js Route Handlers
│   └── 📁 lib/
│       ├── 📄 db.ts           # Prisma client singleton
│       ├── 📄 huffman.ts      # TypeScript Huffman algorithm
│       └── 📄 heap.ts         # Binary Heap implementation
└── ──────────────────────────
```

## 💻 Technical Implementation

### 🏗️ Prisma Schema

```prisma
model CompressionHistory {
  id           String   @id @default(uuid())
  fileName     String
  originalSize Int
  compressedSize Int
  ratio        Float
  createdAt    DateTime @default(now())
}
```

### 🧠 TypeScript Engine

By converting the original algorithm to TypeScript and moving it to `src/lib/`, we ensure type safety when integrating the Huffman tree traversal logic with the Next.js React components. This guarantees predictable rendering of the tree visualization UI without runtime crashes.
