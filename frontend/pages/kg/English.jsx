import html2canvas from 'html2canvas';
import React, { useState, useEffect } from 'react';

export default function EnglishKG() {
  const standards = [
    {
      code: 'VA:Cr1.1.Ka',
      description: 'Engage in exploration and imaginative play with materials.'
    },
    {
      code: 'VA:Cr2.1.Ka',
      description: 'Through experimentation, build skills in various media and approaches to art-making.'
    },
    {
      code: 'VA:Re7.1.Ka',
      description: 'Identify uses of art within one\'s personal environment.'
    },
    {
      code: 'VA:Cn10.1.Ka',
      description: 'Create art that tells a story about a life experience.'
    }
  ];
  const defaultTopics = [
    [
      "Learn about colors and shapes",
      "Finger painting fun",
      "Drawing animals and nature",
      "Making collages with paper and glue"
    ]
  ];

  const [topics, setTopics] = useState([]);
  const [originalTopics, setOriginalTopics] = useState(topics);
  const [isEditing, setIsEditing] = useState(false);

  const cellStyle = {
    border: '1px solid #333',
    padding: 0,
    verticalAlign: 'top'
  };

  const headerCellStyle = {
    ...cellStyle,
    color: '#fff',
    backgroundColor: '#1a3c64',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '0.75rem'
  };

  const textareaStyle = {
    width: '100%',
    padding: '0.75rem',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#000',
    minHeight: '3rem',
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
    height: 'auto'
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const updated = topics.map((row, rIdx) =>
      rIdx === rowIndex
        ? row.map((cell, cIdx) => (cIdx === colIndex ? value : cell))
        : row
    );
    setTopics(updated);
  };

  const handleAddRow = () => {
    const updated = [...topics, ["", "", "", ""]];
    setTopics(updated);
  };

  const handleRemoveRow = (rowIndex) => {
    const updated = topics.filter((_, i) => i !== rowIndex);
    setTopics(updated);
  };

  const handleEdit = () => {
    setOriginalTopics(topics);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await fetch('http://localhost:4000/api/KG/English', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics })
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving topics:', err);
    }
  };

  const handleCancel = () => {
    setTopics(originalTopics);
    setIsEditing(false);
  };

  const handleScreenshot = () => {
    html2canvas(document.body).then(canvas => {
      const now = new Date();
      const timestamp = now.toISOString().replace(/[:]/g, '-').split('.')[0];
      const fileName = `kg_english_${timestamp}.png`;

      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/KG/English');
        const data = await res.json();
        if (Array.isArray(data.topics)) {
          setTopics(data.topics);
        }
      } catch (err) {
        console.error('Error fetching topics:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const textareas = document.querySelectorAll('textarea');
      textareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    }, 0);
  }, [topics]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <div className="page-container">

      <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#000' }}>ENGLISH Class</h2>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#000' }}>School Year: 2024–2025</p>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '1rem',
          tableLayout: 'fixed',
          border: '1px solid #333'
        }}
      >
        <thead>
          <tr>
            <th style={headerCellStyle}>KEY COURSE OBJECTIVES / ENDURING UNDERSTANDINGS</th>
            <th style={headerCellStyle}>UNIT PACING</th>
            <th style={headerCellStyle}>UNIT LEARNING TARGETS</th>
            <th style={headerCellStyle}>STANDARD</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                // Only render the first column for the first row, and span all rows
                if (colIndex === 0 && rowIndex > 0) return null;

                return (
                  <td
                    key={colIndex}
                    style={cellStyle}
                    rowSpan={colIndex === 0 ? topics.length : 1}
                  >
                    {colIndex < 3 ? (
                      <textarea
                        value={colIndex === 0 ? topics[0][0] : cell}
                        onChange={(e) =>
                          handleCellChange(
                            rowIndex,
                            colIndex,
                            e.target.value
                          )
                        }
                        onInput={(e) => {
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        rows={2}
                        style={textareaStyle}
                        disabled={!isEditing}
                      />
                    ) : (
                      <div style={{ position: 'relative' }}>
                        {isEditing ? (
                          <div
                            style={{
                              border: '1px solid #ccc',
                              borderRadius: '4px',
                              padding: '0.5rem',
                              backgroundColor: '#fff',
                              cursor: 'pointer'
                            }}
                          >
                            {standards.map((standard) => (
                              <label
                                key={standard.code}
                                style={{
                                  display: 'block',
                                  marginBottom: '0.25rem',
                                  color: '#000',
                                  backgroundColor: '#fff'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    Array.isArray(cell) &&
                                    cell.includes(standard.code)
                                  }
                                  onChange={(e) => {
                                    let updated = Array.isArray(cell)
                                      ? [...cell]
                                      : [];
                                    if (e.target.checked) {
                                      updated.push(standard.code);
                                    } else {
                                      updated = updated.filter(
                                        (code) => code !== standard.code
                                      );
                                    }
                                    handleCellChange(rowIndex, colIndex, updated);
                                  }}
                                  style={{ marginRight: '0.5rem' }}
                                />
                                {standard.code}
                              </label>
                            ))}
                          </div>
                        ) : (
                          <>
                            <div style={{ fontSize: '0.95rem', color: '#000' }}>
                              {(Array.isArray(cell) ? cell : []).join(', ') ||
                                'No standards selected'}
                            </div>
                          </>
                        )}
                        {Array.isArray(cell) && cell.length > 0 && (
                          <ul
                            style={{
                              fontSize: '0.9rem',
                              marginTop: '0.5rem',
                              color: '#333',
                              paddingLeft: '1rem'
                            }}
                          >
                            {cell.map((code) => {
                              const match = standards.find(
                                (s) => s.code === code
                              );
                              return (
                                <li key={code}>
                                  {match?.description || code}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {isEditing && (
          <>
            <button onClick={handleAddRow}>Add Row</button>
            <button onClick={() => handleRemoveRow(topics.length - 1)} disabled={topics.length <= 1}>
              Delete Last Row
            </button>
          </>
        )}
        {!isEditing ? (
          <button onClick={handleEdit}>Edit</button>
        ) : (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        )}
        <button onClick={handleScreenshot}>Download Screenshot</button>
      </div>
    </div>
  </div>
  );
}