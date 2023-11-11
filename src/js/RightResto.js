import React from "react";

function RightResto() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 style={{ fontSize: "5rem", marginTop: "2rem" }}>
        UNDER CONSTRUCTION
      </h1>
      <img
        src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/ce3b776fd515502ca81efe76/60028-Converted.png"
        alt="under-consruction"
      />
      <p
        style={{
          fontSize: "2rem",
          marginTop: "2rem",
        }}
      >
        Our website is under construction. Until then, Check out
        <a
          style={{
            textDecoration: "none",
            backgroundColor: "#ff6978",
            color: "#fff",
          }}
          href="https://www.zomato.com/mumbai/dine-out"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Zomato{" "}
        </a>
        !
      </p>
    </div>
  );
}

export default RightResto;
