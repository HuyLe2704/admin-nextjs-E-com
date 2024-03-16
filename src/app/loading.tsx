'use client'

const Loading = () => {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <style jsx>{`
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            z-index: 10;
          }
          .loader {
            border: 5px solid #f3f3f3;
            border-radius: 50%;
            border-top: 5px solid blue;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  export default Loading;