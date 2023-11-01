import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, COMPILE_URL, MANAGER_URL } from "../../config/constants";
import "../../assets/styles/pages/editor.scss";

import { Navbar } from "../../components/Navbar";

export const PracticeEditor = () => {
  const [problem, setProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState("");
  const [hints, setHints] = useState("");
  const [result, setResult] = useState("");

  const { problemId } = useParams();

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
      <div className="container">
        <div className="container__left">
          <h3 className="container__title">Two Sum</h3>
          <div className="container__description">
            <p>
              Given the root of a binary tree, return the inorder traversal of
              its nodes' values.
            </p>
          </div>
        </div>
        <div className="container__right">
          <MonacoEditor
            className="editor"
            width="800"
            height="600"
            language="javascript"
            theme="vs-dark"
            value={userCode}
            onChange={handleChange}
          />
          <div className="container__button-cont">
            <button className="button button--danger">Quit</button>
            <button className="button button--secondary">Test</button>
            <button className="button button--primary">Submit</button>
          </div>
          <label className="output-cont__label">Console</label>
          <div className="output-cont"></div>
        </div>
      </div>
    </>
  );
};
