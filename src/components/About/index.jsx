import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <h4><a href="https://www.notion.so/get-butter/Frontend-News-Browser-Challenge-8cb0cf5578e64525b0876683e7558652" target="_blank" rel="noreferrer">[Frontend] News Browser Challenge</a></h4>
      <h5>Butter Frontend Take-Home</h5>
      <p>As the next step in the interview process, we’d like you to complete a take-home challenge. </p>
      <p>Description</p>
      <p>High level goal: build a news browser leveraging <a href="https://newsapi.org/" target="_blank" rel="noreferrer">NewsAPI</a>.</p>
      <p>Detailed goals below:</p>
      <ol>
        <li>I need to be able to view a list of the latest news articles. For each article, I want to see:
          <ol>
            <li>title</li>
            <li>source</li>
            <li>time of publishing</li>
            <li>description</li>
            <li>image (if available)</li>
          </ol>
        </li>
        <li>On the article list view, I need to be able to filter results by entering search keywords.</li>
        <li>I need to be able to maintain a separate list of favorite articles (need to be able to add and remove).</li>
        <li>(bonus) I want to be able to know which articles I already read (through some visual indicator distinguishing the read articles on the list view).</li>
        <li>For any article, I need to be able to visit the source page.</li>
      </ol>
      <p>At Butter, we look for people who appreciate the importance of craft and speed – and the balance thereof. Use your best judgment on how to accomplish the goals above!</p>
      <Link to='/'>Go Back</Link>
    </div>
  )
}

export default About
