import { useEffect, useState } from "react";

import api from "../../services/api";
import "../../styles/questions.css";

function Questions() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get("/questions/list/");
                setQuestions(response.data);
            } catch (error) {
                console.error(
                    "Failed to load questions:",
                    error
                );

                setError("Failed to load questions.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) {
        return (
            <div className="questions-page">
                <div className="questions-header">
                    <h1>Questions</h1>
                    <p>Loading questions...</p>
                </div>

                <div className="questions-card">
                    <div className="questions-state">
                        <p>Loading questions...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="questions-page">
                <div className="questions-header">
                    <h1>Questions</h1>
                    <p>View questions submitted by employees.</p>
                </div>

                <div className="questions-card">
                    <div className="questions-state">
                        <h2>Unable to load questions</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="questions-page">

            <div className="questions-header">
                <h1>Questions</h1>
                <p>
                    View questions submitted by employees.
                </p>
            </div>

            <div className="questions-card">

                {questions.length === 0 ? (
                    <div className="questions-state">
                        <h2>No questions yet</h2>
                        <p>
                            Questions submitted by employees
                            will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="questions-table-wrapper">
                        <table className="questions-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Sender</th>
                                    <th>NIK</th>
                                    <th>Question</th>
                                </tr>
                            </thead>

                            <tbody>
                                {questions.map((item) => (
                                    <tr key={item.id}>

                                        <td>
                                            <span className="questions-date">
                                                {new Date(
                                                    item.created_at
                                                ).toLocaleString()}
                                            </span>
                                        </td>

                                        <td>
                                            <div className="questions-sender">
                                                {item.is_anonymous ? (
                                                    <span className="questions-sender-anonymous">
                                                        Anonymous
                                                    </span>
                                                ) : (
                                                    <span className="questions-sender-name">
                                                        {item.user_name}
                                                    </span>
                                                )}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="questions-nik">
                                                {item.is_anonymous
                                                    ? "-"
                                                    : item.user_nik}
                                            </div>
                                        </td>

                                        <td>
                                            <div className="questions-question">
                                                {item.question}
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>

        </div>
    );
}

export default Questions;