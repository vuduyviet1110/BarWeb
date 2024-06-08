import { useEffect, useState } from "react";

function FallBackPage() {
  const [count, setCount] = useState(50);

  useEffect(() => {
    if (count <= 0) return;

    const timerId = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [count]);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "center",

        alignItems: "center",
        height: "100vh",
        width: "100%",
        color: "white",
      }}
    >
      <div
        style={{
          display: "inline-grid",
          padding: "5px",
          background: "#fff",
          filter: "contrast(12)",
          margin: "0 0 16px 0",
        }}
        className="loader"
      ></div>
      <h1>Please wait...</h1>
      <h4>
        Due to deploying the back-end on the free version of Renderer, there may
        be longer load times than expected 🥲
      </h4>
      <div>{count}s</div>
      {count === 0 && (
        <button onClick={() => window.location.reload()}> Reload</button>
      )}

      <style>
        {`
              .loader::before {
                content: "";
                height: 40px;
                aspect-ratio: 3;
                --c: #0000 64%, #000 66% 98%, #0000 101%;
                background:
                  radial-gradient(35% 146% at 50% 159%, var(--c)) 0 0,
                  radial-gradient(35% 146% at 50% -59%, var(--c)) 100% 100%;
                background-size: calc(200%/3) 50%;
                background-repeat: repeat-x;
                -webkit-mask: repeating-linear-gradient(90deg, #000 0 10%, #0000 0 20%);
                animation: l12 .8s infinite linear;
              }
    
              @keyframes l12 {
                to { background-position: -200% 0, -100% 100%; }
              }
            `}
      </style>
    </div>
  );
}

export default FallBackPage;
