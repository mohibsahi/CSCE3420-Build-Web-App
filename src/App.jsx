
import { useState } from 'react'
import './App.css'

const API_URL = 'https://gh76o522hh.execute-api.us-east-2.amazonaws.com/submit'

function App() {
  const [name, setName] = useState('Mohib Sahi')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed')
      }

      setMessage(data.message)
    } catch (error) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="app-container">
      <div className="app-card">
        <h1>My First AWS Web Application</h1>
        <p className="subtitle">CSCE 3420 - Internet Programming</p>

        <h2>Welcome, Mohib Sahi!</h2>

        <p>
          This application uses React, AWS Amplify,
          API Gateway, Lambda, and DynamoDB.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your name:</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your name"
            required
          />

          <button type="submit" disabled={loading || !name.trim()}>
            {loading ? 'Submitting...' : 'Submit to AWS'}
          </button>
        </form>

        {message && (
          <div className="result" role="status">
            {message}
          </div>
        )}

        <p className="footer">
          Built by Mohib Sahi | University of North Texas
        </p>
      </div>
    </main>
  )
}

export default App
