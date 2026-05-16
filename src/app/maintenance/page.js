export default function MaintenancePage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Under Maintenance</h1>
        <p style={styles.text}>
          We&apos;re working on something new! We&apos;ll be back online
          shortly.
        </p>
        <div style={styles.spinner}></div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  content: {
    textAlign: "center",
    color: "white",
  },
  heading: {
    fontSize: "48px",
    marginBottom: "16px",
    fontWeight: "700",
  },
  text: {
    fontSize: "18px",
    marginBottom: "32px",
    opacity: "0.9",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255, 255, 255, 0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto",
  },
};
