/**
 * High-Resolution PDF to Image Converter Service
 * Uses Mozilla PDF.js to render PDF pages onto HTML5 canvas with sharp 2x CAD scaling
 */

let pdfjsLoadingPromise = null;

export function loadPdfJsLibrary() {
  if (window.pdfjsLib) {
    if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    return Promise.resolve(window.pdfjsLib);
  }

  if (pdfjsLoadingPromise) return pdfjsLoadingPromise;

  pdfjsLoadingPromise = new Promise((resolve, reject) => {
    // Check if already injected
    const existing = document.querySelector('script[src*="pdf.min.js"]');
    if (existing) {
      existing.addEventListener('load', () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('PDF.js library failed to initialize'));
        }
      });
      existing.addEventListener('error', () => reject(new Error('Failed to load PDF.js script')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('PDF.js library initialized with error'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load PDF.js from CDN'));
    document.head.appendChild(script);
  });

  return pdfjsLoadingPromise;
}

/**
 * Convert a PDF file or ArrayBuffer into an array of high-resolution image data URLs
 * @param {File | Blob | ArrayBuffer} fileOrBuffer
 * @param {Object} options
 * @param {number} options.scale - Zoom/DPI factor (2.0 = double resolution for CAD sharpness)
 * @param {string} options.format - 'image/png' or 'image/jpeg'
 * @param {Function} options.onProgress - callback (currentPage, totalPages)
 * @returns {Promise<Array<{pageNumber: number, width: number, height: number, dataUrl: string}>>}
 */
export async function convertPdfToImages(fileOrBuffer, options = {}) {
  const { scale = 2.0, format = 'image/png', onProgress } = options;

  const pdfjs = await loadPdfJsLibrary();

  let arrayBuffer;
  if (fileOrBuffer instanceof ArrayBuffer) {
    arrayBuffer = fileOrBuffer;
  } else if (fileOrBuffer instanceof Blob || fileOrBuffer instanceof File) {
    arrayBuffer = await fileOrBuffer.arrayBuffer();
  } else if (typeof fileOrBuffer === 'string') {
    // If it's a URL
    const response = await fetch(fileOrBuffer);
    arrayBuffer = await response.arrayBuffer();
  } else {
    throw new Error('Unsupported PDF input type');
  }

  const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
  const pdfDocument = await loadingTask.promise;
  const numPages = pdfDocument.numPages;
  const convertedPages = [];

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    if (onProgress) {
      onProgress(pageNum, numPages);
    }

    const page = await pdfDocument.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    // Create offscreen canvas for rendering
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    // Optional white background for transparent CAD drawings
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };

    await page.render(renderContext).promise;

    const dataUrl = canvas.toDataURL(format, 0.95);
    convertedPages.push({
      pageNumber: pageNum,
      width: canvas.width,
      height: canvas.height,
      dataUrl
    });
  }

  return convertedPages;
}
