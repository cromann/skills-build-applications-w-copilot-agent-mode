import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities API endpoint:', endpoint);
        console.log('Fetched activities:', results);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  if (loading) return <div>Loading activities...</div>;

  if (!activities.length) return <div>No activities found.</div>;

  // Get table headers from first activity
  const headers = Object.keys(activities[0] || {});

  return (
    <div>
      <h2 className="mb-4">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => (
              <tr key={activity.id || idx}>
                {headers.map((header) => (
                  <td key={header}>{String(activity[header])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;
