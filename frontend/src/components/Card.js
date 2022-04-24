import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import '../styles/card.css';

export default function Card({ children }) {
  const printRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleDownloadPdf = async () => {
    setLoading(true);
    const element = printRef.current;
    element.current.style.overflow = 'visible';
    const canvas = await html2canvas(element,  {scrollX: 0,scrollY: 0, windowWidth: 0,windowHeight:0
    });

    const data = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
    setLoading(false);
  };

  return (
    <div className='card_cont' ref={printRef}>
      {children}
      {/* <button className='card_btn' type='button' onClick={handleDownloadPdf}>
        {loading ? (
          'Please wait...'
        ) : (
          <>
            <img src={require('../assets/download1.png')} alt='' /> Download Pdf
          </>
        )}
      </button> */}
    </div>
  );
}
