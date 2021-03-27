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

  return(
    <div class="max-w-4xl px-10 my-4 py-6 bg-white rounded-lg shadow-md">
        <div class="flex justify-between items-center">
            <span class="font-light text-gray-600">{id.location}</span>
            <a class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500" href="#">Job Listing</a>
        </div>
        <div class="mt-2">
            <a class="text-2xl text-gray-700 font-bold hover:text-gray-600" href="#">Junior Developer</a>
            <p class="mt-2 text-gray-600">Job description</p>
        </div>
        <div class="flex justify-between items-center mt-4">
            <a class="text-blue-600 hover:underline" href="#">Apply Now</a>
            <div>
                <a class="flex items-center" href="#">
                    <img class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=373&q=80" alt="avatar"></img>
                    <h1 class="text-gray-700 font-bold">Company Name</h1>
                </a>
            </div>
        </div>
    </div>
  )
  // return (
  //   <div className="job-card" index={index + 1} style={{ marginLeft:"15px"}}>
  //     <div className="company-logo">
  //       <img src={company_logo} alt={company} width="100" height="100"/>
  //     </div>
  //     <div className="job-info">
  //       <div className="job-title">{title}</div>
  //       <div className="job-location">
  //         {location} | {type}
  //       </div>
  //       <div className="company-name">{company}</div>
  //     </div>
  //     <div className="post-info">
  //       <div className="post-time">
  //         Posted {moment(new Date(created_at)).fromNow()}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default JobCard;