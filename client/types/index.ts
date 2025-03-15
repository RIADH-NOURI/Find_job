export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    bio: string;
    image: string;
    country: string;
    dateOfBirth: string;
    status: string;
    role: string;
}

export interface Recruiter {
    id: string;
    name: string;
    email: string;
    password: string;
    bio: string;
    image: string;
    company: string;
    companyType: string;
    country: string;
    role: string;
}

export interface Jobs {
    id: number;
    title: string;
    location: string;
    description: string;
    salary: number;
    jobType: string;
    city:string;
    experienceLevel: string;
    recruiter: Pick<Recruiter, 'company' | 'companyType' | 'image'>;
    createdAt: Date;
    updatedAt: Date;
    technologies: Array<string | { name: string }>;
  }
  

export interface JobApplicationUser {
    id: number;
    status: string;
    createdAt: Date;
    job: Pick<Jobs, 'title'> & {
        recruiter: Pick<Recruiter, 'company'| 'image'>;
    };
}

export interface JobApplicationRecruiter {
    id: number;
    status: string;
    createdAt: Date;
    job: Pick<Jobs, 'title'>
    user: Pick<User, 'name'| 'image'| 'email'>;
    };


export interface userExperience{
    id: number;
    title: string;
    company: string;
    location: string;
    salary: number;
    endDate: string;
    startDate: string;
    experienceLevel: string;
    description: string
}

export interface userNotifications {
    id: number;
    message: string;
    createdAt: string;
    read: boolean;
    isRead: boolean;
    recruiter :Pick<Recruiter,'company'|'image' >; 

}