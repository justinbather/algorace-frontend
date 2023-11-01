import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, COMPILE_URL, MANAGER_URL } from "../../config/constants";
import data from "../../config/starter_code.txt";
import { Navbar } from "../../components/Navbar";

export const PracticeEditor = () => {
  const [problem, setProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState("");
  const [hints, setHints] = useState("");
  const [result, setResult] = useState("");
  const [mockTest, setMockTest] = useState("");

  const { problemId } = useParams();

  const readFile = () => {
    const code = fetch(data)
      .then((d) => d.text())
      .then((text) => {
        console.log(text);
        setUserCode(text);
      });
  };

  const fetchProblem = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/problems/${problemId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.data.problem);
      setProblem(response.data.problem);
      setUserCode(response.data.problem.starterCode);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${MANAGER_URL}/test`,
        {
          code: userCode,
          lang: "Javascript",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      console.log(response.data);
    } catch (err) {
      console.error("error occured sending request to compile -> ", err);
    }
  };

  const handleChange = (e) => {
    setUserCode(e);
  };

  useEffect(() => {
    //Load starter code on render

    fetchProblem();
  }, []);

  return (
    <>
      <Navbar />
      <MonacoEditor
        width="800"
        height="600"
        language="python"
        theme="vs-dark"
        value={userCode}
        onChange={handleChange}
      />
      <button className="compile-btn" onClick={handleSubmit}>
        Compile
      </button>
      <div className="output">
        <div className="output-row">
          <h3 className="output-label">Output: </h3>
          <h3 className="output-response">{output}</h3>
        </div>
        <div className="output-row">
          <h3 className="output-label">Test Result: </h3>
          <h3 className="output-response">{result}</h3>
        </div>
        <div className="output-row">
          <h3 className="output-label">Test Case: </h3>
          <h3 className="output-response">{mockTest}</h3>
        </div>
        <div className="output-row">
          <h3 className="output-label">Test Result: </h3>
          <h3 className="output-response">{result}</h3>
        </div>
        <div className="output-row">
          <h3 className="output-label">Errors: </h3>
          <h3 className="output-response">{errors}</h3>
        </div>
        <div className="output-row">
          <h3 className="output-label">Hints: </h3>
          <h3 className="output-response">{hints}</h3>
        </div>
      </div>
    </>
  );
};
