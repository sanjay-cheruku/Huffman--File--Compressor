'use client';

import { useState } from 'react';
import { HuffmanCoder } from '@/lib/huffman';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('Operation info will be shown here !!');
  const [treeStructure, setTreeStructure] = useState<string>('Tree Structure Will Be Displayed Here !!');

  const downloadFile = (fileName: string, data: string) => {
    const a = document.createElement('a');
    const url = URL.createObjectURL(new Blob([data], { type: 'text/plain' }));
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleEncode = async () => {
    if (!file) return;
    setStatus('Encoding...');
    
    const reader = new FileReader();
    reader.onload = async function (e) {
      if(!e.target) return;
      let text = e.target.result as string;
      if (text.length === 0) {
        setStatus("Text can not be empty ! Upload another file !");
        return;
      }
      
      const coder = new HuffmanCoder();
      let [encoded, tree_structure, info] = coder.encode(text);
      
      downloadFile(file.name.split('.')[0] + '_encoded.txt', encoded);
      setTreeStructure(tree_structure);
      setStatus(info);

      const originalSize = text.length;
      const compressedSize = encoded.length;

      try {
        await fetch('/api/history', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileName: file.name, originalSize, compressedSize })
        });
      } catch (err) {
        console.error("Failed to save history", err);
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  const handleDecode = () => {
    if (!file) return;
    setStatus('Decoding...');

    const reader = new FileReader();
    reader.onload = function (e) {
      if(!e.target) return;
      let text = e.target.result as string;
      if (text.length === 0) {
        setStatus("Text can not be empty ! Upload another file !");
        return;
      }
      
      const coder = new HuffmanCoder();
      let [decoded, tree_structure, info] = coder.decode(text);
      
      downloadFile(file.name.split('.')[0] + '_decoded.txt', decoded);
      setTreeStructure(tree_structure);
      setStatus(info);
    };
    reader.readAsText(file, "UTF-8");
  }

  return (
    <>
      <div id="container">
          <div className="text_box" style={{ overflowY: 'scroll' }}>
              <span id="treearea" style={{ width: '100%', textAlign: 'left', fontSize: 'medium', whiteSpace: 'pre-wrap' }}>
                  {treeStructure}
              </span>
          </div>
          <div className="text_box" style={{ overflowY: 'scroll' }}>
              <span id="temptext" style={{ width: '100%', textAlign: 'center', fontSize: 'x-large', whiteSpace: 'pre-wrap' }}>
                  {status}
              </span>
          </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <form method="post" encType="multipart/form-data" style={{ display: 'inline-block' }}>
              <input type="file" id="uploadedFile" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </form>
          <br /><br />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button type="button" className="btn btn-success" id="encode" onClick={handleEncode}>&nbsp;&nbsp;Encode&nbsp;&nbsp;</button>
              <button type="button" className="btn btn-danger" id="decode" onClick={handleDecode}>&nbsp;&nbsp;Decode&nbsp;&nbsp;</button>
          </div>
      </div>
    </>
  );
}
