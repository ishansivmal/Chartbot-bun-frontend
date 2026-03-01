import { useState } from "react";

function App() {
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [response_data, setResponseData] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    setMessage("");
    setResponseData("");

    try {
      const response = await fetch("http://localhost:5000/age", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age: Number(age) }),
      });

      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (response.ok) {
        setMessage("Age submitted successfully!");
        setResponseData(typeof data === "string" ? data : JSON.stringify(data));
        console.log("Response from server:", data);
        setAge("");
      } else {
        setMessage(typeof data === "object" ? data.message : data || "Something went wrong.");
      }
    } catch {
      setMessage("Failed to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm space-y-5"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Enter Your Age
        </h1>

        <input
          type="number"
          min={1}
          max={150}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors cursor-pointer"
          
        >
          Submit
        </button>

       
        {response_data && (
          <pre className="bg-red-500 rounded-lg p-3 text-left text-sm text-gray-700 overflow-auto">
            {response_data}
          </pre>
        )}
      </form>

      
    </div>
  );
}

export default App;