import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ask-question.css";

function AskQuestion() {
  const navigate = useNavigate();

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [question, setQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!question.trim()) {
      setError("Please enter your question.");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/questions/", {
        question: question.trim(),
        is_anonymous: isAnonymous,
      });

      setQuestion("");
      setIsAnonymous(false);
      setMessage("Your question has been sent successfully.");
    } catch (error) {
      console.error("Failed to send question:", error);

      setError(
        error.response?.data?.detail ||
          "Failed to send your question. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ask-question-page">
      <div className="ask-question-container">

        <div className="ask-question-header">
          <span className="ask-question-badge">
            Ask Question
          </span>

          <h1>How can we help?</h1>

          <p>
            Send your question to our supervisors and we will get back to you.
          </p>
        </div>

        <form
          className="ask-question-form"
          onSubmit={handleSubmit}
        >
          <div className="identity-section">
            <label className="form-label">
              Send as
            </label>

            <div className="identity-options">

              <label
                className={`identity-option ${
                  !isAnonymous ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="identity"
                  checked={!isAnonymous}
                  onChange={() => setIsAnonymous(false)}
                />

                <div className="identity-option-content">
                  <strong>With Identity</strong>

                  <span>
                    Your name and NIK will be included.
                  </span>
                </div>
              </label>

              <label
                className={`identity-option ${
                  isAnonymous ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="identity"
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(true)}
                />

                <div className="identity-option-content">
                  <strong>Anonymous</strong>

                  <span>
                    Your identity will not be included.
                  </span>
                </div>
              </label>

            </div>
          </div>

          <div className="question-section">
            <label
              htmlFor="question"
              className="form-label"
            >
              Your Question
            </label>

            <textarea
              id="question"
              className="question-textarea"
              placeholder="Write your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={8}
              maxLength={2000}
            />

            <div className="question-counter">
              {question.length}/2000
            </div>
          </div>

          {message && (
            <div className="question-success">
              {message}
            </div>
          )}

          {error && (
            <div className="question-error">
              {error}
            </div>
          )}

          <div className="ask-question-actions">
            <button
              type="button"
              className="ask-question-cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="ask-question-submit"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Send Question"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default AskQuestion;