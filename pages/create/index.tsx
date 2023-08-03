import type { NextPage } from "next";
import axios, { AxiosRequestConfig } from "axios";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react"; 
import Layout from '@/components/layout';


   



const Home: NextPage = () => {
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
 
  async function handleSubmit(e: any) {
    e.preventDefault();
    alert('생성');
    const response = await fetch('/api/ingestData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
      });
      alert(response.status.toString()+response.body);
   // await initPinecone();
  };
 

  return (
 <Layout>
      <Head>
        <title>File uploader</title>
        <meta name="description" content="File uploader" />
      </Head> 
      <main className="py-10">
        <div className="w-full max-w-3xl px-3 mx-auto">
          <h1 className="mb-10 text-3xl font-bold text-gray-900">
            Upload your files
          </h1>

          
              <div className="flex mt-4 md:mt-0 md:flex-col justify-center gap-1.5">
                <button
            
                  onClick={handleSubmit}
                  className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
                >
                  Cancel file
                </button>
            
              </div>
        
        
 
        </div>
      </main>

      <footer>
        <div className="w-full max-w-3xl px-3 mx-auto">
          <p>All right reserved</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Home;




 