import { useState } from 'react';
import data from '../assets/data.json';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentRows = data.transactions.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.transactions.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <><div className="dashboard-container">
      <h2 style={{ textAlign: "left", margin: "2%" }}>Annual Expenditure Dashboard</h2><div className='card-container'>
        <a className='card'>
          <h3>Monthly Income</h3>
          <p>₹{data.summary.monthly_income}</p>
        </a>
        <a className='card'>
          <h3>Total Expenditure</h3>
          <p>₹{data.summary.total_expenditure}</p>
        </a>
        <a className='card'>
          <h3>Savings</h3>
          <p>₹{data.summary.net_savings}</p>
        </a>
      </div><br></br>
      {/* Table */}
        <section className='table-container'>
        <h2>Detailed Breakdown (Table)</h2>
        <table className='table'>
          <thead>
            <tr className='table-header'>
              <th className='table-cell'>Date</th>
              <th className='table-cell'>Amount</th>
              <th className='table-cell'>Category</th>
              <th className='table-cell'>Description</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item) => (
              <tr className="table-row" key={item.date}>
                <td className='table-cell'>{item.date}</td>
                <td className='table-cell'><strong>₹{item.amount}</strong></td>
                <td className='table-cell'>{item.category}</td>
                <td className='table-cell'>{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
      </section>
    </div>
    </>
  );
}

export default Dashboard;