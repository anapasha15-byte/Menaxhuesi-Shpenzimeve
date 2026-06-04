import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(
          "Llogaria u krijua me sukses ✅"
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(
        "Gabim ne lidhje me serverin"
      );
    }
  };

  return (
    <div
      style={{
        background: "#eef2ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          width: "350px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 25px rgba(0,0,0,.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          📝 Regjistrohu
        </h2>

        <form onSubmit={register}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Regjistrohu
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Ke llogari? Hyr
        </div>
      </div>
    </div>
  );
}

export default Register;