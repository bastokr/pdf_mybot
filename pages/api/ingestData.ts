import type { NextApiRequest, NextApiResponse } from 'next';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

/* Name of directory to retrieve your files from 
   Make sure to add your PDF files inside the 'docs' folder
*/
const filePath = 'docs';
const deleteAllVectorsOfIndex = async () => {

  const index = pinecone.Index( PINECONE_INDEX_NAME);
  const deleteResponse = await index.delete1({
      deleteAll: true,
      namespace: PINECONE_NAME_SPACE
  })
  console.log("deleteResponse: ", deleteResponse);

}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
    

  try {
    await deleteAllVectorsOfIndex();
  
  
    /*
      await pinecone.deleteIndexRaw({
        indexName: "pdf-test",
      });
      

      await pinecone.deleteIndex({
        indexName: "pdf-test",
      });

*/
    
    /*load raw docs from the all files in the directory */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new PDFLoader(path),
    });

    // const loader = new PDFLoader(filePath);
    const rawDocs = await directoryLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });

    let status = 'Ok';

    res.status(200).json({
      data: {
        status,
      },
      error: null,
    });
    status = 'not Ok';
    res.status(500).json({
      data: {
        status,
      },
      error: null,
    });


  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};
 