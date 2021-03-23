import React from 'react';
import moment from 'moment';

const JobCard = (props) => {
  const {
    id,
    type,
    created_at,
    company,
    location,
    title,
    company_logo,
    index
  } = props;

  return (
    <div className="job-card" index={index + 1} style={{ marginLeft:"15px"}}>
      <div className="company-logo">
        <img src={company_logo} alt={company} width="100" height="100"/>
      </div>
      <div className="job-info">
        <div className="job-title">{title}</div>
        <div className="job-location">
          {location} | {type}
        </div>
        <div className="company-name">{company}</div>
      </div>
      <div className="post-info">
        <div className="post-time">
          Posted {moment(new Date(created_at)).fromNow()}
        </div>
      </div>
    </div>
  );
};

export default JobCard;