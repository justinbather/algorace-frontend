import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, MANAGER_URL } from "../../config/constants";
import "../../assets/styles/pages/editor.scss";

export const PracticeEditor = () => {
  const [problem, setProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState("");
  const [testing, setTesting] = useState(false);

  const { problemTitle } = useParams();

  const fetchProblem = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/problems/${problemTitle}/javascript`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setProblem(response.data.problem);
      setUserCode(response.data.problem.userStarterCode);

      setOutput(response.data.output);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors("");
      setOutput("");
      setTesting(true);
      const response = await axios.post(
        `${MANAGER_URL}/compile`,
        {
          code: userCode,
          problem: problem,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setTesting(false);
      switch (response.data.success) {
        case true: {
          setOutput(response.data.output);
          break;
        }
        case false: {
          setErrors(response.data.output);
          break;
        }
      }
    } catch (err) {
      console.log(err);
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
      <div className="editor-container">
        <div className="editor-container__left">
          <h3 className="editor-container__title">Two Sum</h3>
          <div className="editor-container__description">
            <p>
              Given the root of a binary tree, return the inorder traversal of
              its nodes' values.
            </p>
          </div>
        </div>
        <div className="editor-container__right">
          <div className="editor-container__editor-wrapper">
            <MonacoEditor
              className="editor"
              width="750"
              height="600"
              language="javascript"
              theme="vs-dark"
              value={userCode}
              onChange={handleChange}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
          </div>
          <div className="editor-container__button-cont">
            <Link to="/home">
              <button className="button button--danger">Quit</button>
            </Link>
            <button className="button button--secondary" onClick={handleSubmit}>
              Test
            </button>
            <button className="button button--primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <label className="output-cont__label">Console</label>
          <div className="output-cont">
            {output ? (
              <p>
                <span className="output-cont__success">~ success: </span>
                {output}
              </p>
            ) : errors ? (
              <p>
                <span className="output-cont__failure">~ failed: </span>
                {errors}
              </p>
            ) : testing ? (
              <p className="output-cont__testing">~ testing...</p>
            ) : (
              <p>~</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
