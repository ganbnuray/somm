![Somm Repo Banner](/public/banner.png)
# 🍷Somm🍷

> Since 1969, only 279 people have become Master Sommeliers, highlighting the difficulty of the exam. Our AI sommelier, powered by RAG (Retrieval-Augmented Generation), makes it easier by giving you wine recommendations based on your taste. Whether you’re a wine expert or just enjoy a glass now and then, we’ll help you find the perfect bottle.
## Inspiration

After watching Somm (2012), a documentary about master sommeliers and their examination process, I was inspired to create a RAG chatbot that could identify wines the user would like, just like a master sommelier. Finding a dataset that aligned with this exact inspiration was the starting point for my project.

## Installation

### Online

You can use the live site at [Somm](https://sommelierai.vercel.app/).

### Local

To run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ganbnuray/somm.git
   cd somm
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
3. **Open your browser**:
   Navigate to http://localhost:3000 to see the result.

## Tech Stack
- ![Pandas](https://img.shields.io/badge/pandas-%23150458.svg?style=flat&logo=pandas&logoColor=white): Sampling the Kaggle wine reviews data
- ![Python](https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54): Creating vector embeddings
- ![Pinecone](https://img.shields.io/badge/Pinecone-ffffff?style=flat&logo=pinecone&logoColor=black): Storing vector embeddings & similarity searches
- ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=flat&logo=mui&logoColor=white): UI components
- ![OpenAI](https://img.shields.io/badge/OpenAI-00A67E.svg?style=flat&logo=openai&logoColor=white): API calls & generating chat responses
- ![Next JS](https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white) and ![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB): Functionalities and routing
- ![Clerk](https://img.shields.io/badge/clerk-%23000000.svg?style=flat&logo=clerk&logoColor=purple): User login & signups
- ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white): Deployment

## Other resources
- ![](https://img.shields.io/badge/kaggle-%23150458.svg?style=flat&logo=kaggle&logoColor=white): Getting wine reviews and & sampling
  
  [Kaggle Wine Dataset](https://www.kaggle.com/datasets/zynicide/wine-reviews)
  
  [Kaggle Notebook for Sampling](https://www.kaggle.com/code/nurayganbarova/wine-sampling/notebook)

Note: Given the substantial volume of data, I utilized a random sampling approach to get 100 wines to manage and use it effectively for this project.

  
