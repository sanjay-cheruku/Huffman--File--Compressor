import { PriorityQueue } from './heap';

export type HuffmanNode = {
  freq: number;
  char: string | null;
  left?: HuffmanNode;
  right?: HuffmanNode;
};

export class HuffmanCoder {
  private encodingMap: Record<string, string>;
  private parseIndex: number;

  constructor() {
    this.encodingMap = {};
    this.parseIndex = 0;
  }

  private serializeTree(node: HuffmanNode): string {
    if (node.char !== null) {
      return "'" + node.char;
    }
    return '0' + this.serializeTree(node.left!) + '1' + this.serializeTree(node.right!);
  }

  private buildVisualTree(node: HuffmanNode, isDecoding: boolean, nodeId = 1): string {
    // If decoding, node structure might be slightly different if we parsed it manually,
    // but we can unify the type.
    if (node.char !== null) {
      return `${nodeId} = ${node.char}`;
    }

    const leftStr = this.buildVisualTree(node.left!, isDecoding, nodeId * 2);
    const rightStr = this.buildVisualTree(node.right!, isDecoding, nodeId * 2 + 1);
    const connection = `${nodeId * 2} <= ${nodeId} => ${nodeId * 2 + 1}`;
    
    return `${connection}\n${leftStr}\n${rightStr}`;
  }

  private deserializeTree(data: string): HuffmanNode {
    if (data[this.parseIndex] === "'") {
      this.parseIndex++;
      const char = data[this.parseIndex];
      this.parseIndex++;
      return { freq: 0, char };
    }

    this.parseIndex++;
    const left = this.deserializeTree(data);
    this.parseIndex++;
    const right = this.deserializeTree(data);

    return { freq: 0, char: null, left, right };
  }

  private generateCodes(node: HuffmanNode, currentPath: string) {
    if (node.char !== null) {
      this.encodingMap[node.char] = currentPath;
      return;
    }
    this.generateCodes(node.left!, currentPath + "0");
    this.generateCodes(node.right!, currentPath + "1");
  }

  public encode(text: string): [string, string, string] {
    // 1. Calculate frequencies
    const frequencyMap = new Map<string, number>();
    for (const char of text) {
      frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
    }

    // 2. Build Min-Priority Queue
    const pq = new PriorityQueue<HuffmanNode>((a, b) => a.freq - b.freq);
    for (const [char, freq] of frequencyMap.entries()) {
      pq.enqueue({ freq, char });
    }

    // 3. Build Huffman Tree
    while (pq.size > 1) {
      const leftChild = pq.dequeue()!;
      const rightChild = pq.dequeue()!;
      
      const parentNode: HuffmanNode = {
        freq: leftChild.freq + rightChild.freq,
        char: null,
        left: leftChild,
        right: rightChild
      };
      pq.enqueue(parentNode);
    }

    const root = pq.dequeue()!;

    // 4. Generate Huffman Codes
    this.encodingMap = {};
    this.generateCodes(root, "");

    // 5. Encode the text into bits
    let bitString = "";
    for (const char of text) {
      bitString += this.encodingMap[char];
    }
    
    // 6. Calculate padding to make length a multiple of 8
    const paddingLength = (8 - (bitString.length % 8)) % 8;
    const paddingBits = "0".repeat(paddingLength);
    bitString += paddingBits;

    // 7. Convert bits to ASCII characters
    let compressedText = "";
    for (let i = 0; i < bitString.length; i += 8) {
      let byteValue = 0;
      for (let j = 0; j < 8; j++) {
        byteValue = byteValue * 2 + parseInt(bitString[i + j], 10);
      }
      compressedText += String.fromCharCode(byteValue);
    }
                            
    const serializedTree = this.serializeTree(root);
    const finalPayload = `${serializedTree}\n${paddingLength}\n${compressedText}`;
    
    const ratio = text.length / finalPayload.length;
    const info = `Compression complete and file sent for download\nCompression Ratio : ${ratio.toFixed(4)}`;
    
    return [finalPayload, this.buildVisualTree(root, false), info];
  }

  public decode(payload: string): [string, string, string] {
    const parts = payload.split('\n');
    
    // Handle edge case where tree contains a newline character
    if (parts.length === 4) {
      parts[0] = parts[0] + '\n' + parts[1];
      parts[1] = parts[2];
      parts[2] = parts[3];
      parts.pop();
    }

    const [serializedTree, paddingStr, compressedText] = parts;
    const paddingLength = parseInt(paddingStr, 10);

    this.parseIndex = 0;
    const root = this.deserializeTree(serializedTree);

    // Convert ASCII characters back to bit string
    let bitString = "";
    for (let i = 0; i < compressedText.length; i++) {
      let byteValue = compressedText.charCodeAt(i);
      let byteBits = "";
      for (let j = 0; j < 8; j++) {
        byteBits = (byteValue % 2) + byteBits;
        byteValue = Math.floor(byteValue / 2);
      }
      bitString += byteBits;
    }

    // Remove padding bits
    bitString = bitString.substring(0, bitString.length - paddingLength);

    // Decode the bit string using the tree
    let decompressedText = "";
    let currentNode = root;

    for (const bit of bitString) {
      if (bit === '0') {
        currentNode = currentNode.left!;
      } else {
        currentNode = currentNode.right!;
      }

      if (currentNode.char !== null) {
        decompressedText += currentNode.char;
        currentNode = root;
      }
    }

    const info = "Decompression complete and file sent for download";
    return [decompressedText, this.buildVisualTree(root, true), info];
  }
}
