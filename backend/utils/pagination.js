export const applyPagination = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
  
    const filters = {};
    if (query.company) filters.recruiter = { company: decodeURIComponent(query.company) };
    if(query.companyType) filters.recruiter = { companyType: query.companyType };
    if (query.salary) filters.salary = { gte: parseFloat(query.salary) };
    if (query.location) filters.location = query.location;
    if (query.jobType) filters.jobType = query.jobType;
    if (query.experienceLevel) filters.experienceLevel = query.experienceLevel;
  
    return { filters, skip: (page - 1) * limit, take: limit };
  };
  