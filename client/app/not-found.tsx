// For Pages Router: pages/404.js
// For App Router: app/not-found.js
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <svg
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="200"
        >
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="50"
            fontWeight="bold"
            fill="#ff4d4d"
          >
            404
          </text>
          <text
            x="50%"
            y="65%"
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="16"
            fill="#333"
          >
            Page Not Found
          </text>
        </svg>
      </div>
      <h1 style={styles.heading}>Oops! Page Not Found</h1>
      <p style={styles.text}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        <span style={styles.button}>Go Home</span>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    color: "#333",
  },
  imageContainer: {
    marginBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  text: {
    fontSize: "16px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  },
};
