import React, { useState, useLayoutEffect, useRef } from 'react';
import htmlToCanvas from 'html2canvas';
import JsPdf from 'jspdf';

import PdfContent from 'containers/ProfilContainer/containers/CardContainer/components/PdfContent/PdfContent';

export default function usePdf(): [JSX.Element | null, () => void, JsPdf | null] {
  const [isDownloading, setIsDownloading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null as JsPdf | null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const pdfElement = isDownloading ? <PdfContent ref={pdfRef} /> : null;

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      if (isDownloading && pdfRef.current) {
        clearInterval(interval);
        window.scrollTo({ top: 0, left: 0 });
        htmlToCanvas(pdfRef.current).then((canvas) => {
          const img = canvas.toDataURL('image/jpeg');
          const pdf = new JsPdf('p', 'in', 'a4');

          const imgWidth = pdf.internal.pageSize.width;
          const pageHeight = pdf.internal.pageSize.height;
          const imgHeight = canvas.height / (pageHeight * 50);
          let heightLeft = imgHeight;
          let position = 0;
          pdf.internal.scaleFactor = 50;
          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            if (position !== 0) {
              pdf.addPage();
            }

            pdf.addImage(img, 'jpeg', 0, position, imgWidth, pageHeight);
            heightLeft -= pageHeight;
          }
          setPdfFile(pdf);
          setIsDownloading(false);
        });
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isDownloading]);

  async function createPdf() {
    setPdfFile(null);
    setIsDownloading(true);
  }

  return [pdfElement, createPdf, pdfFile];
}
