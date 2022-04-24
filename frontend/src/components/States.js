import React, { useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'
import Card from './Card';
import '../styles/states.css';

// let data = [
//   'Let me know what you think about this series. If you have any video ideas please feel free to post them below Let me know what you think about this series.If you have any video ideas, please feel free to post',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.',
//   'evugewvqCV',
//   'Let me know what you think about this series. If you have any video ideas please feel free to post them below',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.',
//   'evugewvqCV',
//   'Let me know what you think about this series. If you have any video ideas please feel free to post them below',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.',
//   'evugewvqCV',
//   'Let me know what you think about this series. If you have any video ideas please feel free to post them below',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.If you have any video ideas, please feel free to post them below.',
//   'Let me know what you think about this series.',
//   'evugewvqCV',
// ];

export default function States({data}) {

  const [loading, setLoading] = useState(false);


  const handleDownloadPdf = (cmt) => {
    setLoading(true);
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(40);
    
    let pageNumber = doc.internal.getNumberOfPages();
    const columns = [['Comments']];
    const value = cmt.map((item)=>[item])

    doc.autoTable({head: columns, body: value});
    doc.setPage(pageNumber);
    
    doc.save('Test.pdf');
    setLoading(false);
  };



  return (
    <div className='cards_cont'>
      <Card>
        <h2 className='card_title' style={{ color: '#078a53' }}>
        Positive Comments
        </h2>

        <button className='card_btn' type='button' onClick={()=>handleDownloadPdf(data.Positive)}>
          {loading ? (
            'Please wait...'
          ) : (
            <>
              <img src={require('../assets/download1.png')} alt='' /> Download Pdf
            </>
          )}
        </button>

        {data?.Positive.map((cmt, index) => {
          return <h2 className='cmt' key={index}> {`${index + 1}. ${cmt}`} </h2>;
        })}
      </Card>

      <Card>
        <h2 className='card_title' style={{ color: '#6e4105' }}>
        Questions
        </h2>

        <button className='card_btn' type='button' onClick={()=>handleDownloadPdf(data.Question)}>
          {loading ? (
            'Please wait...'
          ) : (
            <>
              <img src={require('../assets/download1.png')} alt='' /> Download Pdf
            </>
          )}
        </button>

        {data?.Question.map((cmt, index) => {
          return <h2 className='cmt' key={index}> {`${index + 1}. ${cmt}`} </h2>;
        })}

      </Card>
    
      <Card>
        <h2 className='card_title' style={{ color: '#491302' }}>
        Suggestions
        </h2>

        <button className='card_btn' type='button' onClick={()=>handleDownloadPdf(data.Suggestion)}>
          {loading ? (
            'Please wait...'
          ) : (
            <>
              <img src={require('../assets/download1.png')} alt='' /> Download Pdf
            </>
          )}
        </button>

        {data?.Suggestion.map((cmt, index) => {
          return <h2 className='cmt' key={index}> {`${index + 1}. ${cmt}`} </h2>;
        })}

      </Card>

      <Card>
        <h2 className='card_title' style={{ color: '#491302' }}>
        Other Comments
        </h2>

        <button className='card_btn' type='button' onClick={()=>handleDownloadPdf(data.Other)}>
          {loading ? (
            'Please wait...'
          ) : (
            <>
              <img src={require('../assets/download1.png')} alt='' /> Download Pdf
            </>
          )}
        </button>

        {data?.Other.map((cmt, index) => {
          return <h2 className='cmt' key={index}> {`${index + 1}. ${cmt}`} </h2>;
        })}

      </Card>
    </div>
  );
}
